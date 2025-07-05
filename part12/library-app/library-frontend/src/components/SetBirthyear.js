import { useEffect, useState } from "react";
import Select from "react-select";

import { useMutation } from "@apollo/client";

import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries";

const SetBirthyear = ({ authors, setSuccessMessage, setErrorMessage }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      setErrorMessage(error.graphQLErrors[0].message);
    },
    onCompleted: () => {
      setSuccessMessage(`${name}'s birthyear was edited`);
    },
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();
    if (born === "") {
      setErrorMessage(`error: birth (${born}) is required`);
    } else if (born !== "") {
      editAuthor({ variables: { name, setBornTo: Number(born) } });
      // setSuccessMessage(`${name}'s birthyear was edited`);
    }
    setBorn("");
  };

  const nameOptions = authors.map((a) => ({ value: a.name, label: a.name }));

  useEffect(() => {
    setName(nameOptions[0].value); // eslint-disable-next-line
  }, []);

  const handleChange = (selectedOption) => {
    setName(selectedOption.value);
  };

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p>name: </p>
          <Select
            options={nameOptions}
            defaultValue={nameOptions[0]}
            onChange={handleChange}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p>born: </p>
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default SetBirthyear;
