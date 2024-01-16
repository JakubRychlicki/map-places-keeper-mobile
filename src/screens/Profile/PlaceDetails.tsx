import React, { useRef, useState } from 'react';
import { View, StyleSheet, Image, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileNavigatorScreen } from '../../navigation/ProfileNavigator';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { Camera, MapView, PointAnnotation } from '@rnmapbox/maps';
import { useTranslation } from 'react-i18next';
import { SvgXml } from 'react-native-svg';
import { API_URL } from '@env';
import * as actions from '../../store/actions';
import Share from 'react-native-share';

// THEME
import Colors from '../../constants/Colors';

// ASSETS
import MapPointSvg from '../../assets/svg/icons/MapPointSvg';
import RemoveSvg from '../../assets/svg/icons/RemoveIcon';
import EditSvg from '../../assets/svg/icons/EditSvg';
import MoreSvg from '../../assets/svg/icons/MoreSvg';
import PlaceholderImage from '../../assets/images/placeholder.jpg';

// COMPONENTS
import Loader from '../../components/controls/Loader';
import ScreenTopBar from '../../components/ScreenTopBar';
import LocationInfo from '../../components/map/LocationInfo';
import Typography, { TypographyType } from '../../components/controls/Typography';
import RoundButton from '../../components/controls/RoundButton';
import PlaceDeleteModal from '../../components/profile/PlaceDeleteModal';
import Button from '../../components/controls/Button';

const PlaceDetails: ProfileNavigatorScreen<'PlaceDetails'> = ({ navigation, route }) => {
  const { id } = route.params;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { userPlaces, isDeletePlaceLoading } = useAppSelector((state) => state.map);
  const currentPlace = userPlaces.data.find((place) => place.id === id);

  // MORE OPTIONS
  const optionsSlideAnim = useRef(new Animated.Value(0)).current;
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const toogleOptionsVisible = () => setIsOptionsVisible(!isOptionsVisible);
  const hideOptions = () => {
    slideTo(0);
    setIsOptionsVisible(false);
  };

  // PLACE DELETE MODAL
  const [placeDeleteModalVisible, setPlaceDeleteModalVisible] = useState(false);
  const showPlaceDeleteModal = () => setPlaceDeleteModalVisible(true);
  const hidePlaceDeleteModal = () => {
    setPlaceDeleteModalVisible(false);
    hideOptions();
  };

  const deletePlace = () => {
    dispatch(actions.deletePlace(id));
    navigation.goBack();
  };

  // SHARE
  const sharePlace = async () => {
    try {
      const options = {
        title: t('screens:placeDetails:share:options:title'),
        message: t('screens:placeDetails:share:options:message', { name: currentPlace?.attributes.name }),
        url: `https://www.google.com/maps/search/?api=1&query=${currentPlace?.attributes.latitude},${currentPlace?.attributes.longitude}`,
      };

      const shareResponse = await Share.open(options);
    } catch (error) {
      console.log(error);
    }
  };

  // ANIMATION OF MORE OPTIONS
  const slideTo = (toValue: number) => {
    Animated.timing(optionsSlideAnim, {
      toValue,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const toggleSlide = () => {
    if (isOptionsVisible) {
      slideTo(99);
    } else {
      slideTo(0);
    }

    toogleOptionsVisible();
  };

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
      <ScreenTopBar
        title={name}
        rightIcon={<RoundButton icon={<MoreSvg />} onPress={toggleSlide} />}
        isPlaceDetailsView
        optionsForPlaceDetailsView={
          <Animated.View
            style={[
              styles.options,
              {
                transform: [{ translateY: optionsSlideAnim }],
              },
            ]}
          >
            <RoundButton
              icon={<EditSvg />}
              onPress={() => {
                hideOptions();
                navigation.navigate('EditPlaceDetails', { place: currentPlace });
              }}
            />
            <RoundButton icon={<RemoveSvg />} onPress={showPlaceDeleteModal} />
          </Animated.View>
        }
      />
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
        <View style={styles.shareContainer}>
          <Button title={t('screens:placeDetails:share:buttonText')} onPress={sharePlace} />
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
  options: {
    position: 'absolute',
    top: -50,
    right: 20,
    paddingVertical: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    zIndex: 1,
    backgroundColor: Colors.primary,
  },
  shareContainer: {
    padding: 20,
  },
});
