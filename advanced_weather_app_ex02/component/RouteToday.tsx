import * as React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { styles } from '../styles/styles';
import TemperatureChart from './ChartToday';
import WeatherComponent from './FlatListToday';

export default function RouteToday() {

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
                        <Text style={styles.todayLocationCityInfoText}>{data?.location?.city ?? ''}</Text>
                        <Text style={styles.todayLocationRegionInfoText}>{data?.location?.region ?? ''}</Text>
                        <Text style={styles.todayLocationCountryInfoText}>{data?.location?.country ?? ''}</Text>
                        <TemperatureChart hourly={data?.hourly ?? []} />
                         {/* <FlatList
                            data={data?.hourly ?? []}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item, index }) => (
                                <View style={styles.row}>
                                    <Text style={styles.weatherInfoText}>{item.time}</Text>
                                    <Text style={styles.weatherInfoText}>{item.temperature}°C</Text>
                                    <Text style={styles.weatherInfoText}>{item.description}</Text>
                                    <Text style={styles.weatherInfoText}>{item.wind} km/h</Text>
                                </View>
                                // <View style={{ marginVertical: 4 }}>
                                //     <Text style={styles.weatherInfoText}>
                                //         {` ${item.time ?? ''} ${item.temperature ?? ''}°C ${item.wind ?? ''}km/h`}
                                //     </Text>
                                // </View>
                            )}
                        /> */}
                        <WeatherComponent hourly={data?.hourly ?? []} />
                    </View>
                )}
            </View>
        </View>
    );
}
