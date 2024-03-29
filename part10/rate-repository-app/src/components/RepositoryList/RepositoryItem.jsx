import { View, Image, StyleSheet, Pressable } from 'react-native'
import { useNavigate } from 'react-router-native'

import theme from '../../theme'
import { formatNumber } from '../../utils/formatNumber'

import Text from '../Text'

const styles = StyleSheet.create({
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
})

const RepositoryItem = ({ repository }) => {
  const navigate = useNavigate()

  const handleView = () => {
    navigate(`/repositories/${repository.id}`)
  }

  return (
    <Pressable
      style={styles.container}
      testID="repositoryItem"
      onPress={handleView}
    >
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
    </Pressable>
  )
}

export default RepositoryItem
