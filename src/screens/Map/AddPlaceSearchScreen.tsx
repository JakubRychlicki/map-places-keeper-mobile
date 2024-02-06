import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapboxPlace } from '../../store/types/Map.model';
import { getForwardGeocoding } from '../../services/MapboxAPI';
import { MapNavigatorScreen } from '../../navigation/MapNavigator';
import { useTranslation } from 'react-i18next';

// THEME
import Colors from '../../constants/Colors';

// COMPONENTS
import Typography from '../../components/controls/Typography';
import ScreenTopBar from '../../components/ScreenTopBar';
import SearchInput from '../../components/controls/SearchInput';

const AddPlaceSearchScreen: MapNavigatorScreen<'AddPlaceSearch'> = ({ navigation }) => {
  const { t } = useTranslation();
  const [searchResults, setSearchResults] = useState<MapboxPlace[]>([]);

  const onChangeSearch = async (query: string) => {
    const formattedQuery = query.toLowerCase();
    if (formattedQuery.length > 2) {
      const results = await getForwardGeocoding(formattedQuery, 'address');
      if (results) {
        setSearchResults(results);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScreenTopBar title={t('screens:addPlace:type:search')} />
      <View style={styles.content}>
        <SearchInput
          placeholder={t('screens:addPlace:searchPlaceholder')}
          onChange={onChangeSearch}
          resetResults={() => setSearchResults([])}
        />
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.searchList}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => {
            const { geometry, context, place_name } = item;
            const place = context.find((c) => c.id.includes('place'));
            const country = context.find((c) => c.id.includes('country'));

            const addressName = place_name.split(',')[0] || '';
            const placeName = place?.text || '';
            const countryName = country?.text || '';

            const location = {
              address: addressName,
              place: placeName,
              country: countryName,
              coordinates: geometry.coordinates,
            };

            return (
              <TouchableOpacity
                style={styles.searchItem}
                onPress={() => navigation.navigate('AddPlaceForm', { location: location })}
              >
                <Typography>{item.place_name}</Typography>
              </TouchableOpacity>
            );
          }}
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
  searchList: {
    paddingTop: 15,
  },
  searchItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
  },
});
