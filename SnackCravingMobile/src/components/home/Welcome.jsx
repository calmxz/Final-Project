import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import styles from './welcome.style';
import { Feather, Ionicons } from '@expo/vector-icons';

const Welcome = () => {
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
                onPressIn={()=>{}}
                placeholder='Search'
                />
            </View>
        </View>
        <View>
            <TouchableOpacity>
                <Ionicons />
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Welcome