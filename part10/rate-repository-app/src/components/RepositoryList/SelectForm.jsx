import React, { useState } from 'react'
import { View } from 'react-native'
import { Picker } from '@react-native-picker/picker'

const SelectForm = () => {
  const [selectedValue, setSelectedValue] = useState("")

  return (
    <View>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Select item..." value={null} color="red" />
        <Picker.Item label="Latest repositories" value="LATEST" />
        <Picker.Item label="Highest rated repositories" value="HIGHEST_RATED" />
        <Picker.Item label="Lowest rated repositories" value="LOWEST_RATED" />
      </Picker>
    </View>
  )
}

export default SelectForm
