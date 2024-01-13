import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '../../hooks/useAppDispatch';
import { MapNavigatorScreen } from '../../navigation/MapNavigator';
import { useTranslation } from 'react-i18next';
import { getIsPointInsidePolygon } from '../../utils/map';
import { API_URL } from '@env';

// ASSETS
import PlaceholderImage from '../../assets/images/placeholder.jpg';

// COMPONENTS
import Typography, { TypographyType } from '../../components/controls/Typography';
import ScreenTopBar from '../../components/ScreenTopBar';

const { width } = Dimensions.get('window');

const PlacesScreen: MapNavigatorScreen<'Places'> = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { area } = route.params;
  const { userPlaces } = useAppSelector((state) => state.map);

  const newLocations = userPlaces.data.filter((place) => {
    const coords = [place.attributes.longitude, place.attributes.latitude];
    return getIsPointInsidePolygon(coords, area);
  });

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScreenTopBar title={t('screens:places:title', { value: newLocations.length })} />

      {newLocations.length > 0 ? (
        <FlatList
          data={newLocations}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => {
            const { name, locality, graphics } = item.attributes;
            let imageURL = null;

            if (graphics.data !== null) {
              imageURL = graphics.data.attributes.formats.medium.url || graphics.data.attributes.url;
            }

            return (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.navigate('FoundPlaceDetails', { id: item.id })}
                style={styles.item}
              >
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
      ) : (
        <View style={styles.noPlacesContainer}>
          <Typography type={TypographyType.Text} style={styles.noPlacesText}>
            {t('screens:places:noPlaces')}
          </Typography>
        </View>
      )}
    </SafeAreaView>
  );
};

export default PlacesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  item: {
    width: width * 0.5,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 15,
  },
  description: {
    flexDirection: 'column',
    gap: 5,
    paddingTop: 10,
  },
  noPlacesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPlacesText: {
    width: width * 0.5,
    textAlign: 'center',
  },
});
