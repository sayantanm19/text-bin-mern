import React, { useEffect, useState, useContext } from "react";

import moment from "moment";

import axios from "axios";

export default function NewPaste() {
  const [pastes, setPastes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/getall").then((res) => {
      setPastes(res.data);
    });
  }, []);

  return (
    <div>
      <h3>Latest Pastes</h3>
      {pastes.length ? (
        <ul className="collection">
          {pastes.map((paste, idx) => {
            let pasteLink = "http://localhost:3000/paste/" + paste.idx;

            return (
              <li className="collection-item" key={idx}>
                {paste.title} on {moment(paste.createdAt).format("lll")}{" "}
                <a href={pasteLink}>Goto Paste</a>
              </li>
            );
          })}
        </ul>
      ) : (
        <h5>No Pastes Exists</h5>
      )}
    </div>
  );
}
