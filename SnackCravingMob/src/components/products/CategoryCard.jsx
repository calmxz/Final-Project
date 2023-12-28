import { TouchableOpacity, Text, View, Image } from 'react-native';
import React from 'react';
import styles from './categoryCard.style';
import { useNavigation } from "@react-navigation/native";

const CategoryCard = ({ item }) => {
  const navigation = useNavigation();

  const navigateToProductCategory = () => {
    // Dynamically navigate to a screen based on the product_category value
    navigation.navigate(item.product_category, { category: item.product_category });
  };

  return (
    <TouchableOpacity onPress={navigateToProductCategory}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require(`../../../images/burger/cheeseburger.jpg`)}
            style={styles.images}
          />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{item.product_category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;
