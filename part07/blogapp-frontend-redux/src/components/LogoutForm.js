import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { setGreenNotification } from "../reducers/notificationReducer";
import { endSession } from "../reducers/userReducer";

const LogoutForm = ({ user }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setGreenNotification(`good-bye ${user.name}!`));
    dispatch(endSession());
  };

  return (
    <div>
      {user.name} logged in
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
