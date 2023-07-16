import { createContext, useReducer, useContext } from "react";

const userReducer = (state = null, action) => {
  switch (action.type) {
    case "BEGIN_SESSION":
      // console.log("userReducer here", action.payload)
      return action.payload;
    case "END_SESSION":
      return null;
    default:
      return state;
  }
};

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, "");

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserValue = () => {
  const userAndDispatch = useContext(UserContext);
  return userAndDispatch[0];
};

export const useUserDispatchValue = () => {
  const userAndDispatch = useContext(UserContext);
  return userAndDispatch[1];
};

export default UserContext;
