import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import styles from "./iceCream.style"
import axios from 'axios';
import IceCreamCard from './iceCreamCard'

const IceCream = () => {
  const [iceCreamProducts, setIceCreamProducts] = useState([]);

    useEffect(() => {
        const fetchIceCreamProducts = async () => {
            try {
                const response = await axios.get(`http://192.168.1.117/Final-Project/backendMobile/fetch_icecream.php`);
                setIceCreamProducts(response.data);
            } catch (error) {
                console.error('Error fetching ice cream products:', error);
            }
        };

        fetchIceCreamProducts();
    }, []);
  return (
    <View>
    <View style={styles.container}>
        <Text style={styles.welcomeTxt}> Ice Cream </Text>
    </View>

    <View style={styles.containers}>
        <FlatList
        data={iceCreamProducts}
        renderItem = {({item}) => <IceCreamCard product={item}/>}
        keyExtractor={item => item.id}
        numColumns={2}
        vertical 
        ItemSeparatorComponent={() => <View style={styles.separator}/>}
        />
   </View>
</View>
  )
}

export default IceCream
