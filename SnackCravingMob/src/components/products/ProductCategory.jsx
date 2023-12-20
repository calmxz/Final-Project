import { FlatList, Text, View } from 'react-native'
import React from 'react'
import CategoryCard from './CategoryCard';
import styles from "./productCategory.style"

const ProductCategoryRow = () => {
    const categories = [1, 2, 3, 4, 5, 6]
  return (
   <View style={styles.container}>
        <FlatList
        data={categories}
        renderItem = {({item}) => <CategoryCard/>}
        keyExtractor={item => item.id}
        numColumns={2}
        ItemSeparatorComponent={() => <View style={styles.separator}/>}
        />
   </View>
  )
}

export default ProductCategoryRow
