/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
// import {SafeAreaView} from 'react-native';
import {AuthProvider} from './src/contexts/AuthContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {store} from './src/store';
import Home from './src/screens/Home';
import Snackbar from './src/utils/Snackbar';
import LoginScreen from './src/screens/Login';
import NoteScreen from './src/screens/Note';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        {/* <SafeAreaView> */}
        <Provider store={store}>
          <AuthProvider>
            <NavigationContainer>
              <NoteScreen />
              <Snackbar />
            </NavigationContainer>
          </AuthProvider>
        </Provider>
        {/* </SafeAreaView> */}
      </PaperProvider>
    </SafeAreaProvider>
  );
}

export default App;
