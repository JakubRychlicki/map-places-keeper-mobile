import React, { FC } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { API_URL } from '@env';

// ASSETS
import PlaceholderImage from '../../assets/images/placeholder.jpg';

// THEME
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';

const { width } = Dimensions.get('window');
const SIZE = (width - 80) / 2;

interface Props {
  name: string;
  locality: string;
  imageURL: string | null;
  onPress: () => void;
}

const PlacesItem: FC<Props> = ({ name, locality, imageURL, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <View style={styles.container}>
        {imageURL ? (
          <Image source={{ uri: `${API_URL}${imageURL}` }} style={styles.image} />
        ) : (
          <Image source={PlaceholderImage} style={styles.image} />
        )}
        <View style={styles.descContainer}>
          <Text style={styles.nameText} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.localityText} numberOfLines={1}>
            {locality}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PlacesItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SIZE,
    maxWidth: SIZE,
    height: 200,
    marginVertical: 15,
  },
  image: {
    width: '100%',
    height: 150,
  },
  descContainer: {
    paddingVertical: 5,
  },
  nameText: {
    fontSize: 14,
    fontFamily: Fonts.RobotoMedium,
    color: Colors.secondary,
  },
  localityText: {
    fontSize: 14,
    fontFamily: Fonts.RobotoRegular,
    color: Colors.secondary,
  },
});
