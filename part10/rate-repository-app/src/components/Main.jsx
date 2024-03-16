import { StyleSheet, View } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native'

import theme from '../theme'

import AppBar from './AppBar'
import RepositoryList from './RepositoryList'
import SingleRepository from './SingleRepository'
import CreateReview from './CreateReview'
import SignIn from './SignIn'
import SignUp from './SignUp'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
})

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="*" element={<Navigate to="/repositories" replace />} />
        <Route path="/repositories" element={<RepositoryList />} />
        <Route path="/repositories/:id" element={<SingleRepository />} />
        <Route path="/createreview" element={<CreateReview />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </View>
  )
}

export default Main
