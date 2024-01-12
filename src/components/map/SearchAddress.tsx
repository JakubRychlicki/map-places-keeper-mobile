import React, { FC, useEffect, useRef, useState } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput as RNTextInput,
  Keyboard,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { MapboxPlace } from '../../store/types/Map.model';
import { getForwardGeocoding } from '../../services/MapboxAPI';
import { useTranslation } from 'react-i18next';

// ICONS
import SearchSvg from '../../assets/svg/icons/SearchSvg';
import CloseSvg from '../../assets/svg/icons/CloseSvg';

// COMPONENTS
import Typography from '../controls/Typography';

const widthScreen = Dimensions.get('window').width;

interface Props {
  moveTo: (value: number[]) => void;
}

const SearchAddress: FC<Props> = ({ moveTo }) => {
  const { t } = useTranslation();
  const searchBarRef = useRef<RNTextInput | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<MapboxPlace[]>([]);
  const [isSearchListVisible, setIsSearchListVisible] = useState(false);

  const onChangeSearch = async (query: string) => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    if (formattedQuery.length > 2) {
      const results = await getForwardGeocoding(formattedQuery);
      if (results) {
        setSearchResults(results);
      }
    } else {
      setSearchResults([]);
    }
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
        placeholder={t('screens:mainMap:searchPlaceholder')}
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
