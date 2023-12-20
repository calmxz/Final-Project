import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import styles from './welcome.style';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
    const navigation = useNavigation();
  return (
    <View>
        <View style={styles.container}>
            <Text style={styles.welcomeTxt}> Categories </Text>
        </View>

        <View style={styles.searchContainer}>
            <TouchableOpacity>
                <Feather name="search" size={24} style={styles.searchIcon}/>
            </TouchableOpacity>
            <View style={styles.searchWrapper}>
                <TextInput
                style={styles.searchInput}
                value=""
                onPressIn={()=>navigation.navigate("Search")}
                placeholder='Search'
                />
            </View>
        </View>
    </View>
  )
}

export default Welcome