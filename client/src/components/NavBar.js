import React, { useEffect, useState, useContext } from "react";

import AuthService from '../services/auth'

import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";

import M from "materialize-css/dist/js/materialize.min.js";

export default function NavBar() {

  const history = useHistory();

  const [user, setUser] = useState(null);

  // Initialize sidebar
  useEffect(() => {
    let elem = document.querySelector(".sidenav");
    let instance = M.Sidenav.init(elem, {
      edge: "left",
      inDuration: 250,
    });

    // Check for logged in user
    let loggedInUser = AuthService.checkLoggedIn();
    if (loggedInUser) setUser(loggedInUser);
  }, []);

  function logoutUser() {
    AuthService.logout();
    history.push("/login");
    window.location.reload(false);
  }

  return (
    <>
      <nav className="purple darken-4">
        <div className="nav-wrapper container">
          <span className="brand-logo">
            <Link to="/">Text Bin MERN</Link>
            <i className="large material-icons">rss_feed</i>
          </span>
          <a href="/" data-target="mobile-sidebar" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li>
              <Link to="/">New Paste</Link>
            </li>
            <li>
              <Link to="/latest">Latest Pastes</Link>
            </li>

            {user ? <li>
              <Link to="/" onClick={logoutUser}>Logout</Link>
            </li> : <><li>
              <Link to="/login">Login</Link>
            </li>
              <li>
                <Link to="/register">Register</Link>
              </li></>}
          </ul>
        </div>
      </nav>

      <ul className="sidenav sidenav-close" id="mobile-sidebar">
        <li>
          <div className="user-view">
            <div className="drawer-background" style={{ height: "35px" }}>
              <h5>RSS Reader</h5>
            </div>
          </div>
        </li>
        <li>
          <Link to="/">New Paste</Link>
        </li>
        <li>
          <Link to="/latest">Latest Pastes</Link>
        </li>
      </ul>
    </>
  );
}
