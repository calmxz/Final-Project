import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import styles from "./fries.style"
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import FriesCard from './FriesCard'

const Fries = () => {
  const friesProducts = [1, 2, 3, 4, 5, 6]
  return (
    <View>
    <View style={styles.container}>
        <Text style={styles.welcomeTxt}> Fries </Text>
    </View>

    <View style={styles.containers}>
        <FlatList
        data={friesProducts}
        renderItem = {({item}) => <FriesCard/>}
        keyExtractor={item => item.id}
        numColumns={2}
        vertical 
        ItemSeparatorComponent={() => <View style={styles.separator}/>}
        />
   </View>
</View>
  )
}

export default Fries