import { View } from 'react-native';
import { styles } from '../styles/styles';

import MySearchBar from './MySearchBar';
import LocationButton from './LocationButton';

export default function ResearchLocationArea() {

  return (
    <View style={ styles.searchContainer }>
      <View style={{ flex: 1 }}>
        <MySearchBar />
      </View>
      <View style={{ marginLeft: 8 }}>
        <LocationButton />
      </View>
    </View>
  );
};
