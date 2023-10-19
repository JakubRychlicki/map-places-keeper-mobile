import React, { FC, useEffect, useRef, useState } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput as RNTextInput,
  Keyboard,
  ViewStyle,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import Typography from '../controls/Typography';
import { MapboxPlace } from '../../store/types/Map.model';
import { getForwardGeocoding } from '../../services/MapboxAPI';
import SearchSvg from '../../assets/svg/icons/SearchSvg';
import CloseSvg from '../../assets/svg/icons/CloseSvg';

const widthScreen = Dimensions.get('window').width;

interface Props {
  moveTo: (value: number[]) => void;
}

const SearchAddress: FC<Props> = ({ moveTo }) => {
  const searchBarRef = useRef<RNTextInput | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<MapboxPlace[]>([
    {
      id: 'place.232401077',
      type: 'Feature',
      place_type: ['place'],
      place_name: 'Radom, województwo mazowieckie, Polska',
      bbox: [21.0530299, 51.3476413, 21.2678626, 51.486287],
      center: [21.154155, 51.402256],
      geometry: {
        type: 'Point',
        coordinates: [21.154155, 51.402256],
      },
    },
    {
      id: 'place.232581301',
      type: 'Feature',
      place_type: ['place'],
      place_name: 'Radomsko, powiat radomszczański, województwo łódzkie, Polska',
      bbox: [19.3632998, 51.017725, 19.5326567, 51.1128746],
      center: [19.444611, 51.067477],
      geometry: {
        type: 'Point',
        coordinates: [19.444611, 51.067477],
      },
    },
    {
      id: 'place.63596602',
      type: 'Feature',
      place_type: ['place'],
      place_name: 'Radolfzell am Bodensee, Powiat Konstancja, Badenia-Wirtembergia, Niemcy',
      bbox: [8.906451, 47.719609, 9.061566, 47.814156],
      center: [8.9701796, 47.7373084],
      geometry: {
        type: 'Point',
        coordinates: [8.9701796, 47.7373084],
      },
    },
    {
      id: 'place.18278592',
      type: 'Feature',
      place_type: ['place'],
      place_name: 'Radowce, Okręg Suczawa, Rumunia',
      bbox: [25.881836, 47.817675, 25.983069, 47.876699],
      center: [25.918182, 47.846106],
      geometry: {
        type: 'Point',
        coordinates: [25.918182, 47.846106],
      },
    },
    {
      id: 'place.26306583',
      type: 'Feature',
      place_type: ['place'],
      place_name: 'Radomir, Obwód Pernik, Bułgaria',
      bbox: [22.942532, 42.517437, 23.029575, 42.58054],
      center: [22.96291, 42.54616],
      geometry: {
        type: 'Point',
        coordinates: [22.96291, 42.54616],
      },
    },
  ]);
  const [isSearchListVisible, setIsSearchListVisible] = useState(false);

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    // if (formattedQuery.length > 2) {
    //   getForwardGeocoding(formattedQuery);
    // } else {
    //   setSearchResults([]);
    // }
  };

  const keyboardDidHide = () => {
    Keyboard.dismiss();
    setIsSearchListVisible(false);
  };

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      keyboardDidHide();
    });

    () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={styles.searchContainer}>
      <Searchbar
        ref={searchBarRef}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        icon={({ size, color }) => <SearchSvg width={size} height={size} stroke={color} />}
        clearIcon={({ size, color }) => <CloseSvg width={size} height={size} stroke={color} />}
        onClearIconPress={() => setSearchResults([])}
        onFocus={() => {
          setIsSearchListVisible(true);
        }}
        style={styles.searchBar}
      />
      {isSearchListVisible && searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.searchList}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.searchItem}
              onPress={() => {
                keyboardDidHide();
                moveTo(item.bbox);
              }}
            >
              <Typography>{item.place_name}</Typography>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default SearchAddress;

const styles = StyleSheet.create({
  searchContainer: {
    position: 'absolute',
    top: 20,
    paddingHorizontal: 20,
    width: widthScreen,
  },
  searchBar: {
    backgroundColor: '#F5F5F5',
  },
  searchList: {
    marginTop: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 20,
  },
  searchItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
