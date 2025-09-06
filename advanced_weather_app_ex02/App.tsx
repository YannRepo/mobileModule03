import * as React from 'react';
import { View,Text } from 'react-native';
import { useState, useContext, createContext } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import ResearchLocationArea from './component/ResearchLocationArea';
import MySearchBar from './component/MySearchBar';
import MyTabView from './component/MyTabView';

import { WeatherProvider } from './context/WeatherContext';

import { locationData } from './types'; 

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
    
      <View style={{ flex: 1, flexDirection: 'column', paddingTop: insets.top, paddingBottom: insets.bottom }}>
        <StatusBar style='auto' />
        <ResearchLocationArea />
        <MyTabView />
      </View>
  );
}

