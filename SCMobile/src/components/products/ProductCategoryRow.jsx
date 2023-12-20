import { FlatList, Text, View } from 'react-native'
import React from 'react'
import CategoryCard from './CategoryCard';

const ProductCategoryRow = () => {
    const categories = [1, 2, 3, 4, 5, 6]
  return (
   <View style={{marginTop: 24}}>
        <FlatList
        data={categories}
        renderItem = {({item}) => <CategoryCard/>}
        horizontal
        contentContainerStyle={{columnGap: 16}}
        />
   </View>
  )
}

export default ProductCategoryRow
