import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useState, useContext, useCallback } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { styles } from '../styles/styles';
import { Ionicons } from '@expo/vector-icons';

import debounce from "lodash.debounce";

export default function MySearchBar() {

  const weatherContext = useContext(WeatherContext);
  if (!weatherContext) {
    throw new Error("WeatherContext not found");
  }
  const { fetchWeather, setError } = weatherContext;

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
    console.log("[MySearchBar] fetchCity:", cityName);
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=5&language=en&format=json`
      );
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const location = data.results[0];
        fetchWeather(location.latitude, location.longitude, location.name, location.admin1, location.country);

      }
      else {
        setError("City not found")
      }
    } catch (e: any) {
      setError(e.message);
      return null;
    }
  };

  const fetchCities = async (text: string) => {
    console.log("[MySearchBar] fetchCities:", text);
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(text)}&count=5&language=en&format=json`
      );
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setResults(data.results || []);
      }
      else {
        setResults([]);
      }

    } catch (e) {
      setResults([]);
      console.log("Error fetching cities list:", e);
    }
  };

  const debouncedFetch = useCallback(debounce(fetchCities, 400), []);

  const handleChange = (text: string) => {
    console.log("[MySearchBar] handleChange:", text);
    setSearchText(text);
    debouncedFetch(text);
  };

  const handleSubmitEditing = async () => {
    console.log("[MySearchBar] handleSubmitEditing:", searchText);
    setSearchText("");
    setResults([]);
    debouncedFetch.cancel();
    await fetchCity(searchText);

  };

  const handleListSelection = (item: CityResult) => {
    console.log("[MySearchBar] handleListSelection:", item);
    setSearchText("");
    fetchWeather(item.latitude, item.longitude, item.name, item.admin1, item.country);
    setResults([]);
  };

  return (
    <View >
      <Searchbar
        placeholder="Search location..."
        value={searchText}
        onChangeText={handleChange}
        onSubmitEditing={handleSubmitEditing}
        inputStyle={styles.searchInput}
        style={styles.searchInput} // Change color here
        iconColor={styles.iconColor.color}
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
            maxHeight: 230,
          }}
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => { handleListSelection(item) }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name={'chevron-forward-sharp'}  />
                <Text style={{ fontWeight: 'bold' }}> {item.name}</Text>
                <Text>, {item.admin1}, {item.country}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

    </View>

  );
};
