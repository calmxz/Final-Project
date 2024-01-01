import { View, Text, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react';
import styles from "./drinks.style"
import axios from 'axios';
import DrinksCard from './DrinksCard'

const Drinks = () => {
  const [drinksProducts, setDrinksProducts] = useState([]);

  useEffect(() => {
    const fetchDrinksProducts = async () => {
      try {
          const response = await axios.get(`http://192.168.1.246/Final-Project/backendMobile/fetch_drinks.php`);
          setDrinksProducts(response.data);
      } catch (error) {
        console.error('Error fetching drinks products:', error);
      }
    };
    fetchDrinksProducts();
  }, []);

  return (
    <View>
    <View style={styles.container}>
        <Text style={styles.welcomeTxt}> Drinks </Text>
    </View>

    <View style={styles.containers}>
        <FlatList
        data={drinksProducts}
        renderItem = {({item}) => <DrinksCard product={item}/>}
        keyExtractor={item => item.id}
        numColumns={2}
        vertical 
        ItemSeparatorComponent={() => <View style={styles.separator}/>}
        />
   </View>
</View>
  )
}

export default Drinks