import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, } from 'react-native';
import { WeatherIcon } from './WeatherIcon';
import { colors, todayColors, styles } from '../styles/styles';
import { Icon } from 'react-native-elements';

// a decaler dans Weathercontext.tsx
interface HourlyData {
    time: string;
    temperature: number;
    weatherCode: number;
    description: string;
    wind: number;
}

interface WeatherComponentProps {
    hourly: HourlyData[];
}

const { width } = Dimensions.get('window');
const ITEM_WIDTH = 120;

const WeatherComponent: React.FC<WeatherComponentProps> = ({ hourly }) => {
    const formatTime = (timeString: string) => {
        try {
            const date = new Date(timeString);
            return date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
        } catch {
            return timeString;
        }
    };

    const renderHourlyItem = ({ item }: { item: typeof hourly[0] }) => (
        <View style={[styles.hourlyItem, { width: ITEM_WIDTH }]}>
            <Text style={styles.timeText}>{item.time}</Text>
            <WeatherIcon code={item.weatherCode} />
            <Text style={styles.temperatureText}>{Math.round(item.temperature)}°</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name={'air'} color={todayColors.todayWindIcon} size={20} style={{ marginBottom: 6 }} />
                <Text style={styles.windText}>{Math.round(item.wind)} km/h</Text>
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
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                snapToInterval={ITEM_WIDTH + 10}
                decelerationRate="fast"
            />
        </View>
    );
};


export default WeatherComponent;