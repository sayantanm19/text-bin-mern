import React, { useEffect, useState, useContext } from "react";

import M from "materialize-css/dist/js/materialize.min.js";

import { Redirect, Link, useHistory } from "react-router-dom";
import { customAlphabet } from "nanoid";
import AuthService from '../services/auth'

import axios from "axios";

import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript.js";

import "./NewPaste.css";

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 10);

export default function NewPaste() {
  const [title, setTitle] = useState("Untitled Paste");
  const [pasteContent, setPasteContent] = useState("");
  const [timeout, setTimeout] = useState(0);
  const [pasteID, setPasteID] = useState(nanoid());
  const [isPrivate, setIsPrivate] = useState(false);
  const [user, setUser] = useState({ user: { username: "anonymous"}});

  let history = useHistory();

  useEffect(() => {
    // Check for logged in user
    let loggedInUser = AuthService.checkLoggedIn();
    if (loggedInUser) setUser(loggedInUser);
  }, []);

  function submitPaste() {
    let exp_date;

    if (timeout > 0) {
      exp_date = new Date(Date.now() + timeout * 60 * 1000);
    } else {
      // Basically never expire
      exp_date = null;
    }

    axios
      .post("http://localhost:5000/add", {
        idx: pasteID,
        title: title,
        paste: pasteContent,
        expireAt: exp_date,
        isPrivate: isPrivate,
        author: user.user.username
      })
      .then(() => {
        M.toast({ html: "Paste was successfully inserted!" });

        const redir = "/paste/" + pasteID;

        // Redirect
        history.push(redir);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data == "pasteid-exists") {
            M.toast({
              html:
                "The paste link is already being used, please use a different one!",
            });
          } else {
            M.toast({ html: err });
          }
        }
      });
  }

  return (
    <div>
      {/* <i className="medium material-icons">speaker_notes</i> */}
      <div className="new-paste-heading">Add a New Paste</div>
      <div className="row">
        <div className="col s12 l9">
          <div className="card">
            <div className="card-content">
              <CodeMirror
                value={pasteContent}
                options={{
                  mode: "javascript",
                  theme: "material",
                  lineNumbers: true,
                  viewportMargin: Infinity,
                }}
                onBeforeChange={(editor, data, value) => setPasteContent(value)}
              />
            </div>
          </div>
        </div>
        <div className="col s12 l3">
          <div className="card">
            <div className="card-content">
              {/* <i
                className="material-icons prefix"
                style={{ verticalAlign: "bottom", marginRight: "10px" }}
              >
                edit
              </i> */}
              <span className="details-heading">Paste Title</span>
              <div className="input-field">
                <i className="material-icons prefix small">edit</i>
                <input
                  placeholder="Paste Title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              {/* <i
                className="material-icons prefix"
                style={{ verticalAlign: "bottom", marginRight: "10px" }}
              >
                access_time
              </i> */}
              <span className="details-heading">Timeout In Minutes</span>
              <div className="input-field">
                <i className="material-icons prefix small">access_time</i>
                <input
                  placeholder="Timeout of pastes"
                  type="number"
                  min="0"
                  value={timeout}
                  onChange={(e) => setTimeout(e.target.value)}
                />
              </div>

              {/* <span className="details-heading">Private Paste</span> */}

              {/* <i
                className="material-icons prefix"
                style={{ verticalAlign: "bottom", marginRight: "10px" }}
              >
                link
              </i> */}
              <span className="details-heading">Paste Link</span>
              <div className="input-field">
                <i className="material-icons prefix small">link</i>
                <input
                  placeholder="Paste Link"
                  type="text"
                  value={pasteID}
                  onChange={(e) => setPasteID(e.target.value)}
                />
              </div>

              <span className="details-heading">Privacy</span>
              <div class="switch">
                <label>
                  Public
                  <input type="checkbox" defaultChecked={isPrivate} onChange={() => setIsPrivate(!isPrivate)} />
                  <span class="lever"></span>
                  Private
                </label>
              </div>

              <button onClick={submitPaste} className="btn purple darken-4">
                Add New Paste
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
