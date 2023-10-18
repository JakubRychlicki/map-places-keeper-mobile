import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Keyboard, FlatList, TouchableOpacity, StyleSheet, TextInput as RNTextInput } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Typography from '../../components/controls/Typography';
import { MapboxPlace } from '../../store/types/Map.model';
import ScreenTopBar from '../../components/ScreenTopBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchInput from '../../components/controls/SearchInput';
import Colors from '../../constants/Colors';

const AddPlaceSearchScreen = () => {
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

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    // if (formattedQuery.length > 2) {
    //   getForwardGeocoding(formattedQuery);
    // } else {
    //   setSearchResults([]);
    // }
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScreenTopBar />
      <View style={styles.content}>
        <SearchInput
          placeholder="Search for a place"
          onChange={onChangeSearch}
          onReset={() => setSearchResults([])}
          containerStyle={styles.searchBar}
        />
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.searchList}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.searchItem}
              onPress={() => {
                console.log(item);
              }}
            >
              <Typography>{item.place_name}</Typography>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddPlaceSearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
  },
  searchBar: {},
  searchInput: {
    backgroundColor: 'blue',
  },
  searchList: {
    paddingTop: 15,
    //paddingHorizontal: 15,
  },
  searchItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
});
