import { StyleSheet } from 'react-native';


// Color palette
export const colors = {
    primaryLight: '#9598aeff',
    primary: '#2E294E',
    primaryDark: '#1C1A2D',
    secondary: '#57caf4ff',
    secondaryLight: '#DCF4FD',
    secondaryDark: '#04354aff',
    third: '#F18E37',//#851035ff',
    thirdLight: '#fcecddff',
    thirdDark: '#94531aff',
    fourth: '#ca3b69ff',
    accent: '#F3E8EE',
    error: 'red',
    tabBackground: '#ffffffbb',
};

export const todayColors = {
    todayChartBackground: colors.secondaryDark,
    todayChartLine: colors.secondary,
    todayChartDot: colors.secondaryDark,
    todayWindIcon: colors.secondary,
}

export const styles = StyleSheet.create({

    // Main container (with SafeArea)
    mainContainer: { flex: 1, flexDirection: 'column', backgroundColor: colors.primaryDark },

    // Background image
    backgroundImage: { flex: 1, width: '100%', height: '100%' },

    // SearchBar
    searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primaryDark, padding: 10 },
    searchInput: { backgroundColor: colors.secondaryLight, borderRadius: 38, padding: 2, },
    item: { padding: 8, borderBottomWidth: 1, borderBottomColor: colors.primaryDark, backgroundColor: colors.thirdLight },
    icon: { color: colors.secondaryLight, backgroundColor: colors.secondaryLight },
    iconColor: { color: colors.primaryDark },


    // TabBar
    tabBar: { backgroundColor: colors.primaryDark },
    tabBarLabel: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
    tabIconFocuses: { color: colors.third },
    tabIconNotFocuses: { color: colors.primaryLight },

    // Error text
    errorText: { fontSize: 20, color: 'red', textAlign: 'center' },

    // All routes
    tabBackground: { flex: 1, backgroundColor: colors.tabBackground, justifyContent: 'center', alignItems: 'center' },

    // RouteCurrently
    currentlyLocationCityInfoText: { fontSize: 28, color: colors.third, textAlign: 'center', fontWeight: 'bold' },
    currentlyLocationRegionInfoText: { fontSize: 24, color: colors.primaryDark, textAlign: 'center' },
    currentlyLocationCountryInfoText: { fontSize: 24, color: colors.primaryDark, textAlign: 'center' },
    currentlyWeatherTemperatureInfoText: { fontSize: 36, color: colors.primaryDark, textAlign: 'center', fontWeight: 'bold' },
    currentlyWeatherDescriptionInfoText: { fontSize: 26, color: colors.primaryDark, textAlign: 'center' },
    currentlyWeatherWindIcon: { fontSize: 36, color: colors.secondary, textAlign: 'center' },
    currentlyWeatherWindInfoText: { fontSize: 30, color: colors.primaryDark, textAlign: 'center' },
    currentlyWeatherIcon: { fontSize: 60, color: colors.third },


    // Route Today
    todayLocationCityInfoText: { fontSize: 28, color: colors.third, textAlign: 'center', fontWeight: 'bold' },
    todayLocationRegionInfoText: { fontSize: 24, color: colors.primaryDark, textAlign: 'center' },
    todayLocationCountryInfoText: { fontSize: 24, color: colors.primaryDark, textAlign: 'center' },
    row: { flexDirection: 'row', paddingVertical: 3, justifyContent: 'space-between' },
    tabText: { color: '#000000ff', fontSize: 30, fontWeight: 'bold', textAlign: 'center' },
    weatherInfoText: { fontSize: 12, alignItems: 'center', width: 80, textAlign: 'center' },
    chartColors: { background: colors.thirdLight, curve: colors.thirdLight, dot: colors.third },
    chartContainer: { flex: 0.8, alignItems: 'center', justifyContent: 'flex-start', },
    chartTitle: { fontSize: 12, marginVertical: 15 },
    chart: { flex: 1, borderRadius: 4 },
    flatListContainer: { flex: 0.54, padding: 24, },
    hourlyItem: {
        backgroundColor: '#ffffffae', borderRadius: 12, alignItems: 'center', justifyContent: 'space-around', minHeight: 140, elevation: 3,
    },

    hourlyList: {
        // paddingHorizontal: 8,
    },

    timeText: { fontSize: 16, fontWeight: '600', color: colors.primaryDark, marginTop: 8, },
    temperatureText: { fontSize: 20, fontWeight: 'bold', color: colors.primary, },
    descriptionText: { fontSize: 12, color: '#666', textAlign: 'center', textTransform: 'capitalize', lineHeight: 16, },
    windText: { fontSize: 15, color: '#999', fontWeight: '500', marginBottom: 8, textAlign: 'center',},
    separator: {
        width: 10,
    },



    // graph

    // Route Weekly
    weeklyLocationInfoText: { fontSize: 16, textAlign: 'center' },
    weeklyRow: { flexDirection: 'row', paddingVertical: 3, justifyContent: 'space-between' },
    weeklyTabText: { color: '#000000ff', fontSize: 30, fontWeight: 'bold', textAlign: 'center' },
    weeklyTabBackground: { flex: 1, backgroundColor: '#ffffffff', justifyContent: 'center', alignItems: 'center' },
    weeklyWeatherInfoText: { fontSize: 12, justifyContent: 'center', alignItems: 'center', width: 80, textAlign: 'center' },
    weeklyError: { flex: 1, fontSize: 10, justifyContent: 'center', alignItems: 'center', color: 'red' },


});