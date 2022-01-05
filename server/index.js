import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import passportConfig from './strategies/local.cjs'

import pastesRouter from './routers/pastes.js';
import usersRouter from './routers/users.js';

passportConfig(passport);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log("MongoDB Error:", error));

mongoose.connection.on('connected', function () {  
  console.log('Connected');
});

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use(passport.initialize());
app.use('/user', usersRouter);
app.use('/paste', passport.authenticate('jwt', { session: false }), pastesRouter);

app.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`);
});
