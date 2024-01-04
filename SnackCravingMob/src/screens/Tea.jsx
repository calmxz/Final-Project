import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from "./tea.style"
import axios from 'axios';
import TeaCard from './TeaCard'

const Tea = () => {
  const [teaProducts, setTeaProducts] = useState([]);

    useEffect(() => {
        const fetchTeaProducts = async () => {
            try {
                const response = await axios.get(`http://192.168.1.117/Final-Project/backendMobile/fetch_tea.php`);
                setTeaProducts(response.data);
            } catch (error) {
                console.error('Error fetching tea products:', error);
            }
        };

        fetchTeaProducts();
    }, []);

  return (
    <View>
    <View style={styles.container}>
        <Text style={styles.welcomeTxt}> Tea </Text>
    </View>

    <View style={styles.containers}>
        <FlatList
        data={teaProducts}
        renderItem = {({item}) => <TeaCard product={item}/>}
        keyExtractor={item => item.id}
        numColumns={2}
        vertical 
        ItemSeparatorComponent={() => <View style={styles.separator}/>}
        />
   </View>
</View>
  )
}

export default Tea