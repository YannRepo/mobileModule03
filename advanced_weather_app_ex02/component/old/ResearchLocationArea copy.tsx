import { Text, View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { UserContext } from "./UserContext";

import { Icon } from 'react-native-elements';
import * as Location from 'expo-location';

import MySearchBar from './MySearchBar';
import LocationButton from './LocationButton';

import { locationData } from '../types'; 


export default function ResearchLocationArea() {

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', ...styles.searchContainer }}>
      <View style={{ flex: 1 }}>
      <MySearchBar />
      </View>
      <View style={{ marginLeft: 8 }}>
        <LocationButton />
      </View>
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
});
