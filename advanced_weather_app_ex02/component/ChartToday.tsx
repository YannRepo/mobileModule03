import React from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { colors, todayColors, styles } from '../styles/styles';
import { ScreenHeight } from 'react-native-elements/dist/helpers';


interface HourlyData {
    time: string;
    temperature: number;
    description: string;
    wind: number;
}

interface TemperatureChartProps {
    hourly: HourlyData[];
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({ hourly }) => {
    const screenWidth = Dimensions.get('window').width;

    // Extract temperatures and calculate min/max with padding
    const temperatures = hourly.map(item => item.temperature);
    const minTemp = Math.min(...temperatures) - 5;
    const maxTemp = Math.max(...temperatures) + 5;

    // Prepare data for the chart
    const chartData = {
        // labels: hourly.map(item => {
        //   // Convert time string to hour format (e.g., "14:00" -> "14")
        //   const hour = item.time.split(':')[0];
        //   if (hour % 3 === 0) {
        //     return `${hour}`;
        //   }
        //   return ''; 
        // }),
        labels: hourly.map(item => {
            // Convert time string to hour format (e.g., "14:00" -> "14")
            const hour = item.time.split(':')[0];
            if (hour % 3 === 0) return `${hour}h`;
            return '';
        }),
        datasets: [
            {
                data: temperatures,
                color: (opacity = 1) => todayColors.todayChartLine, // Green color
                strokeWidth: 1,
            },
        ],
    };

    const chartConfig = {
        backgroundColor: todayColors.todayChartBackground,
        backgroundGradientFrom: todayColors.todayChartBackground, // Light orange background
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: todayColors.todayChartBackground,
        backgroundGradientToOpacity: 0,
        decimalPlaces: 0, // No decimal places for temperature
        color: () => '#ca3b69ff', // Orange
        labelColor: () => '#000000ff', // Black labels
        style: {
            borderRadius: 16,
        },
        propsForDots: {
            r: '3',
            strokeWidth: '2',
            fill: todayColors.todayChartDot,
        },
        propsForBackgroundLines: {
            strokeDasharray: '',
            stroke: 'rgba(0, 0, 0, 0.05)',
        },
    };

    return (
        <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Today temperatures</Text>
            <LineChart
                data={chartData}
                width={screenWidth - 32} // Account for padding
                height={ScreenHeight * 0.32} // 40% of screen height
                chartConfig={chartConfig}
                bezier // Smooth curve
                style={styles.chart}
                fromZero={false} // Allow chart to scale based on data range
                segments={5} // Number of horizontal grid lines
                withHorizontalLabels={true}
                withVerticalLabels={true}
                withDots={true}
                withShadow={false}
                withScrollableDot={false}
                withInnerLines={true}
                withOuterLines={true}
                yAxisInterval={1} // Show every y-axis label
                yAxisSuffix="°C"

            />
        </View>
    );
};

export default TemperatureChart;

// Usage example:
/*
const hourlyData = [
  { time: '00:00', temperature: 15, description: 'Clear', wind: 10 },
  { time: '01:00', temperature: 14, description: 'Clear', wind: 12 },
  { time: '02:00', temperature: 13, description: 'Partly cloudy', wind: 8 },
  // ... more data
];

<TemperatureChart hourly={hourlyData} />
*/