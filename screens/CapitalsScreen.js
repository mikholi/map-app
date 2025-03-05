import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const CapitalsScreen = () => {
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredCountries, setFilteredCountries] = useState([]);

    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = async () => {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const data = await response.json();
            setCountries(data);
            setFilteredCountries(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = (text) => {
        setSearch(text);
        if (text) {
            const filtered = countries.filter((country) => {
                const countryName = country.name.common.toLowerCase();
                const capitalName = country.capital ? country.capital[0].toLowerCase() : '';
                return countryName.includes(text.toLowerCase()) || capitalName.includes(text.toLowerCase());
            });
            setFilteredCountries(filtered);
        } else {
            setFilteredCountries(countries);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{item.name.common}</Text>
            <Text>Capital: {item.capital ? item.capital[0] : 'N/A'}</Text>
            <Text>Flag: {item.flag}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search for a country or capital"
                value={search}
                onChangeText={handleSearch}
            />
            <FlatList
                data={filteredCountries}
                keyExtractor={(item) => item.cca3}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
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
    item: {
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
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CapitalsScreen;