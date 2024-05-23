import { useNavigate } from 'react-router-native'
import { View, Pressable, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'

import theme from '../../theme'
import useSignUp from '../../hooks/useSignUp'
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
  passwordConfirm: '',
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username's length must be greater than or equal to 5")
    .max(50, "Username's length must be less than or equal to 50")
    .required('Username is required'),

  password: yup
    .string()
    .min(5, "Password's length must be greater than or equal to 5")
    .max(50, "Password's length must be less than or equal to 50")
    .required('Password is required'),

  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .min(5, "Password confirmation's length must be greater than or equal to 5")
    .max(50, "Password confirmation's length must be less than or equal to 50")
    .required('Password confirmation is required'),
})

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.form}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" isSecure={true} />
      <FormikTextInput
        name="passwordConfirm"
        placeholder="Password confirmation"
        isSecure={true}
      />
      <Pressable style={styles.submitButton} onPress={onSubmit}>
        <Text style={styles.submitText}>Sign Up</Text>
      </Pressable>
    </View>
  )
}

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      style={styles.container}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const SignUp = () => {
  const [signUp] = useSignUp()
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const username = values.username
    const password = values.password

    try {
      await signUp({ username, password })
      await signIn({ username, password })
      navigate('/repositories')
    } catch (e) {
      console.log(e)
    }
  }

  return <SignUpContainer onSubmit={onSubmit} />
}

export default SignUp
