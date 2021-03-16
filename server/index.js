import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import pastesRouter from './routers/pastes.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use('/', pastesRouter);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .catch((error) => console.log("MongoDB Error", error));

app.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`);
});
