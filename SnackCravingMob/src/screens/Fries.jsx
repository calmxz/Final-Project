import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from "./fries.style"
import axios from 'axios';
import FriesCard from './FriesCard'

const Fries = () => {
  const [friesProducts, setFriesProducts] = useState([]);

  useEffect(() => {
    const fetchFriesProducts = async () => {
      try {
        const response = await axios.get(`http://192.168.1.246/Final-Project/backendMobile/fetch_fries.php`)
        setFriesProducts(response.data);
      } catch (error) {
        console.error('Error fetching fries products:', error);
      }
    };

    fetchFriesProducts();
  }, []);
  return (
    <View>
    <View style={styles.container}>
        <Text style={styles.welcomeTxt}> Fries </Text>
    </View>

    <View style={styles.containers}>
        <FlatList
        data={friesProducts}
        renderItem = {({item}) => <FriesCard product={item}/>}
        keyExtractor={item => item.id}
        numColumns={2}
        vertical 
        ItemSeparatorComponent={() => <View style={styles.separator}/>}
        />
   </View>
</View>
  )
}

export default Fries