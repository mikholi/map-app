import React, { useEffect, useState } from 'react';
import {StyleSheet, TextInput, Button, } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native';

const MapScreen = () => {
    const [location, setLocation] = useState({ lat: 65.0800, lon: 25.4800});
    const [place, setPlace] = useState('');

    useEffect(() => {
        getLocation();
        async function getLocation() {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Lowest });
            setLocation({ lat: location.coords.latitude, lon: location.coords.longitude});

        }
    }, []);


    async function search() {
        let coords = await Location.geocodeAsync(place);
        if (coords[0]) {
            setLocation({ lat: coords[0].latitude, lond: coords[0].longitude});
        } else {
            Alert.alert('Location was not found!');
        
        }
    }

    return (
        <SafeAreaView style= {styles.container}>
            <TextInput value={place} onChangeText={setPlace} style={styles.input} placeholder="Enter place" />
            <Button title="Search" onPress={search} />
            <MapView
                style={styles.map}
                region={{
                    latitude: location.lat,
                    longitude: location.lon,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {place !== '' &&
                    <Marker
                    title={place}
                    coordinate={{ latitude: location.lat, longitude: location.lon }}
                    />
        }
            </MapView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      flex: 1,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
  });

export default MapScreen;