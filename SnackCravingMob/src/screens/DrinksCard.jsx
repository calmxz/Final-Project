import { TouchableOpacity, Text, View, Image } from 'react-native'
import React from 'react'
import styles from './drinksCard.style';
import { useNavigation } from "@react-navigation/native";

const DrinksCard = ({product}) => {
    const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=>navigation.navigate("ProductDetails", {item: product})}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../images/Drinks.jpg')}
            style={styles.images}
          />
        </View>

        <View styles = {styles.details}>
          <Text style = {styles.title}>{product.product_name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default DrinksCard