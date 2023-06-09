import PropTypes from "prop-types";

import { useNotificationDispatchValue } from '../NotificationContext'

const LogoutForm = (props) => {

  const notificationDispatch = useNotificationDispatchValue();

  const handleLogout = () => {
    notificationDispatch({ type: "GREEN_NOTIFICATION", payload: `good-bye ${props.user.name}!`})
    window.localStorage.removeItem("loggedNoteappUser");
    props.setUser(null);
    // dispatch(endSession());
  };
  
  return(
    <div>
      {props.user.name} logged in
      <button
        onClick={handleLogout}
        id="logout-button"
      >
      logout
      </button>
    </div>
  )
};

LogoutForm.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired
};

export default LogoutForm;
