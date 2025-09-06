import * as React from 'react';
import { View, useWindowDimensions, Text, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import { Icon } from 'react-native-elements';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

import { locationData } from '../types';
import { useEffect, useState } from 'react';



// ajouter gestion 'Geolocation is not available, please enable it in your App settings'
export default function TodayRoute({ location }: { location: locationData }) {

  const [weather, setWeather] = useState<WeatherData | null>(null);


    useEffect(() => {
        //if (!position || !position.latitude || !position.longitude) {
        //  setWeather(null);
        //  setError('Geolocation is not available, please enable it in your App settings');
        //  return;
        //}

        //setError(null);

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`;

        // a reecrire avec du await
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.current_weather) {
                    console.log("Current weather data:", data.current_weather);
                    //temperature: data.current_weather.temperature,
                    //weathercode: data.current_weather.weathercode,
                    //time: data.current_weather.time,
                    // } else {
                    //     setError('No weather data available');
                    // }
                    setWeather({
                        temperature: data.current_weather.temperature,
                        windspeed: data.current_weather.windspeed,
                        weathercode: data.current_weather.weathercode,
                    });
                }
            });

    }, [location]);



    return (
        <View style={styles.tabBackground}>
            <View >
                <Text style={styles.tabText}>Currently</Text>
                <Text style={styles.tabText}>{location?.city ?? 'Unknown'}</Text>
                <Text style={styles.tabText}>{location?.region ?? 'Unknown'}</Text>
                <Text style={styles.tabText}>{location?.country ?? 'Unknown'}</Text>
                <Text style={styles.tabText}>{location?.city ?? 'Unknown'}</Text>

            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    tabText: {
        color: '#000000ff',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tabBackground: {
        flex: 1,
        backgroundColor: '#ffffffff',
        justifyContent: 'center',
        alignItems: 'center'
    },
});