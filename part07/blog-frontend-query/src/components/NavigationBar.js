import { Link } from "react-router-dom";
import { Nav, Navbar } from 'react-bootstrap'

import LogoutForm from "./LogoutForm";

const NavigationBar = ({ user }) => {

    const padding = {
        padding: 5,
        flex: 1,
      };

      if (!user || user === null) {
        return (
          <div className="navbar d-flex">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="navbar w-100" fluid="true">
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto d-flex justify-content-between align-items-center w-100">
                  <Nav.Link href="#" as="span">
                    <Link className="p-5 flex-fill h5" to="/blogs">Blogs</Link>
                  </Nav.Link>
                  <Nav.Link href="#" as="span">
                    <Link className="p-5 flex-fill h5" to="/users">Users</Link>
                  </Nav.Link>
                  <Nav.Link href="#" as="span">
                    <Link className="p-5 flex-fill h5" to="/logup">Log up</Link>
                  </Nav.Link>
                  <Nav.Link href="#" as="span">
                    <Link className="p-5 flex-fill h5" to="/login">Log in</Link>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
        )
      }
      
      return (
        <div className="navbar d-flex">
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="navbar w-100" fluid="true">
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto d-flex justify-content-between align-items-center w-100">
                  <Nav.Link as="span">
                    <Link className="p-5 flex-fill h5" to="/blogs">Blogs</Link>
                  </Nav.Link>
                  <Nav.Link as="span">
                    <Link className="p-5 flex-fill h5" to="/users">Users</Link>
                  </Nav.Link>
                  <Nav.Link as="span">
                    <Link className="p-5 flex-fill h5" to="/account">Account</Link>
                  </Nav.Link>
                  <Nav.Link as="span">
                    <div className="d-flex"><LogoutForm user={user} /></div>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
      );
    };

export default NavigationBar;
