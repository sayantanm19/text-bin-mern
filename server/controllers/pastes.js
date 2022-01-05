import Pastes from "../models/paste.js";
import jwt from "jsonwebtoken";

function checkUser(request, username) {
  const header = request.header('Authorization');
  if (typeof header !== 'undefined') {

    // Get the token from the second index
    // of the header
    const token = header.split(' ')[1];

    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      return (verified.username == username);
    } catch (err) {
      throw new Error(err);
    }
  }
  else {
    return false;
  }
}

export const getPaste = async (req, res) => {
  try {

    // Find paste by ID
    const pasteMessages = await Pastes.findOne({ idx: req.params.idx });

    if (!pasteMessages) return res.status(404).json({ error: "Paste Not Found" });

    if (pasteMessages.isPrivate) {
      if (checkUser(req, pasteMessages.author))
        res.status(200).json(pasteMessages);
      else
        res.status(401).json({ error: "Invalid Token" });
    }
    else {
      res.status(200).json(pasteMessages);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getAllPastes = async (req, res) => {
  try {

    // TODO: Change find() to only show public pastes
    const pasteMessages = await Pastes.find();
    res.status(200).json(pasteMessages);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const createPaste = async (req, res) => {
  const newPaste = Pastes(req.body);
  // console.log(newPaste);
  try {
    // Check if ID already exists
    const pasteMessages = await Pastes.findOne({ idx: req.body.idx });

    if (pasteMessages) {
      console.log("Exists");

      throw new Error("pasteid-exists");
    } else {
      await newPaste.save();

      res.status(201).json(newPaste);
    }
  } catch (error) {
    console.log(error);
    res.status(409).send(error.message);
  }
};

export const editPaste = async (req, res) => {

  const editedPaste = req.body;

  try {
    const pasteMessages = await Pastes.findOne({ idx: req.params.idx });

    if (!pasteMessages) return res.status(404).json({ error: "Paste Not Found" });

    console.log("Private:", pasteMessages.isPrivate)

    if (pasteMessages.isPrivate) {
      if (checkUser(req, pasteMessages.author)) {

        Pastes.findOneAndUpdate({ idx: req.params.idx }, editedPaste, function (err, doc) {
          if (err) return res.status(500).send({ error: err });

          if (doc) return res.status(200).send('Succesfully saved.');
          return res.status(404).send('Document not found.');
        });
      }
      else {
        res.status(401).send({ error: "Invalid Token" });
      }
    }
    else {
      res.status(403).send("Not Accessible");
    }
  } catch (error) {
    res.status(409).send(error.message);
  }
};

export const deletePaste = async (req, res) => {

  try {
    const pasteMessages = await Pastes.findOne({ idx: req.params.idx });

    if (!pasteMessages) return res.status(404).json({ error: "Paste Not Found" });

    if (pasteMessages.isPrivate) {
      if (checkUser(req, pasteMessages.author)) {
        Pastes.deleteOne({ idx: req.params.idx }, function (err) {
          if (err) return res.status(500).send({ error: err });
          return res.status(200).send('Document deleted.');
        });
      }
      else {
        res.status(401).json({ error: "Invalid Token" });
      }
    }
    else {
      res.status(403).json({ error: "Not Allowed" });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
