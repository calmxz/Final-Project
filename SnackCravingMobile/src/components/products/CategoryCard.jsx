import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { Asset } from 'expo-asset';
import styles from './categoryCard.style';

const CategoryCard = () => {
  const imageUri = Asset.fromModule(require('./images/burger/cheeseburger.jpg')).uri;

  return (
    <TouchableOpacity onPress={() => {}}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            uri={imageUri}
            style={styles.image}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;
