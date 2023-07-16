import { useEffect } from "react";
import { Alert } from "react-bootstrap";

import {
  useNotificationValue,
  useNotificationDispatchValue,
} from "../NotificationContext";

const Notification = () => {
  const notification = useNotificationValue();
  const notificationDispatch = useNotificationDispatchValue();

  useEffect(() => {
    if (notification.message && notification.color) {
      const timeout = setTimeout(() => {
        setTimeout(() => {
          notificationDispatch({ type: "CLEAR_NOTIFICATION" });
        }, 5000);
      }, 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [notification, notificationDispatch]);

  if (notification.message === "") {
    return <div className="notification"></div>;
  } else if (notification.color === "green") {
    return (
      <div className="notification">
        <Alert variant="success">{notification.message}</Alert>
      </div>
    );
  } else if (notification.color === "red") {
    return (
      <div className="notification">
        <Alert variant="danger">{notification.message}</Alert>
      </div>
    );
  }
};

export default Notification;
