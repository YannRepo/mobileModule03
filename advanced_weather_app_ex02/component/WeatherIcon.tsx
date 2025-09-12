import React from 'react';
import { Icon } from 'react-native-elements';
import { StyleProp, TextStyle } from 'react-native';
import { colors, todayChartColors, styles } from '../styles/styles';




type WeatherIconProps = {
    code: number;
    size?: number;
    color?: string;
};

const iconMap: { [key: number]: { name: string; type: string } } = {
    0: { name: 'weather-sunny', type: 'material-community' }, // Clear
    1: { name: 'weather-sunny', type: 'material-community' }, // Mostly Clear
    2: { name: 'weather-partly-cloudy', type: 'material-community' }, // Partly Cloudy
    3: { name: 'weather-cloudy', type: 'material-community' }, // Overcast
    45: { name: 'weather-fog', type: 'material-community' }, // Fog
    51: { name: 'weather-pouring', type: 'material-community' }, // Light Drizzle
    53: { name: 'weather-pouring', type: 'material-community' }, // Drizzle
    55: { name: 'weather-pouring', type: 'material-community' }, // Heavy Drizzle
    61: { name: 'weather-rainy', type: 'material-community' }, // Light Rain
    63: { name: 'weather-rainy', type: 'material-community' }, // Rain
    65: { name: 'weather-pouring', type: 'material-community' }, // Heavy Rain
    71: { name: 'weather-snowy', type: 'material-community' }, // Light Snow
    73: { name: 'weather-snowy', type: 'material-community' }, // Snow
    75: { name: 'weather-snowy-heavy', type: 'material-community' }, // Heavy Snow
    80: { name: 'weather-showers', type: 'material-community' }, // Showers
    81: { name: 'weather-showers', type: 'material-community' }, // Moderate Showers
    82: { name: 'weather-showers', type: 'material-community' }, // Heavy Showers
    95: { name: 'weather-lightning', type: 'material-community' }, // Thunderstorm
};

export const WeatherIcon: React.FC<WeatherIconProps> = ({
    code,
    size = 40,
    color = '',
}) => {
    const icon = iconMap[code] || iconMap[0];
    return (
        <Icon
            name={icon.name}
            type={icon.type}
            size={size}
            color={color ? color : colors.third}
        />
    );
};