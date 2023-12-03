import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileNavigatorScreen } from '../../navigation/ProfileNavigator';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { Camera, MapView, PointAnnotation } from '@rnmapbox/maps';
import { useTranslation } from 'react-i18next';
import { API_URL } from '@env';
import * as actions from '../../store/actions';

// ASSETS
import MapPointSvg from '../../assets/svg/icons/MapPointSvg';
import RemoveSvg from '../../assets/svg/icons/RemoveIcon';
import PlaceholderImage from '../../assets/images/placeholder.jpg';

// COMPONENTS
import Loader from '../../components/controls/Loader';
import ScreenTopBar from '../../components/ScreenTopBar';
import LocationInfo from '../../components/map/LocationInfo';
import Typography, { TypographyType } from '../../components/controls/Typography';
import RoundButton from '../../components/controls/RoundButton';
import PlaceDeleteModal from '../../components/profile/PlaceDeleteModal';

const PlaceDetails: ProfileNavigatorScreen<'PlaceDetails'> = ({ navigation, route }) => {
  const { id } = route.params;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { userPlaces, isDeletePlaceLoading } = useAppSelector((state) => state.map);
  const currentPlace = userPlaces.data.find((place) => place.id === id);

  const [placeDeleteModalVisible, setPlaceDeleteModalVisible] = useState(false);
  const showPlaceDeleteModal = () => setPlaceDeleteModalVisible(true);
  const hidePlaceDeleteModal = () => setPlaceDeleteModalVisible(false);

  const deletePlace = () => {
    dispatch(actions.deletePlace(id));
    navigation.goBack();
  };

  if (!currentPlace) {
    return <Loader />;
  }

  const { name, description, graphics, longitude, latitude, country, locality, street_address } =
    currentPlace.attributes;
  const imageURL = graphics?.data.attributes.formats.medium.url || graphics?.data.attributes.url;

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScreenTopBar title={name} rightIcon={<RoundButton icon={<RemoveSvg />} onPress={showPlaceDeleteModal} />} />
      <ScrollView>
        {graphics ? (
          <Image source={{ uri: `${API_URL}${imageURL}` }} style={styles.image} />
        ) : (
          <Image source={PlaceholderImage} style={styles.image} />
        )}
        <View style={styles.info}>
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
      <PlaceDeleteModal
        visible={placeDeleteModalVisible}
        isLoading={isDeletePlaceLoading}
        hideModal={hidePlaceDeleteModal}
        deletePlace={deletePlace}
      />
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
