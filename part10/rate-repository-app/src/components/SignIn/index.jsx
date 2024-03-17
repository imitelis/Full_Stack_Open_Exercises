import { useNavigate } from 'react-router-native'
import { View, Pressable, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'

import theme from '../../theme'
import useSignIn from '../../hooks/useSignIn'

import Text from '../Text'
import FormikTextInput from '../FormikTextInput'

const styles = StyleSheet.create({
  container: {
    padding: theme.propSizes.medium,
    backgroundColor: theme.colors.secondary,
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

const initialValues = {
  username: '',
  password: '',
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, "Username's length must be greater than or equal to 4")
    .required('Username is required'),

  password: yup
    .string()
    .min(5, "Password's length must be greater than or equal to 5")
    .required('Password is required'),
})

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.form}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" isSecure={true} />
      <Pressable style={styles.submitButton} onPress={onSubmit}>
        <Text style={styles.submitText}>Sign In</Text>
      </Pressable>
    </View>
  )
}

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      style={styles.container}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const SignIn = () => {
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const username = values.username
    const password = values.password

    try {
      const data = await signIn({ username, password })
      navigate('/repositories')
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }

  return <SignInContainer onSubmit={onSubmit} />
}

export default SignIn
