import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { FlatList, View, StyleSheet } from 'react-native'

import theme from '../../theme'
import useRepositories from '../../hooks/useRepositories'

import SelectForm from './SelectForm'
import RepositoryItem from './RepositoryItem'

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  select: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.propSizes.larger,
  },
})

/*
const repositories = [
  {
    id: 'jaredpalmer.formik',
    fullName: 'jaredpalmer/formik',
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
  },
  {
    id: 'rails.rails',
    fullName: 'rails/rails',
    description: 'Ruby on Rails',
    language: 'Ruby',
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
  },
  {
    id: 'django.django',
    fullName: 'django/django',
    description: 'The Web framework for perfectionists with deadlines.',
    language: 'Python',
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
  },
  {
    id: 'reduxjs.redux',
    fullName: 'reduxjs/redux',
    description: 'Predictable state container for JavaScript apps',
    language: 'TypeScript',
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
  },
];
*/

const ItemSeparator = () => <View style={styles.separator} />

export const RepositoryListContainer = ({
  repositories,
  order,
  setOrder,
  searchWord,
  setSearchWord,
  onEndReach,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  return (
    <>
      <SelectForm
        order={order}
        setOrder={setOrder}
        searchWord={searchWord}
        setSearchWord={setSearchWord}
      />
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem repository={item} />}
        keyExtractor={(item) => item.id}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    </>
  )
}

const RepositoryList = () => {
  const [order, setOrder] = useState('')
  const [searchWord, setSearchWord] = useState('')
  const [debouncedsearchWord] = useDebounce(searchWord, 1000)

  const { repositories, fetchMore } = useRepositories({
    order,
    debouncedsearchWord,
  })

  const onEndReach = () => {
    // console.log('You have reached the end of the list');
    fetchMore()
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      order={order}
      setOrder={setOrder}
      searchWord={searchWord}
      setSearchWord={setSearchWord}
      onEndReach={onEndReach}
    />
  )
}

export default RepositoryList
