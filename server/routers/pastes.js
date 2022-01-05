import express from "express";
import { getPaste, getAllPastes, createPaste, editPaste, deletePaste } from "../controllers/pastes.js";

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Please do something!');
})

router.post('/add', createPaste);
router.get('/get/:idx', getPaste);
router.get('/getall', getAllPastes);
router.put('/edit/:idx', editPaste);
router.delete('/delete/:idx', deletePaste);

export default router;