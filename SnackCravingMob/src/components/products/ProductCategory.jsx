// ProductCategoryRow.js
import { FlatList, View, ActivityIndicator, Text } from 'react-native';
import CategoryCard from './CategoryCard';
import styles from './productCategory.style';
import useFetchCategories from '../../hook/fetchCategories';

const ProductCategoryRow = () => {
  const { data, isLoading, error } = useFetchCategories();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data.categories}
        keyExtractor={(item) => item.product_category_id.toString()}
        renderItem={({ item }) => <CategoryCard item={item} />}
        numColumns={2}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default ProductCategoryRow;
