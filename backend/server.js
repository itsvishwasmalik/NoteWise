import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes.js';
import notesRouter from './routes/notesRoutes.js';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to Database');
  })
  .catch(error => {
    console.log(error.message);
  });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/users', userRouter);
app.use('/api/notes', notesRouter);

app.use((err, req, res, next) => {
  res.status(500).send({message: err.message});
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
