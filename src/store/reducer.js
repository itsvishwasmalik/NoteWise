import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import {combineReducers} from 'redux';
import accountReducer from './account';
import snackbarReducer from './slices/snackbar';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['account'],
};

const reducer = combineReducers({
  account: accountReducer,
  snackbar: snackbarReducer,
});

export default persistReducer(rootPersistConfig, reducer);
