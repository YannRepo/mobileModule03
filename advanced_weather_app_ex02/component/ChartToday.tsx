import React, { useState } from 'react';
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

interface HourlyTemperatureChartProps {
    hourly: HourlyData[];
}

const HourlyTemperatureChart: React.FC<HourlyTemperatureChartProps> = ({ hourly }) => {
    const screenWidth = Dimensions.get('window').width;
    const [chartHeight, setChartHeight] = useState(0);

    // Extract temperatures and calculate min/max with padding
    const temperatures = hourly.map(item => item.temperature);

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
        <View style={styles.chartContainer} onLayout={(event) => {
                const { height } = event.nativeEvent.layout;
                setChartHeight(height);
            }}>

            <Text style={styles.chartTitle}>Today temperatures</Text>
            <LineChart
                data={chartData}
                width={screenWidth - 32} // Account for padding
                height={chartHeight ? chartHeight : ScreenHeight * 0.32} // 40% of screen height
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

export default HourlyTemperatureChart;
