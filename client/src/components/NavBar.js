import React, { useEffect, useState, useContext } from "react";

import { Link } from "react-router-dom";

import M from "materialize-css/dist/js/materialize.min.js";

export default function NavBar() {
  // Initialize sidebar
  useEffect(() => {
    let elem = document.querySelector(".sidenav");
    let instance = M.Sidenav.init(elem, {
      edge: "left",
      inDuration: 250,
    });
  }, []);

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
