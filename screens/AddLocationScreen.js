import React, { useState } from 'react';
import { SafeAreaView, } from 'react-native';
import { addTodo, useFireTodos } from '../firebase/FireStoreController';
import StarRating from 'react-native-star-rating-widget';
import { PaperProvider } from 'react-native-paper';
import { Alert, TextInput, Button } from 'react-native-paper';
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
            
            <TextInput
              label={'Add new location'}
              value={todoText}
              onChangeText={setTodoText}
            />
            <TextInput
              label={'Add review text'}
              value={reviews}
              onChangeText={setReviews}
              />
            <StarRating
              rating={stars}
              onChange={setStars}
              starSize={24}
              color="gold"
            />
            <Button
              mode="contained"
              icon={'plus-circle'}
              onPress={handleAddTodo}
              >
                Add location
              </Button>
          </SafeAreaView>
        </PaperProvider>
    
      );
}

export default AddLocationScreen;