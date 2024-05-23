import { View, Image, StyleSheet, Pressable } from 'react-native'
import { useParams } from 'react-router-native'
import { Linking } from 'react-native-web'

import ReviewList from './ReviewList'

import useRepository from '../../hooks/useRepository'
import { formatNumber } from '../../utils/formatNumber'

import theme from '../../theme'
import Text from '../Text'

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  container: {
    backgroundColor: theme.colors.secondary,
  },
  header: {
    flexDirection: 'row',
    padding: theme.propSizes.medium,
    paddingBottom: theme.propSizes.none,
  },
  avatar: {
    width: theme.imageSizes.middle,
    height: theme.imageSizes.middle,
    margin: theme.propSizes.tiny,
    borderRadius: theme.propSizes.tiny,
  },
  info: {
    flexDirection: 'column',
    marginTop: theme.propSizes.middle,
    marginLeft: theme.propSizes.large,
    gap: theme.propSizes.small,
  },
  language: {
    alignSelf: 'flex-start',
    color: theme.colors.secondary,
    backgroundColor: theme.colors.primary,
    padding: theme.propSizes.small,
    borderRadius: theme.propSizes.tiny,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.propSizes.bigger,
    paddingTop: theme.propSizes.middle,
    paddingBottom: theme.propSizes.medium,
    gap: theme.propSizes.medium,
  },
  stat: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.propSizes.small,
  },
  form: {
    flexDirection: 'column',
    padding: theme.propSizes.medium,
    backgroundColor: theme.colors.secondary,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.propSizes.large,
    borderRadius: theme.propSizes.tiny,
    alignItems: 'center',
  },
  submitText: {
    color: theme.colors.secondary,
    fontSize: theme.fontSizes.large,
    fontWeight: theme.fontWeights.bold,
  },
})

export const SingleRepositoryContainer = ({ repository, onEndReach }) => {
  const onOpen = () => {
    Linking.openURL(repository.url)
  }

  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.header}>
        <View>
          <Image
            source={{ uri: `${repository.ownerAvatarUrl}` }}
            style={styles.avatar}
          />
        </View>
        <View style={styles.info}>
          <Text fontWeight="bold" testID="fullName">
            {repository.fullName}
          </Text>
          <Text color="textSecondary" testID="description">
            {repository.description}
          </Text>
          <Text style={styles.language} testID="language">
            {repository.language}
          </Text>
        </View>
      </View>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text fontWeight="bold" testID="stargazersCount">
            {formatNumber(repository.stargazersCount)}
          </Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View style={styles.stat}>
          <Text fontWeight="bold" testID="forksCount">
            {formatNumber(repository.forksCount)}
          </Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View style={styles.stat}>
          <Text fontWeight="bold" testID="reviewCount">
            {formatNumber(repository.reviewCount)}
          </Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View style={styles.stat}>
          <Text fontWeight="bold" testID="ratingAverage">
            {formatNumber(repository.ratingAverage)}
          </Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
      <View style={styles.form}>
        <Pressable style={styles.submitButton} onPress={onOpen}>
          <Text style={styles.submitText}>Open in Github</Text>
        </Pressable>
      </View>
      <View style={styles.separator} />
      <ReviewList reviews={repository.reviews} onEndReach={onEndReach} />
    </View>
  )
}

const SingleRepository = () => {
  const { id } = useParams()
  const { repository, fetchMore } = useRepository(id)

  const onEndReach = () => {
    console.log('You have reached the end of the list')
    fetchMore()
  }

  if (repository)
    return (
      <SingleRepositoryContainer
        repository={repository}
        onEndReach={onEndReach}
      />
    )
}

export default SingleRepository
