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
import { styles, colors } from '../styles/styles';


import { WeatherContext } from '../context/WeatherContext';

const routes = [
    { key: 'currently', title: 'Currently' },
    { key: 'today', title: 'Today' },
    { key: 'weekly', title: 'Weekly' },
];

export default function MyTabView() {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white' }}
            style={styles.tabBar}
        />
    );

    const getColor = (focused: boolean) => ({
        color: focused ? styles.tabIconFocuses.color : styles.tabIconNotFocuses.color,
    });


    return (
        <View style={{ flex: 1 }}>
            <TabView
            style={{ flex: 1 }}
                navigationState={{ index, routes }}
                renderScene={({ route }) => {
                    switch (route.key) {
                        case 'currently':
                            return <RouteCurrently />;
                        case 'today':
                            return <RouteToday />;
                        case 'weekly':
                            return <RouteWeekly />;
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
