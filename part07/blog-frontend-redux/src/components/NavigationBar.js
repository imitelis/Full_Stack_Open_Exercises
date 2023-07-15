import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import LogoutForm from "./LogoutForm";

const NavigationBar = ({ user }) => {

    const padding = {
        padding: 5,
        flex: 1,
      };
    
  return (
    <div className="navbar" style={{ display: "flex" }}>
        <Link style={padding} to="/blogs">
          Blogs
        </Link>
        <Link style={padding} to="/users">
          Users
        </Link>
        {user && (
        <Link style={padding} to="/account">
          Account
        </Link>
        )}
        {user == null && (
          <Link style={padding} to="/logup">
            Log up
          </Link>
        )}
        {user == null && (
          <Link style={padding} to="/login">
            Log in
          </Link>
        )}
        {user && (
          <div style={{ display: "flex" }}>
            <LogoutForm user={user} />
          </div>
        )}
      </div>
  );
};

NavigationBar.propTypes = {
  user: PropTypes.object
};

export default NavigationBar;
