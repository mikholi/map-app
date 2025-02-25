import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './navigation/Navigations';
import { auth } from './firebase/Config'; 

export default function App() {
  useEffect(() => {
    const checkFirebaseConnection = async () => {
      try {
        const user = auth.currentUser;
        console.log('Current user:', user);
      } catch (error) {
        console.error('Error connecting to Firebase:', error);
      }
    };

    checkFirebaseConnection();
  }, []);

  return (
    <Navigation />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});