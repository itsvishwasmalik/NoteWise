import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  notes: {},
};

// Notes slice
const notes = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    getNotes: (state, action) => {
      const tempNotes = action.payload.notes?.reduce((obj, note) => {
        obj[note._id] = note;
        return obj;
      }, {});
      state.notes = tempNotes;
    },
    addNote: (state, action) => {
      state.notes[action.payload.note._id] = action.payload.note;
    },
    updateNote: (state, action) => {
      const note = action.payload.note;
      state.notes[note._id] = note;
    },
    deleteNote: (state, action) => {
      const id = action.payload.id;
      delete state.notes[id];
    },
  },
});

export default notes.reducer;

export const {getNotes, addNote, updateNote, deleteNote} = notes.actions;
