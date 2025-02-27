import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, } from 'react-native';
import { addTodo, useFireTodos } from '../firebase/FireStoreController';
import StarRating from 'react-native-star-rating-widget';
import { PaperProvider } from 'react-native-paper';
import { Alert, TextInput, Button, Title, } from 'react-native-paper';
import * as Location from 'expo-location';

function AddLocationScreen () {

    const [todoText, setTodoText] = useState('');
    const [stars, setStars] = useState(0);
    const [reviews, setReviews] = useState('');

    async function handleAddTodo() {
        if (!todoText) {
            Alert.alert('No location, Please select location first.');
            return;
        }

        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission to access location was denied');
            return;

        }

        try {
            const geoResults = await Location.geocodeAsync(todoText);
            if (!geoResults.length) {
                Alert.alert('Location not found');
                return;
            }

            const { latitude, longitude } = geoResults[0];

            addTodo(todoText, stars, reviews, { latitude, longitude});


            setTodoText('');
            setStars(0);
            setReviews('');

            Alert.alert('Location added successfully!');
        } catch (error) {
            console.error(error);
        } 
    }
    return (

        <PaperProvider>
          <SafeAreaView style={styles.container}>
            <Title style={styles.title}Add a new location></Title>
            <TextInput
              label={'Add new location'}
              value={todoText}
              onChangeText={setTodoText}
              style = {styles.input}
            />
            <TextInput
              label={'Add review text'}
              value={reviews}
              onChangeText={setReviews}
              style = {styles.input}
              />
            < View style={styles.starRating}>
            <StarRating
              rating={stars}
              onChange={setStars}
              starSize={24}
              color="gold"
            />
            </View>
            <Button
              mode="contained"
              icon={'plus-circle'}
              onPress={handleAddTodo}
              style={styles.button}
              >
                Add location
              </Button>
          </SafeAreaView>
        </PaperProvider>
    
      );
};

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    alignItems: 'center', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
    width: '90%', 
  },
  starRating: {
    marginBottom: 16,
    alignItems: 'center',
  },
  button: {
    marginTop: 16,
    padding: 8,
    width: '70%',
    alignItems: 'center',
  },
});



export default AddLocationScreen;