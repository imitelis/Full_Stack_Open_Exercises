import { Button } from "react-native";
import { useNavigate } from "react-router-native";
import { Formik } from "formik";
import * as yup from "yup";

import FormikTextInput from "./FormikTextInput";
import useAuth from "../hooks/useAuth";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, "Username must be at least 4 characters in length")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters in length")
    .required("Password is required"),
});

const SignInForm = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn(username, password);
      // const user = await getCurrentUser();
      // console.log("logged in as", user);
      navigate("/repositories");
    } catch (e) {
      console.error(e);
    }
  };

  return <SignInFormContainer onSubmit={onSubmit} />;
};

export const SignInFormContainer = ({ onSubmit }) => {
  return (
    <>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <>
            <FormikTextInput
              name="username"
              placeholder="Username"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
            />
            <FormikTextInput
              name="password"
              placeholder="Password"
              isSecure={true}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            <Button onPress={handleSubmit} title="Login" />
          </>
        )}
      </Formik>
    </>
  );
};

export default SignInForm;