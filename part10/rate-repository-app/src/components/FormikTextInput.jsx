import { StyleSheet } from 'react-native'
import { useField } from 'formik'

import theme from '../theme'

import TextInput from './TextInput'
import Text from './Text'

const styles = StyleSheet.create({
  input: {
    borderWidth: theme.propSizes.unit,
    borderColor: theme.colors.textSecondary,
    borderRadius: theme.propSizes.tiny,
    color: theme.colors.textSecondary,
    paddingVertical: theme.propSizes.large,
    paddingHorizontal: theme.propSizes.medium,
    marginBottom: theme.propSizes.large,
  },
  errorText: {
    marginBottom: theme.propSizes.medium,
    color: theme.colors.error,
  },
})

const FormikTextInput = ({ name, isSecure, ...props }) => {
  const [field, meta, helpers] = useField(name)
  const showError = meta.touched && meta.error

  return (
    <>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        secureTextEntry={isSecure}
        style={styles.input}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  )
}

export default FormikTextInput
