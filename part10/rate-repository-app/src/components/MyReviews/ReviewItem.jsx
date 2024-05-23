import { View, Pressable, StyleSheet, Dimensions, Alert } from 'react-native'
import { useNavigate } from 'react-router-native'

import { formatDate } from '../../utils/formatDate'
import useDeleteReview from '../../hooks/useDeleteReview'

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
    padding: theme.propSizes.small,
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
    flex: 1,
    flexGrow: 1,
    width: screenWidth * 0.85,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    flex: 1,
    alignItems: 'center',
    margin: theme.propSizes.middle,
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.propSizes.large,
    borderRadius: theme.propSizes.tiny,
  },
  deleteButton: {
    flex: 1,
    alignItems: 'center',
    margin: theme.propSizes.middle,
    backgroundColor: theme.colors.error,
    paddingVertical: theme.propSizes.large,
    borderRadius: theme.propSizes.tiny,
  },
  submitText: {
    color: theme.colors.secondary,
    fontSize: theme.fontSizes.large,
    fontWeight: theme.fontWeights.bold,
  },
})

const ReviewItem = ({ review }) => {
  console.log(review)
  const navigate = useNavigate()
  const [deleteReview] = useDeleteReview()

  const onOpen = () => {
    navigate(`/repositories/${review.repository.id}`)
  }

  const onDelete = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('canceled'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => handleDelete(review.id),
          style: 'destructive',
        },
      ],
      { cancelable: true },
    )
  }

  const handleDelete = async (id) => {
    try {
      await deleteReview(id)
    } catch (e) {
      console.log(e)
    }
  }

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
            {review.repository.fullName}
          </Text>
          <Text color="textSecondary" testID="createdAt">
            {formatDate(review.createdAt)}
          </Text>
          <Text style={styles.text} testID="text">
            {review.text}
          </Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <Pressable style={styles.submitButton} onPress={onOpen}>
          <Text style={styles.submitText}>View repository</Text>
        </Pressable>
        <Pressable style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.submitText}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default ReviewItem
