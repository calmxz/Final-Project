import { TouchableOpacity, Text, View, Image } from 'react-native'
import React from 'react'
import styles from './burgerCard.style';
import { useNavigation } from "@react-navigation/native";

const BurgerCard = () => {
    const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=>navigation.navigate("ProductDetails")}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../images/burger/cheeseburger.jpg')}
            style={styles.images}
          />
        </View>

        <View styles = {styles.details}>
          <Text style = {styles.title}>Burger</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default BurgerCard