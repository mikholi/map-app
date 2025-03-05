import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';

const MapScreen = () => {
    const route = useRoute();
    const defaultLocation = { latitude: 65.0800, longitude: 25.4800 };
    const initialLocation = route.params?.location || defaultLocation;
    const [location, setLocation] = useState(initialLocation);
    const [place, setPlace] = useState('');
    const mapRef = useRef(null);

    useEffect(() => {
        if (route.params?.location) {
            setLocation(route.params.location);
        } else {
            getLocation();
        }
    }, [route.params?.location]);

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        }
    }, [location]);

    async function getLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }

        const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Lowest });
        setLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
    }

    async function search() {
        let coords = await Location.geocodeAsync(place);
        if (coords[0]) {
            setLocation({ latitude: coords[0].latitude, longitude: coords[0].longitude });
        } else {
            Alert.alert('Location was not found!');
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <TextInput value={place} onChangeText={setPlace} style={styles.input} placeholder="Enter place" />
            <TouchableOpacity onPress={search} style={styles.button}>
                <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
            <MapView
                ref={mapRef}
                style={styles.map}
                region={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    title={place || 'Selected Location'}
                    coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                />
            </MapView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    map: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#fff',
    },
    input: {
        backgroundColor: 'white',
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 2,
    },
    button: {
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 30,
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
    },
});

export default MapScreen;