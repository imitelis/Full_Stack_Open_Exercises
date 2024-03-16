import { View, StyleSheet, Dimensions } from 'react-native'
// import { useNavigate } from 'react-router-native'

import { formatDate } from '../../utils/formatDate'
import theme from '../../theme'
import Text from '../Text'

const screenWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
  },
  header: {
    flexDirection: 'row',
    padding: theme.propSizes.medium,
    paddingBottom: theme.propSizes.none,
  },
  circle: {
    width: theme.imageSizes.small,
    height: theme.imageSizes.small,
    borderRadius: theme.propSizes.larger,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.propSizes.large,
    marginTop: theme.propSizes.small,
    marginLeft: theme.propSizes.small,
  },
  rating: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  info: {
    flexDirection: 'column',
    marginTop: theme.propSizes.small,
    marginBottom: theme.propSizes.large,
    marginLeft: theme.propSizes.large,
    gap: theme.propSizes.small,
  },
  text: {
    width: screenWidth * 0.85,
    flexGrow: 1,
    flex: 1,
  },
})

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container} testID="reviewItem">
      <View style={styles.header}>
        <View style={styles.circle}>
          <Text style={styles.rating} testID="rating">
            {review.rating}
          </Text>
        </View>
        <View style={styles.info}>
          <Text fontWeight="bold" testID="userName">
            {review.user.username}
          </Text>
          <Text color="textSecondary" testID="createdAt">
            {formatDate(review.createdAt)}
          </Text>
          <Text style={styles.text} testID="text">
            {review.text}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default ReviewItem
