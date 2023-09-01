const Notification = ({ successMessage, errorMessage }) => {
  if (errorMessage === null || successMessage === null) {
    return null;
  } else if (successMessage) {
    return <div className="success">{successMessage}</div>;
  } else if (errorMessage) {
    return <div className="error">{errorMessage}</div>;
  }
};

export default Notification;
