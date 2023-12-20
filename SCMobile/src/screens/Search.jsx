import { TouchableOpacity, View, TextInput } from 'react-native'
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from "./search_style";
import { Feather } from '@expo/vector-icons';

const Search = () => {
  return (
    <SafeAreaView>
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
            <View>
              <TouchableOpacity style={styles.searchBtn}>
              <Feather name="search" size={24} style={{ color: "#F3F4F8" }}/>
              </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default Search

