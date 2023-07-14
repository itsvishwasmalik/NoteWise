import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
        theme={{
          colors: {
            primary: '#2596be',
            underlineColor: 'transparent',
            onSurfaceVariant: '#383838',
          },
          roundness: 10,
        }}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        style={styles.input}
        theme={{
          colors: {
            primary: '#2596be',
            underlineColor: 'transparent',
            onSurfaceVariant: '#383838',
          },
          roundness: 10,
        }}
      />

      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#171923',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 32,
  },
  input: {
    width: '90%',
    marginBottom: 16,
    backgroundColor: '#e2e8f0',
    borderRadius: 10,
  },
  button: {
    width: '90%',
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: '#2596be',
  },
});

export default LoginScreen;
