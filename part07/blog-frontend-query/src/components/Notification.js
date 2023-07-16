import { useEffect } from 'react';

import { useNotificationValue, useNotificationDispatchValue } from '../NotificationContext';

const Notification = () => {

  const notification = useNotificationValue();
  const notificationDispatch = useNotificationDispatchValue();

  useEffect(() => {
    if (notification.message && notification.color) {
      const timeout = setTimeout(() => {
        setTimeout(() => {notificationDispatch({ type: "CLEAR_NOTIFICATION" })}, 5000)
      }, 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [notification, notificationDispatch]);

  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }
  
  if (notification.message === '') {
    return (
      <div>
      </div>
    )
  } else if (notification.color === 'green') {
    return (
      <div style={successStyle}>
        {notification.message}
      </div>
    )
  } else if (notification.color === 'red') {
    return (
      <div style={errorStyle}>
        {notification.message}
      </div>
    )
  }
}

export default Notification