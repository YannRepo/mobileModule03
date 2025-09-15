import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, } from 'react-native';
import { WeatherIcon } from './WeatherIcon';
import { colors, todayColors, styles } from '../styles/styles';
import { FontAwesome5 } from '@expo/vector-icons';

// a decaler dans Weathercontext.tsx
interface HourlyData {
    time: string;
    temperature: number;
    weatherCode: number;
    description: string;
    wind: number;
}

interface FlatListTodayProps {
    hourly: HourlyData[];
}

const { width } = Dimensions.get('window');
const ITEM_WIDTH = 120;

const FlatListToday: React.FC<FlatListTodayProps> = ({ hourly }) => {
    
    const renderHourlyItem = ({ item }: { item: typeof hourly[0] }) => (
        <View style={[styles.hourlyItem, { width: ITEM_WIDTH }]}>
            <Text style={styles.hourlyTimeText}>{item.time}</Text>
            <WeatherIcon code={item.weatherCode} />
            <Text style={styles.hourlyTemperatureText}>{Math.round(item.temperature)}°</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FontAwesome5 name={'wind'} color={todayColors.todayWindIcon} size={15} style={{ marginBottom: 6 }}/>
                <Text style={styles.hourlyWindText}> {Math.round(item.wind)} km/h</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.flatListContainer}>
            <FlatList
                data={hourly}
                renderItem={renderHourlyItem}
                keyExtractor={(item, index) => `${item.time}-${index}`}
                horizontal
                showsHorizontalScrollIndicator={true}
                contentContainerStyle={styles.hourlyList}
                ItemSeparatorComponent={() => <View style={styles.hourlySeparator} />}
                snapToInterval={ITEM_WIDTH + 10}
                decelerationRate="fast"
            />
        </View>
    );
};


export default FlatListToday;