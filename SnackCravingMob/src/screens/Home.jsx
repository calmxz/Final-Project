import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import styles from './home.style';
import { Welcome } from "../components";
import ProductCategory from "../components/products/ProductCategory"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios";

const Home = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await checkExistingUser();
      if (userLogin) {
        updateCartCount();
      }
    };

    fetchData();
  }, [userLogin, userData]);

  useEffect(() => {
    // Fetch cart count whenever user logs in or logs out
    if (userLogin) {
      updateCartCount();
    } else {
      setCartCount(0); // Reset cart count if user logs out
    }
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
      } else {
        setUserLogin(false); // Set userLogin to false if there's no user data
      }
    } catch (error) {
      console.log('Error retrieving the data:', error);
    }
  };

  const updateCartCount = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        'http://192.168.1.246/Final-Project/backendMobile/getCartCount.php',
        {
          user_id: userData.user_id,
        }
      );

      if (response.data.success) {
        const cartCount = response.data.cart_count;
        setCartCount(cartCount);
      } else {
        console.error('Error fetching cart counts:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching cart count:', error);
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <SafeAreaView>
      <View style = {styles.appBarWrapper}>
        <View style={styles.appBar}>
          <Ionicons name='location-outline' size={24}/>
          <Text style={styles.location}>Welcome, {userData ? userData.username : "User"}! </Text>
          <View style={{alignItems: "flex-end"}}>
             <View style={styles.cartCount}>
                <Text style={styles.cartNumber}>{cartCount > 0 ? cartCount : "0"}</Text>
             </View>
            <TouchableOpacity>
            <Feather name='shopping-cart' size={24} onPress={()=>navigation.navigate('Cart')}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView>
        <Welcome/> 
        <ProductCategory/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home
