import React, { FC, useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, StyleProp, ViewStyle, Keyboard } from 'react-native';

// THEME
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';

// ASSETS
import CloseSvg from '../../assets/svg/icons/CloseSvg';
import SearchSvg from '../../assets/svg/icons/SearchSvg';

interface Props {
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
  onChange: (value: string) => void;
  resetResults: () => void;
}

const SearchInput: FC<Props> = ({ placeholder, onChange, resetResults, containerStyle }) => {
  const [query, setQuery] = useState('');

  const onChangeText = (text: string) => {
    setQuery(text);
    onChange(text);
  };

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      Keyboard.dismiss();
    });

    () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.search}>
        <View style={styles.searchIcon}>
          <SearchSvg stroke={Colors.primaryText} />
        </View>
      </View>
      <TextInput value={query} placeholder={placeholder} style={styles.input} onChangeText={onChangeText} />
      {query.length > 0 && (
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.resetButton}
          onPress={() => {
            Keyboard.dismiss();
            setQuery('');
            resetResults();
          }}
        >
          <View style={styles.resetIcon}>
            <CloseSvg fill={Colors.primaryText} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  input: {
    flex: 1,
    paddingRight: 10,
    fontSize: 18,
    fontFamily: Fonts.RobotoRegular,
    color: Colors.primaryText,
    textAlignVertical: 'bottom',
    paddingTop: 0,
    paddingBottom: 0,
  },
  search: {
    justifyContent: 'flex-end',
    paddingHorizontal: 5,
  },
  searchIcon: {
    width: 25,
    height: 25,
  },
  resetButton: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  resetIcon: {
    width: 22,
    height: 22,
  },
});
