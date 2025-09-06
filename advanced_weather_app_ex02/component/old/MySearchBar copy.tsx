import { TextInput, View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useState, useEffect, useCallback } from 'react';

import { Icon } from 'react-native-elements';
import debounce from "lodash.debounce";
import * as Location from 'expo-location';
import LocationButton from './LocationButton';

import { locationData } from '../types';


export default function MySearchBar({
  setSearchQuery,
  setLocation,
}: {
  setSearchQuery: (query: string) => void;
  setLocation: (location: locationData) => void;
}) {

  type CityResult = {
    id: number;
    name: string;
    country: string;
    admin1: string;
    latitude: number;
    longitude: number;
  };

  const [results, setResults] = useState<CityResult[]>([]);
  const [searchText, setSearchText] = useState("");

  const fetchCity = async (cityName: string) => {
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=5&language=en&format=json`
      );
      const data = await res.json();
      //console.log("fetchCity data:", data);
      //console.log("fetchCity data.results[0]:", data.results[0]);
      if (data.results && data.results.length > 0) {
        const city = data.results[0];
        //console.log("fetchCity city:", city.latitude);
        const location = {
          city: city.name,
          region: city.admin1,
          country: city.country,
          latitude: city.latitude,
          longitude: city.longitude,
        };
        return (location);
      }
    } catch (e) {
      //console.error(e);
      return null;
    }
  };

  const fetchCities = async (text: string) => {
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(text)}&count=5&language=en&format=json`
      );
      const data = await res.json();
      setResults(data.results || []);
    } catch (e) {
      console.error(e);
    }
  };

  const debouncedFetch = useCallback(debounce(fetchCities, 400), []);

  const handleChange = (text: string) => {
    setSearchText(text);
    debouncedFetch(text);
  };

  const handleSubmitEditing = async () => {
    console.log("Submitting");
    setResults([]);
    const location = await fetchCity(searchText);
    console.log("location", location);

    if (location) {
      setLocation(location);
    }
  };

  return (
    <View >
      <Searchbar
        placeholder="Search location..."
        value={searchText}
        onChangeText={handleChange}
        onSubmitEditing={handleSubmitEditing}
      />

      {results.length > 0 && (
        <FlatList
          style={{
            position: "absolute",
            top: 50,
            left: 10,
            right: 10,
            backgroundColor: "white",
            zIndex: 1000,
            maxHeight: 200,
          }}
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                setSearchText(item.name);
                //setPosition(item.name);
                setLocation({
                  city: item.name,
                  region: item.admin1,
                  country: item.country,
                  latitude: item.latitude,
                  longitude: item.longitude,
                });
                setResults([]);

              }}
            >
              <Text>{item.name}, {item.admin1}, {item.country}</Text>
            </TouchableOpacity>
          )}
        />
      )}

    </View>

  );
};

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: '#5B5D72',
    padding: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
