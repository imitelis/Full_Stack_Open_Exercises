import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { setGreenNotification } from "../reducers/notificationReducer";
import { endSession } from "../reducers/userReducer";

const LogoutForm = ({ user }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setGreenNotification(`good-bye ${user.name}!`));
    dispatch(endSession());
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <em>{user.name} logged in </em>
      <button onClick={handleLogout} id="logout-button">
        logout
      </button>
    </div>
  );
};

LogoutForm.propTypes = {
  user: PropTypes.object.isRequired,
};

export default LogoutForm;
