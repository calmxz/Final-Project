import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from "./fries.style"
import axios from 'axios';
import PastaCard from './PastaCard'

const Pasta = () => {
  const [pastaProducts, setPastaProducts] = useState([]);

    useEffect(() => {
        const fetchPastaProducts = async () => {
            try {
                const response = await axios.get(`http://192.168.1.246/Final-Project/backendMobile/fetch_pasta.php`);
                setPastaProducts(response.data);
            } catch (error) {
                console.error('Error fetching pasta products:', error);
            }
        };

        fetchPastaProducts();
    }, []);
  return (
    <View>
    <View style={styles.container}>
        <Text style={styles.welcomeTxt}> Pasta </Text>
    </View>

    <View style={styles.containers}>
        <FlatList
        data={pastaProducts}
        renderItem = {({item}) => <PastaCard product={item}/>}
        keyExtractor={item => item.id}
        numColumns={2}
        vertical 
        ItemSeparatorComponent={() => <View style={styles.separator}/>}
        />
   </View>
</View>
  )
}

export default Pasta
