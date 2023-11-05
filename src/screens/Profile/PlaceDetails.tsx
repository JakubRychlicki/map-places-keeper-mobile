import React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileNavigatorScreen } from '../../navigation/ProfileNavigator';
import { useAppSelector } from '../../hooks/useAppDispatch';
import { Camera, MapView, PointAnnotation } from '@rnmapbox/maps';
import { useTranslation } from 'react-i18next';
import { API_URL } from '@env';

// ASSETS
import MapPointSvg from '../../assets/svg/icons/MapPointSvg';
import PlaceholderImage from '../../assets/images/placeholder.jpg';

// COMPONENTS
import Loader from '../../components/controls/Loader';
import ScreenTopBar from '../../components/ScreenTopBar';
import LocationInfo from '../../components/map/LocationInfo';
import Typography, { TypographyType } from '../../components/controls/Typography';

const PlaceDetails: ProfileNavigatorScreen<'PlaceDetails'> = ({ route }) => {
  const { id } = route.params;
  const { t } = useTranslation();
  const { userPlaces } = useAppSelector((state) => state.map);
  const currentPlace = userPlaces.data.find((place) => place.id === id);

  if (!currentPlace) {
    return <Loader />;
  }

  const { name, description, graphics, longitude, latitude, country, locality, street_address } =
    currentPlace.attributes;
  const imageURL = graphics?.data.attributes.formats.medium.url || graphics?.data.attributes.url;

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScreenTopBar />
      <ScrollView>
        {graphics ? (
          <Image source={{ uri: `${API_URL}${imageURL}` }} style={styles.image} />
        ) : (
          <Image source={PlaceholderImage} style={styles.image} />
        )}
        <View style={styles.info}>
          <Typography type={TypographyType.TextL} numberOfLines={1} style={styles.title}>
            {name}
          </Typography>
          <Typography type={TypographyType.Text}>{description}</Typography>
        </View>
        <LocationInfo
          title={t('placeDetails:addressHeader')}
          address={street_address}
          place={locality}
          country={country}
        />
        <View style={styles.mapContainer}>
          <Typography type={TypographyType.TextM} style={styles.mapHeader}>
            {t('placeDetails:mapHeader')}
          </Typography>
          <MapView
            zoomEnabled={true}
            scaleBarEnabled={false}
            requestDisallowInterceptTouchEvent={true}
            style={styles.map}
          >
            <Camera defaultSettings={{ centerCoordinate: [longitude, latitude], zoomLevel: 14 }} />
            <PointAnnotation id="location" coordinate={[longitude, latitude]}>
              <View style={styles.point}>
                <MapPointSvg />
              </View>
            </PointAnnotation>
          </MapView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
  },
  info: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    marginBottom: 10,
  },
  address: {
    paddingHorizontal: 20,
  },
  mapContainer: {
    width: '100%',
    height: 300,
  },
  mapHeader: {
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  map: {
    flex: 1,
  },
  point: {
    width: 30,
    height: 30,
  },
});