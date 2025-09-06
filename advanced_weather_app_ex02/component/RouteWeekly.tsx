import * as React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { styles } from '../styles/styles';

export default function RouteWeekly() {

    const weatherContext = useContext(WeatherContext);
    if (!weatherContext) {
        throw new Error("WeatherContext not found");
    }
    const { data } = weatherContext;

    return (
        <View style={styles.tabBackground}>
            <View>
                {data?.error ? (
                    <Text style={styles.errorText}>{data.error}</Text>
                ) : (
                    <View >
                        <Text style={styles.weeklyLocationInfoText}>{data?.location?.city ?? ''}</Text>
                        <Text style={styles.weeklyLocationInfoText}>{data?.location?.region ?? ''}</Text>
                        <Text style={styles.weeklyLocationInfoText}>{data?.location?.country ?? ''}</Text>
                        <FlatList
                            data={data?.daily ?? []}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item, index }) => (
                                <View style={styles.weeklyRow}>
                                    <Text style={styles.weatherInfoText}>{item.date}</Text>
                                    <Text style={styles.weeklyWeatherInfoText}>{item.min}°C</Text>
                                    <Text style={styles.weeklyWeatherInfoText}>{item.max}°C</Text>
                                    <Text style={styles.weeklyWeatherInfoText}>{item.description} </Text>
                                </View>
                            )}
                        />
                    </View>
                )}
            </View>
        </View>
    );
}
