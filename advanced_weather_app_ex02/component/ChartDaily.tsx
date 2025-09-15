import React, { useState } from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { colors, weeklyColors, styles } from '../styles/styles';
import { ScreenHeight } from 'react-native-elements/dist/helpers';


interface DailyData {
    date: string;
    min: number;
    max: number;
    weatherCode: number;
    description: string;
}

interface DailyTemperatureChartProps {
    daily: DailyData[];
}

const DailyTemperatureChart: React.FC<DailyTemperatureChartProps> = ({ daily }) => {
    const screenWidth = Dimensions.get('window').width;
    const [chartHeight, setChartHeight] = useState(0);
    const [legendHeight, setLegendHeight] = useState(0);

    // Extract temperatures and calculate min/max with padding
    const min = daily.map(item => item.min);
    const max = daily.map(item => item.max);
    // Prepare data for the chart
    const chartData = {
        labels: daily.map(item => {
            const date = item.date;
            return `${date}`;
        }),
        datasets: [
            {
                data: min,
                color: (opacity = 1) => weeklyColors.weeklyChartLineMin, // Green color
                strokeWidth: 1,
            },
            {
                data: max,
                color: (opacity = 1) => weeklyColors.weeklyChartLineMax, // Orange color
                strokeWidth: 1,
            },
        ],
    };

    const ChartLegend = () => (
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 8 }}>
                <View style={{ width: 16, height: 4, backgroundColor: weeklyColors.weeklyChartLineMin, marginRight: 6, borderRadius: 2 }} />
                <Text style={{ fontSize: 14, color: '#333' }}>Min temperature</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 8 }}>
                <View style={{ width: 16, height: 4, backgroundColor: weeklyColors.weeklyChartLineMax, marginRight: 6, borderRadius: 2 }} />
                <Text style={{ fontSize: 14, color: '#333' }}>Max temperature</Text>
            </View>
        </View>
    );

    const chartConfig = {
        backgroundColor: weeklyColors.weeklyChartBackground,
        backgroundGradientFrom: weeklyColors.weeklyChartBackground, // Light orange background
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: weeklyColors.weeklyChartBackground,
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
            fill: weeklyColors.weeklyChartDot,
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
            <Text style={styles.chartTitle}>Weekly temperatures</Text>
            <LineChart
                data={chartData}
                width={screenWidth - 32} // Account for padding
                height={chartHeight ? chartHeight - legendHeight : ScreenHeight * 0.32} // Subtract legend height (~40px)
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
            <View onLayout={(event) => {
                const { height } = event.nativeEvent.layout;
                setLegendHeight(2 * height);
            }}>
                <ChartLegend />
            </View>
        </View>
    );
};

export default DailyTemperatureChart;
