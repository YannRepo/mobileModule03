import { useEffect, useContext } from 'react';

import { Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { styles } from '../styles/styles';

import { WeatherContext } from '../context/WeatherContext';


export default function LocationButton() {

    // Juste au demarrage
    useEffect(() => {
        handleGeolocation();
    }, []);

    const weatherContext = useContext(WeatherContext);

    if (!weatherContext) {
        throw new Error("WeatherContext not found");
    }

    const { data, setData, fetchLocationAndWeather } = weatherContext;

    const handleGeolocation = async () => {
        setData((prevData: any) => ({
                ...prevData,
                error: 'Loading',
            }));
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log("[LocationButton] Error: 'Permission to access location is denied.");
            setData((prevData: any) => ({
                ...prevData,
                error: 'Permission to access location is denied, please enable it in your App settings.',
            }));
            return;
        }
        let loc = await Location.getCurrentPositionAsync({});
        fetchLocationAndWeather(loc.coords.latitude, loc.coords.longitude);
    };


    return (
        // <Icon
        //     name='near-me'
        //     size={38}
        //     color={styles.icon.color}
        //     onPress={() => { handleGeolocation(); }}
        // />
        <Ionicons name="location-sharp" size={38} color={styles.icon.color} onPress={() => { handleGeolocation(); }} />
    );
};
