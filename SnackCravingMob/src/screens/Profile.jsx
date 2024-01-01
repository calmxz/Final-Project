import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import style from "./profile.style";
import { StatusBar } from "expo-status-bar";
import {AntDesign, MaterialCommunityIcons, Feather} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage"

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);

  useEffect(()=> {
    checkExistingUser();
  }, [])

  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem('id')
    const userId = `user${JSON.parse(id)}`;

    try {
      const currentUser = await AsyncStorage.getItem(userId);

      if(currentUser !== null) {
        const parsedData = JSON.parse(currentUser)
        setUserData(parsedData)
        setUserLogin(true)
      }else{
        navigation.navigate('Login')
      }
    } catch (error) {
      console.log("Error retrieving the data:", error)
    }
  }

  const userLogout = async () => {
    const id = await AsyncStorage.getItem('id')
    const userId = `user${JSON.parse(id)}`;

    try {
      await AsyncStorage.multiRemove([userId, 'id']);
      navigation.navigate('Home')  
    } catch (error) {
      console.log("Error logging out the user:", error)
    }
  };

  const logout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout",
      [
        {
          text: "Cancel", onPress: ()=> console.log("cancel pressed")
        },
        {
          text: "Continue", onPress: ()=> userLogout()
        },
      ]
    )
  }

  const clearCache = () => {
    Alert.alert(
      "Clear Cache",
      "Are you sure you want to delete all saved data on your device",
      [
        {
          text: "Cancel", onPress: ()=> console.log("cancel pressed")
        },
        {
          text: "Continue", onPress: ()=> console.log("continue pressed")
        },
      ]
    )
  }

  const deleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account",
      [
        {
          text: "Cancel", onPress: ()=> console.log("cancel pressed")
        },
        {
          text: "Continue", onPress: ()=> console.log("continue pressed")
        },
      ]
    )
  }
  return (
    <View style={style.container}>
      <View style={style.container}>
        <StatusBar backgroundColor="#83829A"/>
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
            {userLogin === true ? userData.username : "Please login into your account"}
          </Text>
          {userLogin === false ? (
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <View style={style.loginBtn}>
                <Text style={style.menuText}>LOGIN</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={style.loginBtn}>
              <Text style={style.menuText}>{userData.email}</Text>
            </View>
          )}

          {userLogin === false ? (
           <View></View>
          ) : (
           <View style={style.menuWrapper}>
              <TouchableOpacity onPress={()=>navigation.navigate('Favorites')}>
                <View style={style.menuItem(0.3)}>
                  <MaterialCommunityIcons
                    name="heart-outline"
                    size={24}
                    color={"#2A4D50"}
                  />
                  <Text style={style.menuText}>Favorites</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>navigation.navigate('Orders')}>
                <View style={style.menuItem(0.3)}>
                  <MaterialCommunityIcons
                    name="moped-outline"
                    size={24}
                    color={"#2A4D50"}
                  />
                  <Text style={style.menuText}>Orders</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>navigation.navigate('Cart')}>
                <View style={style.menuItem(0.3)}>
                  <Feather
                    name="shopping-cart"
                    size={24}
                    color={"#2A4D50"}
                  />
                  <Text style={style.menuText}>Cart</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>clearCache()}>
                <View style={style.menuItem(0.3)}>
                  <MaterialCommunityIcons
                    name="cached"
                    size={24}
                    color={"#2A4D50"}
                  />
                  <Text style={style.menuText}>Clear cache</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>deleteAccount()}>
                <View style={style.menuItem(0.3)}>
                  <AntDesign
                    name="deleteuser"
                    size={24}
                    color={"#2A4D50"}
                  />
                  <Text style={style.menuText}>Delete Account</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>logout()}>
                <View style={style.menuItem(0.3)}>
                  <AntDesign
                    name="logout"
                    size={24}
                    color={"#2A4D50"}
                  />
                  <Text style={style.menuText}>Logout</Text>
                </View>
              </TouchableOpacity>
           </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Profile;
