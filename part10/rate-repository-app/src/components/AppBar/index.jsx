import Constants from 'expo-constants'
import { View, ScrollView, StyleSheet } from 'react-native'

import useAuthenticate from '../../hooks/useAuthenticate'

import AppBarTab from './AppBarTab'
import SignOutTab from './SignOutTab'

import theme from '../../theme'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight + theme.propSizes.large,
    paddingBottom: theme.propSizes.large,
    paddingLeft: theme.propSizes.medium,
    paddingRight: theme.propSizes.medium,
    color: theme.colors.secondary,
    fontSize: theme.fontSizes.bar,
    backgroundColor: theme.colors.textPrimary,
  },
  scroll: {
    gap: theme.propSizes.medium,
  },
})

const AppBar = () => {
  const user = useAuthenticate()

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scroll}>
        <AppBarTab
          tabTitle={'Repositories'}
          tabLink={'/repositories'}
        ></AppBarTab>
        {user ? (
          <>
            <AppBarTab
              tabTitle={'Create a Review'}
              tabLink={'/createreview'}
            ></AppBarTab>
            <SignOutTab />
          </>
        ) : (
          <>
            <AppBarTab tabTitle={'Sign In'} tabLink={'/signin'}></AppBarTab>
            <AppBarTab tabTitle={'Sign Up'} tabLink={'/signup'}></AppBarTab>
          </>
        )}
      </ScrollView>
    </View>
  )
}

export default AppBar
