import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Loadable from '../utils/Loadable';
import useAuth from '../hooks/useAuth';

const Stack = createNativeStackNavigator();

const LoginScreen = Loadable(React.lazy(() => import('../screens/Login.js')));

const HomeScreen = Loadable(React.lazy(() => import('../screens/Home.js')));

const NoteScreen = Loadable(React.lazy(() => import('../screens/Note.js')));

const Routes = () => {
  const {isLoggedIn} = useAuth();

  return (
    <Stack.Navigator>
      {!isLoggedIn ? (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
      )}
      <Stack.Screen
        name="Note"
        component={NoteScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
