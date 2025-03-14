import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Antdesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import AddLocationScreen from "../screens/AddLocationScreen";
import LocationsScreen from "../screens/LocationsScreen";
import MapScreen from "../screens/MapScreen";
import CapitalsScreen from "../screens/CapitalsScreen";
import LoginScreen from "../screens/LoginScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const LOCATIONS = 'Locations';
const ADDLOCATION = 'Add Location';
const MAP = 'Map';
const CAPITALS = 'Capitals';
const LOGIN = 'Login';

function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {},
                animation: 'fade',
            }}
        >
            <Tab.Screen
                name={LOCATIONS}
                component={LocationsScreen}
                options={{ tabBarIcon: () => <Entypo name="address" size={26} color="black" /> }}
            />
            <Tab.Screen
                name={ADDLOCATION}
                component={AddLocationScreen}
                options={{ tabBarIcon: () => <Antdesign name="plus" size={28} /> }}
            />
            <Tab.Screen
                name={MAP}
                component={MapScreen}
                options={{ tabBarIcon: () => <Entypo name="map" size={26} color="black" /> }}
            />
            <Tab.Screen
                name={CAPITALS}
                component={CapitalsScreen}
                options={{ tabBarIcon: () => <FontAwesome5 name="city" size={25} color="black" /> }}
            />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={LOGIN}>
                <Stack.Screen name={LOGIN} component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={BottomTabNavigator} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}