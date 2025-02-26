import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../firebase/Config';
import AntDesign from 'react-native-vector-icons/AntDesign';

const LocationsScreen = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    await auth.signOut();
    navigation.navigate('Login');
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout} style={{ marginRight: 20 }}>
          <AntDesign name="logout" size={24} color="black" />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity style={{ marginLeft: 20 }}>
          <AntDesign name="user" size={24} color="black" />
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  return (
    <View>
      <Text>Locations Screen</Text>
    </View>
  );
};

export default LocationsScreen;