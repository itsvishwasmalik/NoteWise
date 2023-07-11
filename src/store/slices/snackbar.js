import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  visible: false,
  message: 'Note archived',
  duration: 3000, // Snackbar duration in milliseconds
  action: null, // action label
  onActionPress: null, // callback function when action is pressed
  snackbarStyle: {backgroundColor: '#F5F5F5'},
  textStyle: {color: '#2F2F2F'}, // custom styles
};

// Snackbar slice
const snackbar = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    openSnackbar(state, {payload}) {
      const {
        visible,
        message,
        duration,
        actionLabel,
        onActionPress,
        snackbarStyle,
        textStyle,
      } = payload;

      state.visible = visible || initialState.visible;
      state.message = message || initialState.message;
      state.duration = duration || initialState.duration;
      state.action = actionLabel || initialState.action;
      state.onActionPress = onActionPress || initialState.onActionPress;
      state.snackbarStyle = snackbarStyle || initialState.snackbarStyle;
      state.textStyle = textStyle || initialState.textStyle;
    },

    closeSnackbar(state) {
      state.visible = false;
    },
  },
});

export default snackbar.reducer;

export const {closeSnackbar, openSnackbar} = snackbar.actions;
