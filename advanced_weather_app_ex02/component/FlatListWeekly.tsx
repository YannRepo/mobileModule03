import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, } from 'react-native';
import { WeatherIcon } from './WeatherIcon';
import { colors, todayColors, styles } from '../styles/styles';
import { Icon } from 'react-native-elements';

// a decaler dans Weathercontext.tsx
interface DailyData {
    date: string;
    min: number;
    max: number;
    weatherCode: number;
    description: string;
}

interface FlatListWeeklyProps {
    daily: DailyData[];
}

const { width } = Dimensions.get('window');
const ITEM_WIDTH = 120;

const FlatListWeekly: React.FC<FlatListWeeklyProps> = ({ daily }) => {

    const renderDailyItem = ({ item }: { item: typeof daily[0] }) => (
        <View style={[styles.dailyItem, { width: ITEM_WIDTH }]}>
            <Text style={styles.dailyDateText}>{item.date}</Text>
            <WeatherIcon code={item.weatherCode} />
            <View>
                <Text style={styles.dailyMaxText}>{Math.round(item.max)}°C max</Text>
                <Text style={styles.dailyMinText}>{Math.round(item.min)}°C min</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.flatListContainer}>
            <FlatList
                data={daily}
                renderItem={renderDailyItem}
                keyExtractor={(item, index) => `${item.date}-${index}`}
                horizontal
                showsHorizontalScrollIndicator={true}
                contentContainerStyle={styles.hourlyList}
                ItemSeparatorComponent={() => <View style={styles.dailySeparator} />}
                snapToInterval={ITEM_WIDTH + 10}
                decelerationRate="fast"
            />
        </View>
    );
};


export default FlatListWeekly;