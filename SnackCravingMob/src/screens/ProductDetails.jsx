import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, Image, Alert } from "react-native";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import styles from "./productDetails.style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ProductDetails = ({ route, navigation }) => {
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);

  useEffect(() => {
    checkExistingUser();
  }, []);
  

  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem("id");
    const userId = `user${JSON.parse(id)}`;

    try {
      const currentUser = await AsyncStorage.getItem(userId);

      if (currentUser !== null) {
        const parsedData = JSON.parse(currentUser);
        setUserData(parsedData);
        setUserLogin(true);
      }
    } catch (error) {
      console.log("Error retrieving the data:", error);
    }
  };

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

  

  const handleAddToCart = async () => {
    try {
      const response = await axios.post(
        "http://192.168.1.117/Final-Project/backendMobile/addToCart.php",
        {
          user_id: userData.user_id,
          product_id: item.product_id,
          quantity: count,
        }
      );

      if (response.data.success) {
        Alert.alert("Success", "Item added to cart successfully");
      } else {
        Alert.alert("Error", "Failed to add item to cart");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      Alert.alert("Error", "An error occurred while adding item to cart");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="heart" size={30} color={"#e81e4d"} />
        </TouchableOpacity>
      </View>

      <Image
        source={require("../../images/burger/caprese.jpg")}
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
              <SimpleLineIcons name="minus" size={22} />
            </TouchableOpacity>
            <Text style={styles.countText}> {count} </Text>
            <TouchableOpacity onPress={() => increment()}>
              <SimpleLineIcons name="plus" size={22} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>Description</Text>
          <Text style={styles.descText}>
            Indulge in the savory delight of our signature Cheeseburger! Made
            with 100% pure beef patty with freshly toasted buns topped with a
            slice of melt-in-your-mouth American cheese, chopped onions,
            ketchup, mustard, and a zesty pickle. Seasoned with a dash of salt
            and pepper.
          </Text>

          <View style={styles.nutritionWrapper}>
            <Text style={styles.nutrition}>Nutrion Summary: </Text>
            <Text style={{ fontSize: 12 }}>Calories: 140kcal</Text>
            <Text style={{ fontSize: 12 }}>Fat: 17g</Text>
            <Text style={{ fontSize: 12 }}>Protein: 19g</Text>
            <Text style={{ fontSize: 12 }}>Carbohydrates: 27g</Text>
          </View>

          <View style={styles.cartRow}>
              <TouchableOpacity
                onPress={handleAddToCart}
                style={styles.cartBtn}
              >
                <Text style={styles.cartTitle}>Add to cart</Text>
              </TouchableOpacity>
          
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductDetails;
