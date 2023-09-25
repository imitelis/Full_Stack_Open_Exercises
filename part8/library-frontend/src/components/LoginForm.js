import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@apollo/client";

import { LOGIN, ME } from "../queries";

const LoginForm = ({ setToken, setErrorMessage, setSuccessMessage }) => {
  const [username, setUsername] = useState("mluukkai");
  const [password, setPassword] = useState("secret");

  const navigate = useNavigate();

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setErrorMessage(error.graphQLErrors[0].message);
    },
    onCompleted: () => {
      setSuccessMessage(`welcome ${username}!`);
    },
    onSuccess: () => {
      navigate("/books");
    },
    refetchQueries: [{ query: ME }],
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("loggedLibraryToken", token);
    }
  }, [result.data]); // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault();

    login({ variables: { username, password } });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
