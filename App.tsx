/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {AuthProvider} from './src/contexts/AuthContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {store} from './src/store';
import Snackbar from './src/utils/Snackbar';
import Routes from './src/routes/Routes';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Provider store={store}>
          <AuthProvider>
            <NavigationContainer>
              <Routes />
              <Snackbar />
            </NavigationContainer>
          </AuthProvider>
        </Provider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

export default App;
