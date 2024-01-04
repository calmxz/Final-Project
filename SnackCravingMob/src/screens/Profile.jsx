import {
  TextInput,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import style from "./profile.style";
import { StatusBar } from "expo-status-bar";
import { AntDesign, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [balance, setBalance] = useState();

  useEffect(() => {
    const fetchData = async () => {
      await checkExistingUser();
      if (userLogin) {
        fetchBalance();
      }
    };
  
    fetchData();
  }, [userLogin, userData]);
  
  useEffect(() => {
    const fetchData = async () => {
      await checkExistingUser();
      if (userLogin) {
        fetchBalance();
      }
    };

    fetchData();
  }, [userLogin]);

  const rechargeBalance = async () => {
    if (!rechargeAmount || isNaN(rechargeAmount)) {
      Alert.alert("Invalid Amount", "Please enter a valid recharge amount.");
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.1.246/Final-Project/backendMobile/recharge_balance.php",
        {
          user_id: userData.user_id,
          recharge_amount: parseFloat(rechargeAmount), // Parse to float for precision
        }
      );

      const data = response.data;

      if (data.success) {
        setModalVisible(false);
        Alert.alert(
          "Recharge Success",
          `₱${rechargeAmount} added to your balance.`
        );
        // Optionally, you may want to update the user's balance locally
        setUserData((prevData) => ({
          ...prevData,
          balance: prevData.balance + parseFloat(rechargeAmount),
        }));
      } else {
        Alert.alert(
          "Recharge Failed",
          data.message || "An error occurred during recharge."
        );
      }
    } catch (error) {
      console.error("Recharge Error:", error);
      Alert.alert("Recharge Failed", "An error occurred during recharge.");
    }
  };

  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem("id");
    const userId = `user${JSON.parse(id)}`;

    try {
      const currentUser = await AsyncStorage.getItem(userId);

      if (currentUser !== null) {
        const parsedData = JSON.parse(currentUser);
        setUserData(parsedData);
        setUserLogin(true);
      } else {
        navigation.navigate("Login");
      }
    } catch (error) {
      console.log("Error retrieving the data:", error);
    }
  };

  const userLogout = async () => {
    const id = await AsyncStorage.getItem("id");
    const userId = `user${JSON.parse(id)}`;

    try {
      await AsyncStorage.multiRemove([userId, "id"]);
      navigation.navigate("Home");
    } catch (error) {
      console.log("Error logging out the user:", error);
    }
  };

  const deleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account",
      [
        {
          text: "Cancel",
          onPress: () => console.log("cancel pressed"),
        },
        {
          text: "Continue",
          onPress: () => console.log("continue pressed"),
        },
      ]
    );
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
  

  return (
    <View style={style.container}>
      <View style={style.container}>
        <StatusBar backgroundColor="#83829A" />
        <View style={{ width: "100%" }}>
          <Image
            source={require("../../images/userbg.jpg")}
            style={style.cover}
          />
        </View>
        <View style={style.profileContainer}>
          <Image
            source={require("../../images/userpfp.jpg")}
            style={style.profile}
          />
          <Text style={style.name}>
            {userLogin === true
              ? userData.username
              : "Please login into your account"}
          </Text>
          {userLogin === false ? (
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <View style={style.loginBtn}>
                <Text style={style.menuText}>LOGIN</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={style.loginBtn}>
              <Text style={style.menuText}>Balance: ₱{balance}</Text>
            </View>
          )}

          {userLogin === false ? (
            <View></View>
          ) : (
            <View style={style.menuWrapper}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Favorites")}
              >
                <View style={style.menuItem(0.3)}>
                  <MaterialCommunityIcons
                    name="heart-outline"
                    size={24}
                    color={"#2A4D50"}
                  />
                  <Text style={style.menuText}>Favorites</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Orders")}>
                <View style={style.menuItem(0.3)}>
                  <MaterialCommunityIcons
                    name="moped-outline"
                    size={24}
                    color={"#2A4D50"}
                  />
                  <Text style={style.menuText}>Orders</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                <View style={style.menuItem(0.3)}>
                  <Feather name="shopping-cart" size={24} color={"#2A4D50"} />
                  <Text style={style.menuText}>Cart</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={style.menuItem(0.3)}>
                  <MaterialCommunityIcons
                    name="wallet-outline"
                    size={24}
                    color={"#2A4D50"}
                  />
                  <Text style={style.menuText}>Recharge Balance</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteAccount()}>
                <View style={style.menuItem(0.3)}>
                  <AntDesign name="deleteuser" size={24} color={"#2A4D50"} />
                  <Text style={style.menuText}>Delete Account</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => userLogout()}>
                <View style={style.menuItem(0.3)}>
                  <AntDesign name="logout" size={24} color={"#2A4D50"} />
                  <Text style={style.menuText}>Logout</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={style.modalContainer}>
              <View style={style.modalContent}>
                <Text style={style.modalText}>Enter recharge amount:</Text>
                <TextInput
                  style={style.modalInput}
                  keyboardType="numeric"
                  placeholder="Enter amount"
                  value={rechargeAmount}
                  onChangeText={(text) => setRechargeAmount(text)}
                />
                <View style={style.modalButtons}>
                <TouchableOpacity
                    onPress={rechargeBalance}
                    style={style.modalButton}
                  >
                    <Text style={style.modalButtonText}>Recharge</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={style.modalButton}
                  >
                    <Text style={style.modalButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
};

export default Profile;
