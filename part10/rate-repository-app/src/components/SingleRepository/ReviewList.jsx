import { FlatList, View, StyleSheet } from 'react-native'

import ReviewItem from './ReviewItem'

import theme from '../../theme'

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.backgroundPrimary,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

export const ReviewList = ({ reviews }) => {
  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : []

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
    />
  )
}

export default ReviewList
