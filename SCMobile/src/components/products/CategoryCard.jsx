import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import styles from './categoryCard.style';

const CategoryCard = () => {
  return (
    <TouchableOpacity onPress={() => {}}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Text>TEST</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}


export default CategoryCard;
