import * as React from 'react';
import { View, useWindowDimensions, Text, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useState, useContext, createContext, ReactNode } from 'react';

import { Icon } from 'react-native-elements';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

import { locationData } from '../types';
import RouteCurrently from './RouteCurrently';
import RouteToday from './RouteToday';
import RouteWeekly from './RouteWeekly';

import { WeatherContext } from '../context/WeatherContext';

const WeeklyRoute = ({ position }: { position: string }) => (
    <View style={styles.tabBackground}>
        
        {position === 'errorLocation' ? (
            <Text style={[styles.tabText, { color: 'red' }]}>
                Geolocation is not available, please enable it in your App settings
            </Text>
        ) : (
            <View >
                <Text style={styles.tabText}>Weekly</Text>
                <Text style={styles.tabText}>{position}</Text>
            </View>
        )}
    </View>
);



const routes = [
    { key: 'currently', title: 'Currently' },
    { key: 'today', title: 'Today' },
    { key: 'weekly', title: 'Weekly' },
];

export default function MyTabView() {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const { data, setData, fetchWeather } = useContext(WeatherContext);

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white' }}
            style={{ backgroundColor: '#FFFBFF' }}
        />
    );

    const getColor = (focused: boolean) => ({
        color: focused ? '#5B5D72' : '#aeaeb7ff',
    });


    return (
        <View style={{ flex: 1 }}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={({ route }) => {
                    switch (route.key) {
                        case 'currently':
                            return <RouteCurrently />;
                        case 'today':
                            return <RouteToday />;
                        case 'weekly':
                            return <RouteWeekly />;
                            return <Text>a faire</Text>;
                        default:
                            return null;
                    }
                }}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                tabBarPosition="bottom"
                renderTabBar={renderTabBar}
                options={{
                    currently: {
                        label: ({ route, labelText, focused, color }) => (
                            <Text style={{ ...getColor(focused), margin: 8 }}>{labelText}</Text>
                        ),
                        icon: ({ route, focused, color }) => (
                            <Icon name={focused ? 'settings' : 'settings'} {...getColor(focused)} />
                        ),
                    },
                    today: {
                        label: ({ route, labelText, focused, color }) => (
                            <Text style={{ ...getColor(focused), margin: 8 }}>{labelText}</Text>
                        ),
                        icon: ({ route, focused, color }) => (
                            <Icon name={focused ? 'event' : 'event'} {...getColor(focused)} />
                        ),
                    },
                    weekly: {
                        label: ({ route, labelText, focused, color }) => (
                            <Text style={{ ...getColor(focused), margin: 8 }}>{labelText}</Text>
                        ),
                        icon: ({ route, focused, color }) => (
                            <Icon name={focused ? 'calendar-month' : 'calendar-month'} {...getColor(focused)} />
                        ),
                    },
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#5B5D72',
    },
    searchContainer: {
        backgroundColor: '#5B5D72',
        padding: 10,
    },
    searchInput: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
    },
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