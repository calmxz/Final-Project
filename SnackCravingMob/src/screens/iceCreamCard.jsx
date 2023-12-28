import { TouchableOpacity, Text, View, Image } from 'react-native'
import React from 'react'
import styles from './iceCreamCard.style';
import { useNavigation } from "@react-navigation/native";

const IceCreamCard = () => {
    const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=>navigation.navigate("ProductDetails")}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../images/icecream/vanilla.webp')}
            style={styles.images}
          />
        </View>

        <View styles = {styles.details}>
          <Text style = {styles.title}>Ice Cream</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default IceCreamCard