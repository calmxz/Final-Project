import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import styles from './home.style';
import { Welcome } from "../components";
import ProductCategory from "../components/products/ProductCategory"


const Home = () => {
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
            <Feather name='shopping-cart' size={24}/>
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
