import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {Ionicons} from '@expo/vector-icons';

const BackBtn = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.backBtn}> 
        <Ionicons
            name='chevron-back-circle'
            size={30}
            color={"#2A4D50"}
        />
    </TouchableOpacity>
  )
}

export default BackBtn

const styles = StyleSheet.create({
    backBtn:{
        alignItems: 'center',
        position: 'absolute',
        zIndex: 999,
        top: 10
    }
})