import React, { useEffect, useState, useContext } from "react";

import { Link } from "react-router-dom";

import M from "materialize-css/dist/js/materialize.min.js";

export default function Footer() {
  return (
    <>
      <footer className="page-footer purple darken-4">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">Made with Node.js and Express</h5>
              <p className="grey-text text-lighten-4">
                And CodeMirror editor plugin.
              </p>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            © MIT
            <a
              className="grey-text text-lighten-4 right"
              href="https://github.com/sayantanm19"
            >
              More Projects
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
