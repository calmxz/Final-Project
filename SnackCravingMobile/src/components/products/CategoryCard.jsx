import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image'
import styles from './categoryCard.style';

const CategoryCard = () => {
  return (
    <TouchableOpacity onPress={() => {}}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('./images/caprese.jpg')}
            style={styles.image}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}


export default CategoryCard;
