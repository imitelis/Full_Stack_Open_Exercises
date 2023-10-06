import { View, Pressable } from 'react-native';
import { Formik, Form, useField } from 'formik';

import Text from './Text';
import FormikTextInput from './FormikTextInput';

const initialValues = {
  mass: '',
  height: '',
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <View>
      <Text>The sign-in view</Text>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form>
      <FormikTextInput name="username" />      
        <FormikTextInput name="password" />      
        <Pressable onPress={onSubmit}>
          <Text>Sign In</Text>
      </Pressable>
      </Form>
      </Formik>
    </View>
  );
};

export default SignIn;