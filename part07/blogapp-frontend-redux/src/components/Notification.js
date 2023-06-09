import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => {
    if (state.notification.message === "") {
      return { message: "", color: "" };
    } else if (state.notification.message !== "") {
      return {
        message: state.notification.message,
        color: state.notification.color,
      };
    }
  });

  const successStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  const errorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  if (notification.message === "") {
    return <div></div>;
  } else if (notification.color === "green") {
    return <div style={successStyle}>{notification.message}</div>;
  } else if (notification.color === "red") {
    return <div style={errorStyle}>{notification.message}</div>;
  }
};

export default Notification;
