import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import styles from "./drinks.style"
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import DrinksCard from './DrinksCard'

const Drinks = () => {
  const drinksProducts = [1, 2, 3, 4, 5, 6]
  return (
    <View>
    <View style={styles.container}>
        <Text style={styles.welcomeTxt}> Drinks </Text>
    </View>

    <View style={styles.containers}>
        <FlatList
        data={drinksProducts}
        renderItem = {({item}) => <DrinksCard/>}
        keyExtractor={item => item.id}
        numColumns={2}
        vertical 
        ItemSeparatorComponent={() => <View style={styles.separator}/>}
        />
   </View>
</View>
  )
}

export default Drinks