import { View, Image, StyleSheet } from 'react-native'

import Text from '../Text'

import theme from '../../theme'

function formatNumber(number) {
  if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'k'
  }
  return number.toString()
}

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
    width: theme.imageSizes.small,
    height: theme.imageSizes.small,
    borderRadius: theme.propSizes.tiny,
  },
  info: {
    flexDirection: 'column',
    marginLeft: theme.propSizes.large,
    gap: theme.propSizes.small,
  },
  language: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    padding: theme.propSizes.small,
    borderRadius: theme.propSizes.tiny,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.propSizes.big,
    paddingTop: theme.propSizes.medium,
    paddingBottom: theme.propSizes.medium,
    gap: theme.propSizes.big,
  },
  stat: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.propSizes.small,
  },
})

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Image
            source={{ uri: `${repository.ownerAvatarUrl}` }}
            style={styles.avatar}
          />
        </View>
        <View style={styles.info}>
          <Text fontWeight="bold">{repository.fullName} </Text>
          <Text color="textSecondary">{repository.description}</Text>
          <Text style={styles.language} color="secondary">
            {repository.language}
          </Text>
        </View>
      </View>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text fontWeight="bold">
            {formatNumber(repository.stargazersCount)}
          </Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View style={styles.stat}>
          <Text fontWeight="bold">{formatNumber(repository.forksCount)}</Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View style={styles.stat}>
          <Text fontWeight="bold">{formatNumber(repository.reviewCount)}</Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View style={styles.stat}>
          <Text fontWeight="bold">
            {formatNumber(repository.ratingAverage)}
          </Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
    </View>
  )
}

export default RepositoryItem
