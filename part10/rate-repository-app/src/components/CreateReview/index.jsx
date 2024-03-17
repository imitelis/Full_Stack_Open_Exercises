import { useNavigate } from 'react-router-native'
import { View, Pressable, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'

import theme from '../../theme'
import useReview from '../../hooks/useReview'

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
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
}

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .min(4, "Repository owner name's length must be greater than or equal to 4")
    .required('Repository owner name is required'),

  repositoryName: yup
    .string()
    .min(3, "Repository name's length must be greater than or equal to 3")
    .required('Repository name is required'),

  rating: yup
    .number()
    .typeError('Rating must be a number')
    .min(0, "Rating's value must be greater than or equal to 0")
    .max(100, "Rating's value must be less than or equal to 100")
    .required('Rating is required'),
})

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.form}>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput name="text" placeholder="Review" />
      <Pressable style={styles.submitButton} onPress={onSubmit}>
        <Text style={styles.submitText}>Create a Review</Text>
      </Pressable>
    </View>
  )
}

export const CreateReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      style={styles.container}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const CreateReview = () => {
  const [createReview] = useReview()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const ownerName = values.ownerName
    const repositoryName = values.repositoryName
    const rating = Number(values.rating)
    const text = values.text

    try {
      const data = await createReview({
        ownerName,
        repositoryName,
        rating,
        text,
      })
      navigate(`/repositories/${ownerName}.${repositoryName}`)
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }

  return <CreateReviewContainer onSubmit={onSubmit} />
}

export default CreateReview
