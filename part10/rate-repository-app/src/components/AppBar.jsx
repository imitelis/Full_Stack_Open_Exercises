import Constants from 'expo-constants';
import { View, ScrollView, StyleSheet } from 'react-native';

import AppBarTab from './AppBarTab';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight + theme.propSizes.large,
    paddingBottom: theme.propSizes.large,
    paddingLeft: theme.propSizes.medium,
    paddingRight: theme.propSizes.medium, 
    color: theme.colors.secondary,
    fontSize: theme.fontSizes.bar,
    backgroundColor: theme.colors.textPrimary
  },
  scroll: {
    gap: theme.propSizes.medium
  }
});

const AppBar = () => {
  return (
  <View style={styles.container}>
    <ScrollView horizontal contentContainerStyle={styles.scroll}>
      <AppBarTab tabTitle={'Repositories'} tabLink={'/'} ></AppBarTab>
      <AppBarTab tabTitle={'Sign In'} tabLink={'/signin'}></AppBarTab>
    </ScrollView>
  </View>
  );
};

export default AppBar;