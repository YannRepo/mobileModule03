import React from 'react';
import { colors } from '../styles/styles';
import { Ionicons } from '@expo/vector-icons';




type WeatherIconProps = {
    code: number;
    size?: number;
    color?: string;
};
const iconMap: { [key: number]: { name: string; type: string } } = {
    0: { name: 'sunny-outline', type: 'ionicon' }, // Clear
    1: { name: 'sunny-outline', type: 'ionicon' }, // Mostly Clear
    2: { name: 'partly-sunny-outline', type: 'ionicon' }, // Partly Cloudy
    3: { name: 'cloud-outline', type: 'ionicon' }, // Overcast
    45: { name: 'cloudy-outline', type: 'ionicon' }, // Fog
    51: { name: 'rainy-outline', type: 'ionicon' }, // Light Drizzle
    53: { name: 'rainy-outline', type: 'ionicon' }, // Drizzle
    55: { name: 'rainy-outline', type: 'ionicon' }, // Heavy Drizzle
    61: { name: 'rainy-outline', type: 'ionicon' }, // Light Rain
    63: { name: 'rainy-outline', type: 'ionicon' }, // Rain
    65: { name: 'rainy-outline', type: 'ionicon' }, // Heavy Rain
    71: { name: 'snow-outline', type: 'ionicon' }, // Light Snow
    73: { name: 'snow-outline', type: 'ionicon' }, // Snow
    75: { name: 'snow-outline', type: 'ionicon' }, // Heavy Snow
    80: { name: 'rainy-outline', type: 'ionicon' }, // Showers
    81: { name: 'rainy-outline', type: 'ionicon' }, // Moderate Showers
    82: { name: 'rainy-outline', type: 'ionicon' }, // Heavy Showers
    95: { name: 'thunderstorm-outline', type: 'ionicon' }, // Thunderstorm
};

export const WeatherIcon: React.FC<WeatherIconProps> = ({
    code,
    size = 40,
    color = '',
}) => {
    const icon = iconMap[code] || iconMap[0];
    return (
        <Ionicons
            name={icon.name}
            size={size}
            color={color ? color : colors.third}
        />
    );
};