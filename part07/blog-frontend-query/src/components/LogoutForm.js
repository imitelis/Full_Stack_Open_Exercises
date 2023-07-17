// import PropTypes from "prop-types";
import { useMutation } from "react-query";
import { Button } from "react-bootstrap";

import { useNotificationDispatchValue } from "../NotificationContext";
import { useUserDispatchValue } from "../UserContext";

import { setToken } from "../requests/blogs";

const LogoutForm = (props) => {
  const setTokenMutation = useMutation(setToken);

  const userDispatch = useUserDispatchValue();
  const notificationDispatch = useNotificationDispatchValue();

  const handleLogout = () => {
    notificationDispatch({
      type: "GREEN_NOTIFICATION",
      payload: `good-bye ${props.user.name}!`,
    });
    window.localStorage.removeItem("loggedBlogUser");
    userDispatch({ type: "END_SESSION", payload: null });
    setTokenMutation.mutate(null);
  };

  return (
    <div>
      {props.user.name} logged in{" "}
      <Button variant="primary" onClick={handleLogout}>
        log out
      </Button>
    </div>
  );
};

/*
LogoutForm.propTypes = {
  user: PropTypes.object
};
*/

export default LogoutForm;
