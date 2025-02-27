import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase/Config'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginState = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        setIsLoggedIn(true);
        navigation.navigate('Home');
      }
    };
    checkLoginState();
  }, []);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await AsyncStorage.setItem('user', JSON.stringify(userCredential.user));
      setIsLoggedIn(true);
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    setIsLoggedIn(false);
    navigation.navigate('Login');
  };

  if (isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.welcometext}>Welcome, you are logged in!</Text>
        <TouchableOpacity style={styles.buttonContainer} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOGIN</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  welcometext: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 40,
    width: 100,
    padding: 10,
    backgroundColor: '#21B4DE',
    elevation: 2,
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default LoginScreen;