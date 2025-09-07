import { StyleSheet } from 'react-native';


// Color palette
export const colors = {
    primaryLight: '#9598aeff',
    primary: '#2E294E',
    primaryDark: '#1C1A2D',
    secondary: '#37bff1ff',
    third:  '#F18E37',//#851035ff',
    thirdLight: '#ebae7aff',
    thirdDark: '#94531aff',
    fourth: '#ca3b69ff',
    accent: '#F3E8EE',
    error: 'red',
    tabBackground: '#ffffffbb',
};

export const styles = StyleSheet.create({

    // Main container (with SafeArea)
    mainContainer: { flex: 1, flexDirection: 'column', backgroundColor: colors.primaryDark },

    // Background image
    backgroundImage: { flex: 1, width: '100%', height: '100%' },

    // SearchBar
    searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primaryDark, padding: 10 },
    searchInput: { backgroundColor: '#EEE8F4', borderRadius: 38, padding: 2, },
    item: { padding: 8, borderBottomWidth: 1, borderBottomColor: "#2E294E", backgroundColor: '#D499B9' },
    icon: { color: '#F3E8EE', backgroundColor: '#F3E8EE' },
    iconColor: { color: '#2E294E' },
    tabIconFocuses: { color: colors.secondary },
    tabIconNotFocuses: { color: colors.primaryLight },

    // TabBar
    tabBar: { backgroundColor: colors.primaryDark },
    tabBarLabel: { color: '#fff', fontSize: 14, fontWeight: 'bold' },

    // Error text
    errorText: { fontSize: 20, color: 'red', textAlign: 'center' },

    // RouteCurrently
    CurrentlyTabText: { color: '#000000ff', fontSize: 30, fontWeight: 'bold', textAlign: 'center' },
    CurrentlyTabBackground: { flex: 1, backgroundColor: colors.tabBackground, justifyContent: 'center', alignItems: 'center' },
    CurrentlyWeatherInfoText: { fontSize: 20, alignItems: 'center' },


    // Route Today
    locationCityInfoText: { fontSize: 24, color: colors.third,  textAlign: 'center', fontWeight: 'bold' },
    locationRegionInfoText: { fontSize: 20, color: colors.thirdLight, textAlign: 'center' },
    locationCountryInfoText: { fontSize: 20, color: colors.thirdLight, textAlign: 'center' },
    weatherTemperatureInfoText: { fontSize: 16, textAlign: 'center' },
    weatherDescriptionInfoText: { fontSize: 16, textAlign: 'center' },
    weatherWindInfoText: { fontSize: 16, textAlign: 'center' },
    row: { flexDirection: 'row', paddingVertical: 3, justifyContent: 'space-between' },
    tabText: { color: '#000000ff', fontSize: 30, fontWeight: 'bold', textAlign: 'center' },
    tabBackground: { flex: 1, backgroundColor: '#ffffffff', justifyContent: 'center', alignItems: 'center' },
    weatherInfoText: { fontSize: 12, alignItems: 'center', width: 80, textAlign: 'center' },

    // Route Weekly
    weeklyLocationInfoText: { fontSize: 16, textAlign: 'center' },
    weeklyRow: { flexDirection: 'row', paddingVertical: 3, justifyContent: 'space-between' },
    weeklyTabText: { color: '#000000ff', fontSize: 30, fontWeight: 'bold', textAlign: 'center' },
    weeklyTabBackground: { flex: 1, backgroundColor: '#ffffffff', justifyContent: 'center', alignItems: 'center' },
    weeklyWeatherInfoText: { fontSize: 12, justifyContent: 'center', alignItems: 'center', width: 80, textAlign: 'center' },
    weeklyError: { flex: 1, fontSize: 10, justifyContent: 'center', alignItems: 'center', color: 'red' },


});