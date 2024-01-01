import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import styles from './productDetails.style';

const ProductDetails = ({ route, navigation }) => {
  const [count, setCount] = useState(1);
  const { item } = route.params;

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name='chevron-back-circle' size={30} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { /* Handle favorite action */ }}>
          <Ionicons name='heart' size={30} color={"#e81e4d"} />
        </TouchableOpacity>
      </View>

      <Image
        source={require('../../images/burger/caprese.jpg')} 
        style={styles.image}
      />

      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{item.product_name}</Text>
        </View>

        <View style={styles.priceRow}>
          <View style={styles.price}>
            <Text style={styles.priceText}>₱{item.price}</Text>
          </View>
          <View style={styles.price}>
            <TouchableOpacity onPress={() => decrement()}>
              <SimpleLineIcons
                name='minus'
                size={22}
              />
            </TouchableOpacity>
            <Text style={styles.countText}>  {count}  </Text>
            <TouchableOpacity onPress={() => increment()}>
              <SimpleLineIcons
                name='plus'
                size={22}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>
            Description
          </Text>
          <Text style={styles.descText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at enim eget mauris vestibulum eleifend eu vel massa. Vestibulum arcu lacus, sagittis eget erat et, tristique maximus ipsum. Fusce scelerisque lorem non rhoncus mollis. Vestibulum vehicula egestas urna, sed ullamcorper est tempor pharetra. Curabitur suscipit vulputate nulla, ac consectetur tellus dignissim eu. Vestibulum hendrerit orci justo, id lacinia neque tempor id. Pellentesque varius tellus vel justo pharetra, eu vulputate diam elementum. Aliquam sed augue ac nisi scelerisque pulvinar. Fusce vel lorem sit amet nulla pulvinar dapibus ut a ante.
          </Text>

          <View style={styles.nutritionWrapper}>
            <Text style={styles.nutrition}>Nutrion Summary: </Text>
            <Text style={{ fontSize: 12 }}>Calories: 140kcal</Text>
            <Text style={{ fontSize: 12 }}>Fat: 17g</Text>
            <Text style={{ fontSize: 12 }}>Protein: 19g</Text>
            <Text style={{ fontSize: 12 }}>Carbohydrates: 27g</Text>
          </View>

          <View style={styles.cartRow}>
            <TouchableOpacity onPress={() => { /* Handle add to cart action */ }} style={styles.cartBtn}>
              <Text style={styles.cartTitle}>Add to cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default ProductDetails;