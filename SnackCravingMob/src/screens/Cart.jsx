import React, { useState, useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartTile from './CartTile';

const Cart = ({navigation}) => {
  const [cartItems, setCartItems] = useState([]);
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [amountPaid, setAmountPaid] = useState('');
  const [totalAmount, setTotalAmount] = useState([]);
  const [balance, setBalance] = useState();

  useEffect(() => {
    checkExistingUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await checkExistingUser();
      if (userLogin) {
        fetchCartItems();
        fetchTotalAmount();
        fetchBalance();
      }
    };

    fetchData();
  }, [userLogin]);

  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem('id');
    const userId = `user${JSON.parse(id)}`;

    try {
      const currentUser = await AsyncStorage.getItem(userId);

      if (currentUser !== null) {
        const parsedData = JSON.parse(currentUser);
        setUserData(parsedData);
        setUserLogin(true);
      }
    } catch (error) {
      console.log('Error retrieving the data:', error);
    }
  };

  const fetchBalance = async () => {
    try {
      if (!userData || !userData.user_id) {
        console.error('User data is missing or incomplete.');
        return;
      }
  
      const response = await axios.post(
        'http://192.168.1.246/Final-Project/backendMobile/getUserBalance.php',
        {
          user_id: userData.user_id,
        }
      );
  
      if (response.data.success) {
        setBalance(response.data.balance);
      } else {
        console.error('Error fetching user balance:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching user balance:', error);
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await axios.post(
        'http://192.168.1.246/Final-Project/backendMobile/getCartItem.php',
        {
          user_id: userData.user_id,
        }
      );

      console.log('Response:', response.data);

      if (response.data.success) {
        setCartItems(response.data.cart_items || []);
      } else {
        console.error('Error fetching cart items:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const handleDeleteItem = async (cartId) => {
    try {
      await axios.post(
        'http://192.168.1.246/Final-Project/backendMobile/deleteCartItem.php',
        { cart_id: cartId }
      );
      setCartItems(cartItems.filter((item) => item.cart_id !== cartId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleUpdateQuantity = async (cartId, newQuantity, price) => {
    try {
      const response = await axios.post(
        'http://192.168.1.246/Final-Project/backendMobile/updateQuantity.php',
        {
          cart_id: cartId,
          quantity: newQuantity,
          price: price,
        }
      );

      console.log('Update Quantity Response:', response.data);

      if (response.data.success) {
        setCartItems((prevCartItems) =>
          prevCartItems.map((item) =>
            item.cart_id === cartId
              ? {
                  ...item,
                  quantity: newQuantity,
                  total_amount: newQuantity * price,
                }
              : item
          )
        );
      } else {
        console.error('Error updating quantity:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const fetchTotalAmount = async () => {
    try {
      const response = await axios.post(
        'http://192.168.1.246/Final-Project/backendMobile/getTotalAmount.php',
        {
          user_id: userData.user_id,
        }
      );
  
      console.log('Total Amount Response:', response.data);
  
      if (response.data.success) {
        setTotalAmount(response.data.totalAmount || 0);
      } else {
        console.error('Error fetching total amount:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching total amount:', error);
    }
  };
  
  const handleOrderConfirmation = () => {
    fetchTotalAmount(); // Fetch total amount before opening the modal
    setModalVisible(true);
  };

  const handlePaymentConfirmation = async () => {
    if (!isValidAmountPaid()) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount.');
      return;
    }
  
    try {
      const response = await axios.post(
        'http://192.168.1.246/Final-Project/backendMobile/confirmOrder.php',
        {
          cart_id: cartItems.length > 0 ? cartItems[0].cart_id : null,
          total_amount: totalAmount,
          amount_paid: parseFloat(amountPaid),
          user_id: userData ? userData.user_id : null,
        }
      );
  
      console.log('Order Confirmation Response:', response.data);
  
      if (response.data.success) {
        Alert.alert('Order Confirmed', 'Thank you for your order!');
        navigation.navigate('Bottom Navigation');
      } else {
        Alert.alert('Order Confirmation Failed', response.data.message);
      }
    } catch (error) {
      console.error('Error confirming order:', error);
      Alert.alert('Order Confirmation Error', 'An error occurred while confirming the order.');
    } finally {
      setModalVisible(false);
    };
  };
  

  const isValidAmountPaid = () => {
    const parsedAmount = parseFloat(amountPaid);
    return !isNaN(parsedAmount) && parsedAmount >= 0;
  };

  const renderItem = ({ item }) => (
    <CartTile
      item={item}
      onDelete={handleDeleteItem}
      onUpdateQuantity={handleUpdateQuantity}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      {cartItems && cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id} 
          renderItem={renderItem}
        />
      ) : (
        <Text>Your cart is empty</Text>
      )}
<View>
 <TouchableOpacity
        style={styles.orderButton}
        onPress={handleOrderConfirmation}
      >
        <Text style={styles.orderButtonText}>Confirm Order</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Order</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter amount paid"
              keyboardType="numeric"
              value={amountPaid}
              onChangeText={(text) => setAmountPaid(text)}
            />
            <Text>Your remaining balance: ₱{balance}</Text>
            
            <Text>Total Amount: ₱{totalAmount}</Text>

            <TouchableOpacity
              style={[
                styles.confirmButton,
                !isValidAmountPaid() && styles.disabledButton,
              ]}
              onPress={handlePaymentConfirmation}
              disabled={!isValidAmountPaid()}
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  orderButton: {
    backgroundColor: '#4CAF50', // Changed button color
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 12,
  },
  orderButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    paddingHorizontal: 60,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    marginBottom: 10,
    width: '100%',
  },
  confirmButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#A9A9A9', // Disabled button color
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Cart;
