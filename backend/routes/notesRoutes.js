import express from 'express';
import Notes from '../models/notesModel.js';
import jwt from 'jsonwebtoken';

const notesRouter = express.Router();

// Middleware to get user from token
const getUserFromToken = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({message: 'Invalid Authorization Header'});
  }
  const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (!user) {
      return res.status(401).send({message: 'Invalid Token'});
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).send({message: 'Invalid Token'});
  }
};

notesRouter.use(getUserFromToken);

notesRouter.get('/get_user_notes', async (req, res) => {
  const notes = await Notes.find({user: req.user._id});
  res.send(notes);
});

notesRouter.post('/create_note', async (req, res) => {
  const note = new Notes({
    title: req.body.title,
    content: req.body.content,
    user: req.user._id,
  });
  const createdNote = await note.save();
  res.send(createdNote);
});

notesRouter.post('/update_note/:id', async (req, res) => {
  const note = await Notes.findOne({_id: req.params.id, user: req.user._id});
  if (note) {
    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;
    const updatedNote = await note.save();
    res.send(updatedNote);
  } else {
    res.status(404).send({message: 'Note Not Found'});
  }
});

notesRouter.post('/delete_note/:id', async (req, res) => {
  const note = await Notes.findOne({_id: req.params.id, user: req.user._id});
  if (note) {
    const deletedNote = await note.deleteOne();
    res.send(deletedNote);
  } else {
    res.status(404).send({message: 'Note Not Found'});
  }
});

export default notesRouter;
