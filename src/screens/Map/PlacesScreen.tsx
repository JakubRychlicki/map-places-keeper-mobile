import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '../../hooks/useAppDispatch';
import { MapNavigatorScreen } from '../../navigation/MapNavigator';
import { getIsPointInsidePolygon } from '../../utils/map';
import { API_URL } from '@env';

// ASSETS
import PlaceholderImage from '../../assets/images/placeholder.jpg';

// COMPONENTS
import Typography, { TypographyType } from '../../components/controls/Typography';
import ScreenTopBar from '../../components/ScreenTopBar';

const { width } = Dimensions.get('window');

const PlacesScreen: MapNavigatorScreen<'Places'> = ({ navigation, route }) => {
  const { area } = route.params;
  const { userPlaces } = useAppSelector((state) => state.map);

  const newLocations = userPlaces.data.filter((place) => {
    const coords = [place.attributes.longitude, place.attributes.latitude];
    return getIsPointInsidePolygon(coords, area);
  });

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScreenTopBar />

      <View style={styles.header}>
        <Typography type={TypographyType.BigHeaderR}>Founded Places({newLocations.length})</Typography>
      </View>

      <FlatList
        data={newLocations}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const { name, locality, graphics } = item.attributes;
          const imageURL = graphics?.data.attributes.formats.medium.url || graphics?.data.attributes.url;

          return (
            <TouchableOpacity activeOpacity={0.6} onPress={() => {}} style={styles.item}>
              {imageURL ? (
                <Image source={{ uri: `${API_URL}${imageURL}` }} style={styles.image} />
              ) : (
                <Image source={PlaceholderImage} style={styles.image} />
              )}
              <View style={styles.description}>
                <Typography type={TypographyType.TextM} numberOfLines={1}>
                  {name}
                </Typography>
                <Typography type={TypographyType.Text} numberOfLines={1}>
                  {locality}
                </Typography>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default PlacesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  list: {
    paddingHorizontal: 20,
  },
  item: {
    width: width * 0.6,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 15,
  },
  description: {
    flexDirection: 'column',
    gap: 5,
    paddingTop: 10,
  },
});
