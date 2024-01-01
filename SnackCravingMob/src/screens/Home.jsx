import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import styles from './home.style';
import { Welcome } from "../components";
import ProductCategory from "../components/products/ProductCategory"
import AsyncStorage from "@react-native-async-storage/async-storage"


const Home = ({navigation}) => {
  const [userData, setUserData] = useState(null)
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
      }
    } catch (error) {
      console.log("Error retrieving the data:", error)
    }
  }
  return (
    <SafeAreaView>
      <View style = {styles.appBarWrapper}>
        <View style={styles.appBar}>
          <Ionicons name='location-outline' size={24}/>
          <Text style={styles.location}> San Juan, La Union </Text>
          <View style={{alignItems: "flex-end"}}>
             <View style={styles.cartCount}>
                <Text style={styles.cartNumber}> 8 </Text>
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
