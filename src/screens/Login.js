import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import useAuth from '../hooks/useAuth';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {login} = useAuth();

  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      setIsLoading(false);
      return;
    }
    if (password.length === 0) {
      alert('Please enter a password to login');
      return;
    }
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
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

      <Button
        mode="contained"
        loading={isLoading}
        disabled={isLoading}
        onPress={handleLogin}
        style={styles.button}>
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
    color: '#ffffff',
  },
});

export default LoginScreen;
