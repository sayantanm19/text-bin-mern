import Pastes from "../models/paste.js";

export const getPaste = async (req, res) => {
  try {
    const pasteMessages = await Pastes.findOne({ idx: req.params.idx });
    res.status(200).json(pasteMessages);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getAllPastes = async (req, res) => {
  try {
    const pasteMessages = await Pastes.find();
    res.status(200).json(pasteMessages);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const createPaste = async (req, res) => {
  const newPaste = Pastes(req.body);

  console.log(newPaste);

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

export const editPaste = (req, res) => {
  res.send("Editing Paste");
};

export const deletePaste = (req, res) => {
  res.send("Deleting Paste");
};
