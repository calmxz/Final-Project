import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import styles from "./iceCream.style"
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import IceCreamCard from './iceCreamCard'

const IceCream = () => {
  const iceCreamProducts = [1, 2, 3, 4, 5, 6]
  return (
    <View>
    <View style={styles.container}>
        <Text style={styles.welcomeTxt}> Ice Cream </Text>
    </View>

    <View style={styles.containers}>
        <FlatList
        data={iceCreamProducts}
        renderItem = {({item}) => <IceCreamCard/>}
        keyExtractor={item => item.id}
        numColumns={2}
        vertical 
        ItemSeparatorComponent={() => <View style={styles.separator}/>}
        />
   </View>
</View>
  )
}

export default IceCream
