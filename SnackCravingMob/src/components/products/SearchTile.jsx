import { Image, Text, View, TouchableOpacity } from 'react-native'
import React from 'react';
import styles from "./searchTile.style";
import { useNavigation } from "@react-navigation/native";

const SearchTile = ({item}) => {
    const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('ProductDetails', {item})}>
        <View style={styles.image}>
            <Image 
            source={require(`../../../images/burger/cheeseburger.jpg`)}
            style={styles.productImg}
            />
        </View>
        <View style = {styles.textContainer}>
            <Text style = {styles.productTitle}>{item.product_name}</Text>
            <Text style = {styles.productPrice}>{item.product_category}</Text>
            <Text style = {styles.productPrice}>₱{item.price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default SearchTile
