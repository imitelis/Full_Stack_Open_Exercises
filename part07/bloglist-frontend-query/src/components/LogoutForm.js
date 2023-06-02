import PropTypes from "prop-types";

const LogoutForm = (props) => (
  <div>
    {props.name} logged in
    <button
      onClick={() => {
        window.localStorage.removeItem("loggedNoteappUser");
        props.setUser(null);
      }}
      id="logout-button"
    >
      logout
    </button>
  </div>
);

LogoutForm.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default LogoutForm;
