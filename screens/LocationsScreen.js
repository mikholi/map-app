import React from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView, Pressable, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firestore} from '../firebase/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../firebase/Config';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { PaperProvider } from 'react-native-paper';
import { useFireTodos } from '../firebase/FireStoreController';
import Entypo from 'react-native-vector-icons/Entypo';
import StarRating from 'react-native-star-rating-widget';


const LocationsScreen = () => {
  const navigation = useNavigation();
  const todos = useFireTodos();

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
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TodoItem todoItem={item} />}
        contentContainerStyle={styles.list}
        />
      </SafeAreaView>
      </PaperProvider>
  )
};

const TodoItem = ({ todoItem }) => {
  const navigation = useNavigation();

  const goToMap = () => {
    if (todoItem.location) {
      navigation.navigate('Map', { location: todoItem.location });
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text styles={styles.title}>{todoItem.todoText}</Text>
        {todoItem.location ? (
          <Pressable onPress={goToMap}>
            <Entypo name="location-pin" size={24} color="red" />
          </Pressable>
        ) : (
          <Entypo name="location-pin" size={24} color={"black"} />
        )}
      </View>
      <Text style={styles.review}>{todoItem.review}</Text>
      <StarRating rating={todoItem.stars} starSize={24} color="gold" />
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 16,
  },

  list: {
    paddingBottom: 16,
  },


  card: {
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

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  review: {
    marginBottom: 8,
  }
})

export default LocationsScreen;