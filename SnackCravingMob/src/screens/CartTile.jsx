import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

const CartTile = ({ item, onDelete, onUpdateQuantity }) => {
  const handleIncrement = () => {
    const newQuantity = parseInt(item.quantity) + 1;
    const newTotalAmount = newQuantity * item.price;
    onUpdateQuantity(item.cart_id, newQuantity, item.price, newTotalAmount);
  };

  const handleDecrement = () => {
    const newQuantity = item.quantity - 1;
    const newTotalAmount = newQuantity * item.price;
    if (newQuantity >= 1) {
      onUpdateQuantity(item.cart_id, newQuantity, item.price, newTotalAmount);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.productTitle}>{item.product_name}</Text>
        <Text style={styles.productPrice}>Price: ₱{item.total_amount}</Text>
      </View>
      <View style={styles.middleContainer}>
        <TouchableOpacity
          onPress={() => handleDecrement()}
          style={styles.iconMinus}
        >
          <SimpleLineIcons name="minus" size={22} />
        </TouchableOpacity>
        <TextInput
          style={styles.quantityInput}
          value={item.quantity.toString()}
          onChangeText={(text) => {
            const newQuantity = parseInt(text) || 1;
            item.quantity = newQuantity;
            const newTotalAmount = newQuantity * item.price;
            onUpdateQuantity(
              item.cart_id,
              newQuantity,
              item.price,
              newTotalAmount
            );
          }}
          keyboardType="numeric"
        />
        <TouchableOpacity
          onPress={() => handleIncrement()}
          style={styles.iconPlus}
        >
          <SimpleLineIcons name="plus" size={22} />
        </TouchableOpacity>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={() => onDelete(item.cart_id)}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartTile;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#FFFAFA",
    shadowColor: "#FAFAFC",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
  leftContainer: {
    flex: 1,
    marginRight: 20,
  },
  middleContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  iconMinus: {
    marginRight: 8,
  },
  iconPlus: {
    marginLeft: 8,
  },
  rightContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    textAlign: "center",
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "semibold",
    color: "#2A4D50",
  },
  productPrice: {
    fontSize: 12,
    fontWeight: "regular",
    color: "#83829A",
    marginTop: 3,
  },
  deleteText: {
    backgroundColor: "red",
    borderRadius: 15,
    color: "white",
    padding: 10,
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
  },
});
