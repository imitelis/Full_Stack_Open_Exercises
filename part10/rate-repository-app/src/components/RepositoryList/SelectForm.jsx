import { Platform, StyleSheet, View } from 'react-native'
import { Searchbar } from 'react-native-paper'
import { Picker } from '@react-native-picker/picker'
import { FontAwesome } from '@expo/vector-icons'

import theme from '../../theme'

const styles = StyleSheet.create({
  icon: {
    color: theme.colors.textSecondary,
  },
  searchBar: {
    marginVertical: theme.propSizes.medium,
    marginHorizontal: theme.propSizes.medium,
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.propSizes.small,
    shadowColor: theme.colors.textSecondary,
    shadowRadius: theme.propSizes.small,
    shadowOpacity: 0.5,
    elevation: theme.propSizes.small,
    fontSize: theme.fontSizes.large,
  },
  webPicker: {
    marginVertical: theme.propSizes.medium,
    marginHorizontal: theme.propSizes.medium,
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.propSizes.small,
    elevation: theme.propSizes.small,
    paddingHorizontal: theme.propSizes.larger,
    paddingVertical: theme.propSizes.large,
    fontSize: theme.fontSizes.large,
  },
})

const SelectForm = ({ order, setOrder, searchWord, setSearchWord }) => {
  return (
    <View>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchWord}
        value={searchWord}
        icon={() => (
          <FontAwesome
            name="search"
            style={styles.icon}
            size={theme.propSizes.larger}
          />
        )}
        clearIcon={() => (
          <FontAwesome
            name="close"
            style={styles.icon}
            size={theme.propSizes.larger}
          />
        )}
        style={styles.searchBar}
      />
      <Picker
        selectedValue={order}
        onValueChange={(itemValue) => setOrder(itemValue)}
        style={Platform.OS === 'web' ? styles.webPicker : null}
      >
        <Picker.Item
          label="Select item..."
          value={null}
          color={theme.colors.textSecondary}
        />
        <Picker.Item label="Latest repositories" value="LATEST" />
        <Picker.Item label="Highest rated repositories" value="HIGHEST_RATED" />
        <Picker.Item label="Lowest rated repositories" value="LOWEST_RATED" />
      </Picker>
    </View>
  )
}

export default SelectForm
