import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { styles } from '../styles/styles';
import { FontAwesome5 } from '@expo/vector-icons';
import { WeatherIcon } from './WeatherIcon';


export default function RouteCurrently() {
    const weatherContext = useContext(WeatherContext);
    if (!weatherContext) {
        throw new Error("WeatherContext not found");
    }
    const { data } = weatherContext;

    return (
        <View style={styles.tabBackground}>

            {data?.error ? (
                <Text style={styles.errorText}>{data.error}</Text>

            ) : (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={styles.currentlyLocationCityInfoText}>{data?.location?.city ?? ''}</Text>
                        <Text style={styles.currentlyLocationRegionInfoText}>{data?.location?.region ?? ''}</Text>
                        <Text style={styles.currentlyLocationCountryInfoText}>{data?.location?.country ?? ''}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Text style={styles.currentlyWeatherTemperatureInfoText}>{data?.current?.temperature ?? ''} °C</Text>
                        <Text style={styles.currentlyWeatherDescriptionInfoText}>{data?.current?.description ?? ''}</Text>
                        <WeatherIcon code={data?.current?.weatherCode ?? 0} color={styles.currentlyWeatherIcon.color} size={styles.currentlyWeatherIcon.fontSize} />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome5 name={'wind'} color={styles.currentlyWeatherWindIcon.color} size={27} />
                            <Text style={styles.currentlyWeatherWindInfoText}>  {data?.current?.wind ?? ''} km/h</Text>
                        </View>
                    </View>
                </View>

            )}

        </View>
    );
}
