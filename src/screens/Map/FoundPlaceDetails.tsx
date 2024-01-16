import React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapNavigatorScreen } from '../../navigation/MapNavigator';
import { useAppSelector } from '../../hooks/useAppDispatch';
import { Camera, MapView, PointAnnotation } from '@rnmapbox/maps';
import { useTranslation } from 'react-i18next';
import { SvgXml } from 'react-native-svg';
import { API_URL } from '@env';

// THEME
import Colors from '../../constants/Colors';

// ASSETS
import MapPointSvg from '../../assets/svg/icons/MapPointSvg';
import PlaceholderImage from '../../assets/images/placeholder.jpg';

// COMPONENTS
import Loader from '../../components/controls/Loader';
import ScreenTopBar from '../../components/ScreenTopBar';
import LocationInfo from '../../components/map/LocationInfo';
import Typography, { TypographyType } from '../../components/controls/Typography';

const FoundPlaceDetails: MapNavigatorScreen<'FoundPlaceDetails'> = ({ route }) => {
  const { id } = route.params;
  const { t } = useTranslation();
  const { userPlaces } = useAppSelector((state) => state.map);
  const currentPlace = userPlaces.data.find((place) => place.id === id);

  if (!currentPlace) {
    return <Loader />;
  }

  const { name, description, graphics, longitude, latitude, country, locality, street_address, category } =
    currentPlace.attributes;

  let imageURL = null;

  if (graphics.data !== null) {
    if (graphics.data.attributes.formats.medium?.url) {
      imageURL = graphics.data.attributes.formats.medium.url;
    } else {
      imageURL = graphics.data.attributes.url;
    }
  }

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScreenTopBar title={name} />
      <ScrollView>
        <View style={styles.imageContainer}>
          <View style={styles.categoryIconContainer}>
            <View style={styles.categoryIcon}>
              <SvgXml xml={category.data.attributes.icon} />
            </View>
          </View>
          {imageURL ? (
            <Image source={{ uri: `${API_URL}${imageURL}` }} style={styles.image} />
          ) : (
            <Image source={PlaceholderImage} style={styles.image} />
          )}
        </View>
        <View style={styles.info}>
          <Typography type={TypographyType.Text}>{description}</Typography>
        </View>
        <LocationInfo
          title={t('screens:placeDetails:addressHeader')}
          address={street_address}
          place={locality}
          country={country}
        />
        <View style={styles.mapContainer}>
          <Typography type={TypographyType.TextM} style={styles.mapHeader}>
            {t('screens:placeDetails:mapHeader')}
          </Typography>
          <MapView
            zoomEnabled={true}
            scaleBarEnabled={false}
            logoEnabled={false}
            attributionEnabled={false}
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

export default FoundPlaceDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 300,
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  categoryIconContainer: {
    position: 'absolute',
    width: 70,
    height: 70,
    bottom: 0,
    right: 0,
    zIndex: 1,
    borderTopLeftRadius: 50,
    backgroundColor: Colors.white,
  },
  categoryIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 50,
    height: 50,
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
