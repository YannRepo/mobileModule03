import * as React from 'react';
import { View, Text } from 'react-native';
import { useState, useContext, createContext, ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { fetchWeatherApi } from 'openmeteo';


export interface WeatherData {
    location: { city: string; region: string; country: string };
    current: { temperature: number; description: string; wind: number };
    hourly: Array<{ time: string; temperature: number; description: string; wind: number }>;
    daily: Array<{ date: string; min: number; max: number; description: string }>;
    error: string | null;
}

export const WeatherContext = createContext<{
    data: WeatherData;
    setData: React.Dispatch<React.SetStateAction<WeatherData>>;
    fetchWeather: (lat: number, lon: number, city: string, region: string, country: string) => Promise<void>;
    fetchLocationAndWeather: (lat: number, lon: number) => Promise<void>;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
} | undefined>(undefined);


export const WeatherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [data, setData] = useState<WeatherData>({
        location: { city: '', region: '', country: '' },
        current: { temperature: 0, description: '', wind: 0 },
        hourly: [],
        daily: [],
        error: null,
    });

    const setError = (error: string | null) => {
        setData({
            location: { city: '', region: '', country: '' },
            current: { temperature: '0', description: '', wind: 0 },
            hourly: [],
            daily: [],
            error: error
        });
    };


    const getLocation = async (lat: number, lon: number) => {
        try {
            const APIGeocodeAnswer = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}`);
            const cityData = await APIGeocodeAnswer.json();
            if (cityData.city) {

                return {
                    city: cityData.city || cityData.locality || 'Unknown',
                    region: cityData.principalSubdivision || 'Unknown',
                    country: cityData.countryName || 'Unknown'
                };
            }
            else {
                setError('City not found');
                return { city: '', region: '', country: '' };
            }
        } catch (e: any) {
            setError(e.message);
            return { city: '', region: '', country: '' };
        }
    };

    const getMeteoDescription = (code: number) => {
        const tableCodes: Record<number, string> = {
            0: 'Clear', 1: 'Mostly Clear', 2: 'Partly Cloudy', 3: 'Overcast',
            45: 'Fog', 51: 'Light Drizzle', 53: 'Drizzle', 55: 'Heavy Drizzle',
            61: 'Light Rain', 63: 'Rain', 65: 'Heavy Rain', 71: 'Light Snow',
            73: 'Snow', 75: 'Heavy Snow', 80: 'Showers', 81: 'Moderate Showers',
            82: 'Heavy Showers', 95: 'Thunderstorm'
        };
        return tableCodes[code] || 'Unknown';
    };
    // faire fetchWeather avec ville et l'appeler dans celui avec lat / lon


    const fetchLocationAndWeather = async (lat: number, lon: number) => {
        console.log("[WeatherContext] fetchLocationAndWeather:", lat, lon);
        const { city, region, country } = await getLocation(lat, lon);
        if (city === '' || city === 'Unknown') {

            return;
        }
        fetchWeather(lat, lon, city, region, country);
    }

    const fetchWeather = async (lat: number, lon: number, city: string, region: string, country: string) => {
        try {
            const responses = await fetchWeatherApi("https://api.open-meteo.com/v1/forecast", {
                latitude: lat,
                longitude: lon,
                current: ['temperature_2m', 'weather_code', 'wind_speed_10m'],
                hourly: ['temperature_2m', 'weather_code', 'wind_speed_10m'],
                daily: ['temperature_2m_max', 'temperature_2m_min', 'weather_code'],
                timezone: 'auto',
                forecast_days: 7
            });

            const location = { city, region, country };

            const response = responses[0];
            const offset = response.utcOffsetSeconds(); // UTC offset in seconds between GMT and local time (ms)

            // Current
            const curr = response.current()!;
            const current = {
                temperature: Math.round(curr.variables(0)!.value()),
                description: getMeteoDescription(curr.variables(1)!.value()),
                wind: Math.round(curr.variables(2)!.value())
            };

            // Hourly (24h)
            const h = response.hourly()!; // response contains all hours for more than 1 day, we take only the first 24 hours
            const hourly = Array.from({ length: 24 }, (_, i) => ({
                time: new Date((Number(h.time()) + i * h.interval() + offset) * 1000).toISOString().slice(11, 16),  //h.time : from 00:00 to 23:00 of the concern city given in GMT (starts at 7am for San Francisco for example)
                temperature: Math.round(h.variables(0)!.valuesArray()![i]),
                description: getMeteoDescription(h.variables(1)!.valuesArray()![i]),
                wind: Math.round(h.variables(2)!.valuesArray()![i])
            }));


            // Daily
            const d = response.daily()!;
            const dailyCount = (Number(d.timeEnd()) - Number(d.time())) / d.interval();
            const daily = Array.from({ length: dailyCount }, (_, i) => ({
                date: new Date((Number(d.time()) + i * d.interval() + offset) * 1000).toISOString().slice(0, 10),
                max: Math.round(d.variables(0)!.valuesArray()![i]),
                min: Math.round(d.variables(1)!.valuesArray()![i]),
                description: getMeteoDescription(d.variables(2)!.valuesArray()![i])
            }));

            const newData = { location, current, hourly, daily, error: null };

            setData(newData);

        } catch (e: any) {
            setError(e.message);
        }
    };



    return (
        <WeatherContext.Provider value={{ data, setData, fetchWeather, fetchLocationAndWeather, setError }}>
            {children}
        </WeatherContext.Provider>
    );
};