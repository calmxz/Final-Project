import { TouchableOpacity, View, Image, TextInput, Text } from 'react-native'
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from "./search_style";
import { Feather } from '@expo/vector-icons';
import axios from "axios";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import SearchTile from '../components/products/SearchTile';

const Search = () => {
  const [searchKey, setSearchKey] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  console.log(searchResults);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://192.168.1.117/Final-Project/backendMobile/search_products.php`, {
        params: {
          searchKey: searchKey,
        },
      });
      console.log(response);
      setSearchResults(response.data);
    } catch (error) {
      console.log("Failed to get products", error);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={styles.searchContainer}>
          <TouchableOpacity>
            <Feather name="search" size={24} style={styles.searchIcon}/>
          </TouchableOpacity>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              value={searchKey}
              onChangeText={setSearchKey}
              placeholder='Search'
            />
          </View>
          <View>
            <TouchableOpacity style={styles.searchBtn} onPress={() => handleSearch()}>
              <Feather name="search" size={24} style={{ color: "#F3F4F8" }}/>
            </TouchableOpacity>
          </View>
        </View>
        {searchResults.length === 0 ? (
          <View style={{ flex: 1 }}>
          </View>
        ) : (
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.product_id.toString()}
            renderItem={({ item }) => (<SearchTile item = {item}/>)}
            style={{marginHorizontal: 12}}
          />
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default Search