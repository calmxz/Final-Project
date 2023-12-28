import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import styles from "./tea.style"
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import TeaCard from './TeaCard'

const Tea = () => {
  const teaProducts = [1, 2, 3, 4, 5, 6]
  return (
    <View>
    <View style={styles.container}>
        <Text style={styles.welcomeTxt}> Tea </Text>
    </View>

    <View style={styles.containers}>
        <FlatList
        data={teaProducts}
        renderItem = {({item}) => <TeaCard/>}
        keyExtractor={item => item.id}
        numColumns={2}
        vertical 
        ItemSeparatorComponent={() => <View style={styles.separator}/>}
        />
   </View>
</View>
  )
}

export default Tea