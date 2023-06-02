import { useDispatch } from 'react-redux'
import PropTypes from "prop-types";

import { endSession } from '../reducers/loginReducer'

import store from '../store'

const LogoutForm = (props) => {

  const dispatch = useDispatch();
  
  const handleLogout = () => {
    window.localStorage.removeItem("loggedNoteappUser");
    dispatch(endSession())
    console.log(store.getState().login)
  }

  return(
    <div>
      {props.name} logged in
      <button onClick={handleLogout} id="logout-button">
        logout
      </button>
    </div>
  )
}

LogoutForm.propTypes = {
  setUser: PropTypes.func.isRequired,
}

export default LogoutForm;
