import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import {combineReducers} from 'redux';
import accountReducer from './account';
import snackbarReducer from './slices/snackbar';
import notesReducer from './slices/notes';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['account', 'notes'],
};

const reducer = combineReducers({
  account: accountReducer,
  snackbar: snackbarReducer,
  notes: notesReducer,
});

export default persistReducer(rootPersistConfig, reducer);
