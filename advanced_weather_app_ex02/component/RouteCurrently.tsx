import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { styles } from '../styles/styles';


export default function RouteCurrently() {
    const weatherContext = useContext(WeatherContext);
    if (!weatherContext) {
        throw new Error("WeatherContext not found");
    }
    const { data } = weatherContext;

    return (
        <View style={styles.CurrentlyTabBackground}>

            {data?.error ? (
                <Text style={styles.errorText}>{data.error}</Text>

            ) : (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.locationCityInfoText}>{data?.location?.city ?? ''}</Text>
                    <Text style={styles.locationRegionInfoText}>{data?.location?.region ?? ''}</Text>
                    <Text style={styles.locationCountryInfoText}>{data?.location?.country ?? ''}</Text>
                    <Text style={styles.weatherTemperatureInfoText}>{data?.current?.temperature ?? ''} °C</Text>
                    <Text style={styles.weatherDescriptionInfoText}>{data?.current?.description ?? ''}</Text>
                    <Text style={styles.weatherWindInfoText}>{data?.current?.wind ?? ''} km/h</Text>
                </View>
            )}

        </View>
    );
}
