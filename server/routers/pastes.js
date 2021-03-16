import express from "express";
import { getPaste, getAllPastes, createPaste, editPaste, deletePaste } from "../controllers/pastes.js";

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Please do something!');
})

router.get('/hello', (req, res) => {
  res.send("Hello");
})

router.post('/add', createPaste);
router.get('/get/:idx',  getPaste);
router.get('/getall',  getAllPastes);
router.get('/edit',  editPaste);
router.get('/delete',  deletePaste);

export default router;