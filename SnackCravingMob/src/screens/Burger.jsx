import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from './burger.style';
import axios from 'axios';
import BurgerCard from './BurgerCard';

const Burger = () => {
    const [burgerProducts, setBurgerProducts] = useState([]);

    useEffect(() => {
        const fetchBurgerProducts = async () => {
            try {
                const response = await axios.get(`http://192.168.1.246/Final-Project/backendMobile/fetch_burger_products.php`);
                setBurgerProducts(response.data);
            } catch (error) {
                console.error('Error fetching burger products:', error);
            }
        };

        fetchBurgerProducts();
    }, []);

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.welcomeTxt}>Burger</Text>
            </View>

            <View style={styles.containers}>
                <FlatList
                    data={burgerProducts}
                    renderItem={({ item }) => <BurgerCard product={item} />}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
            </View>
        </View>
    );
};

export default Burger;
