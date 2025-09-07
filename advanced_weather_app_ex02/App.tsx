import * as React from 'react';
import { View, ImageBackground } from 'react-native';
import { useState, useContext, createContext } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import ResearchLocationArea from './component/ResearchLocationArea';
import MySearchBar from './component/MySearchBar';
import MyTabView from './component/MyTabView';

import { WeatherProvider } from './context/WeatherContext';

import { locationData } from './types';
import { colors, styles } from './styles/styles';

export default function App() {
  return (
    <WeatherProvider>
      <SafeAreaProvider>
        <TabViewExample />
      </SafeAreaProvider>
    </WeatherProvider>
  );
}


export function TabViewExample() {
  const insets = useSafeAreaInsets();
  const [location, setLocation] = useState<locationData | null>(null);

  const [position, setPosition] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [GPSlocation, setGPSLocation] = useState(null);




  return (
    <View style={[styles.mainContainer, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <ImageBackground
        source={require('./assets/cloud.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <StatusBar style='light' />
        <ResearchLocationArea />
        <MyTabView />
      </ImageBackground>
    </View>
  );
}

