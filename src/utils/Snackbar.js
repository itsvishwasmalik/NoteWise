import React from 'react';
import {
  Button,
  Portal,
  Snackbar as RNPaperSnackbar,
  Text,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {closeSnackbar} from '../store/slices/snackbar';

const Snackbar = () => {
  const dispatch = useDispatch();
  const {
    visible,
    message,
    duration,
    action,
    onActionPress,
    snackbarStyle,
    textStyle,
  } = useSelector(state => state.snackbar);

  const onDismissSnackbar = () => {
    dispatch(closeSnackbar());
  };

  const onActionPressHandler = () => {
    onActionPress && onActionPress();
    dispatch(closeSnackbar());
  };

  return (
    <Portal>
      <RNPaperSnackbar
        visible={visible}
        duration={duration}
        onDismiss={onDismissSnackbar}
        action={
          action && <Button onPress={onActionPressHandler}>{action}</Button>
        }
        style={snackbarStyle}>
        <Text style={textStyle}>{message}</Text>
      </RNPaperSnackbar>
    </Portal>
  );
};

export default Snackbar;
