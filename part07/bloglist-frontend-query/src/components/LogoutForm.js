import PropTypes from "prop-types";

import { useNotificationDispatchValue } from '../NotificationContext'
import { useUserDispatchValue } from '../UserContext'

const LogoutForm = (props) => {

  const userDispatch = useUserDispatchValue();
  const notificationDispatch = useNotificationDispatchValue();

  const handleLogout = () => {
    notificationDispatch({ type: "GREEN_NOTIFICATION", payload: `good-bye ${props.user.name}!`})
    setTimeout(() => {notificationDispatch({ type: "CLEAR_NOTIFICATION" })}, 5000)
    window.localStorage.removeItem("loggedBlogUser");
    userDispatch({ type: "CLEAR_USER", payload: null});
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
};

export default LogoutForm;
