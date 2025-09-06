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
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.CurrentlyWeatherInfoText}>{data?.location?.city ?? ''}</Text>
                        <Text style={styles.CurrentlyWeatherInfoText}>{data?.location?.region ?? ''}</Text>
                        <Text style={styles.CurrentlyWeatherInfoText}>{data?.location?.country ?? ''}</Text>
                        <Text style={styles.CurrentlyWeatherInfoText}>{data?.current?.temperature ?? ''} °C</Text>
                        <Text style={styles.CurrentlyWeatherInfoText}>{data?.current?.description ?? ''}</Text>
                        <Text style={styles.CurrentlyWeatherInfoText}>{data?.current?.wind ?? ''} km/h</Text>
                    </View>
                )}

        </View>
    );
}
