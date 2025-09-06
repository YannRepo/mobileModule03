import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    // SearchBar
    searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#2E294E', padding: 10 },
    searchInput: { backgroundColor: '#EEE8F4', borderRadius: 38, padding: 2,  },
    item: { padding: 8, borderBottomWidth: 1, borderBottomColor: "#2E294E", backgroundColor: '#D499B9' },
    icon: { color: '#9055A2', backgroundColor: '#F3E8EE' },
    iconColor: { color: '#2E294E' },
    
    // TabBar
    tabBar: { backgroundColor: '#2E294E' },
    tabBarLabel: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
    
    // Error text
    errorText: { fontSize: 20, color: 'red', textAlign: 'center' },

    // RouteCurrently
    CurrentlyTabText: { color: '#000000ff', fontSize: 30, fontWeight: 'bold', textAlign: 'center' },
    CurrentlyTabBackground: { flex: 1, backgroundColor: '#ffffffff', justifyContent: 'center', alignItems: 'center' },
    CurrentlyWeatherInfoText: { fontSize: 20, alignItems: 'center' },


    // Route Today
    locationInfoText: { fontSize: 16, textAlign: 'center' },
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