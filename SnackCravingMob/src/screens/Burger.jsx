import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import styles from "./burger.style"
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import BurgerCard from './BurgerCard'

const Burger = () => {
  const burgerProducts = [1, 2, 3, 4, 5, 6]
  return (
    <View>
    <View style={styles.container}>
        <Text style={styles.welcomeTxt}> Burger </Text>
    </View>

    <View style={styles.containers}>
        <FlatList
        data={burgerProducts}
        renderItem = {({item}) => <BurgerCard/>}
        keyExtractor={item => item.id}
        numColumns={2}
        vertical 
        ItemSeparatorComponent={() => <View style={styles.separator}/>}
        />
   </View>
</View>
  )
}

export default Burger
