import { TextInput, View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useState, useEffect } from 'react';

import { Icon } from 'react-native-elements';
import * as Location from 'expo-location';

import { locationData } from '../types'; 

export default function LocationButton({
    setSearchQuery,
    setLocation,
}: {
    setSearchQuery: (query: string) => void;
    setLocation: (location: locationData) => void;
}) {

    // Juste au demarrage
    useEffect(() => {
        handleGeolocation();
    }, []);

    const handleGeolocation = () => {
        getGPSPosition();
    };

    const getGPSPosition = async () => {

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setLocation({
                city: 'errorLocation',
                region: 'errorLocation',
                country: 'errorLocation',
                latitude: 0,
                longitude: 0,
            });
            return;
        }
        let loc = await Location.getCurrentPositionAsync({}); // Etape lente sur expo telephone
        const coordsString = `${loc.coords.latitude},${loc.coords.longitude}`;
        //setPosition(coordsString); // coords contains latitude, longitude, altitude, etc.
        let city = await getLocationFromCoord(loc.coords);
        setLocation({
            city: city.city,
            region: city.region,
            country: city.country,
            latitude: city.latitude,
            longitude: city.longitude,
        });
        console.log("Location set too:", city);
    };

    const getLocationFromCoord = async (
        coords: Location.LocationObjectCoords
    ): Promise<locationData> => {
        try {
            const results = await Location.reverseGeocodeAsync({
                latitude: coords.latitude,
                longitude: coords.longitude,

            });

            if (results.length > 0) {
                const place = results[0];
                return {
                    city: place.city ?? place.subregion ?? 'errorLocation',
                    region: place.region ?? 'errorLocation',
                    country: place.country ?? 'errorLocation',
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                };
            }
            return {
                city: 'errorLocation',
                region: 'errorLocation',
                country: 'errorLocation',
                latitude: 0,
                longitude: 0,
            };
        } catch (error) {
            console.error("Error while reverse geocoding:", error);
            return {
                city: 'errorLocation',
                region: 'errorLocation',
                country: 'errorLocation',
                latitude: 0,
                longitude: 0,
            };
        }
    };

    return (
        <Icon
            name='near-me'
            size={32}
            onPress={() => {
                handleGeolocation();
            }}
        />
    );
};
