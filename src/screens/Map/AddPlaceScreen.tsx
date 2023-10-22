import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { MapNavigatorScreen } from '../../navigation/MapNavigator';
import Mapbox, { Camera } from '@rnmapbox/maps';
import Geolocation from '@react-native-community/geolocation';
import { Feature, GeoJsonProperties, Geometry, Point } from 'geojson';
import { getReverseGeocoding } from '../../services/MapboxAPI';
import { LocationInfo as LocationInfoType } from '../../store/types/Map.model';

// THEME
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';

// ICONS
import NextSvg from '../../assets/svg/icons/NextSvg';
import MapPointSvg from '../../assets/svg/icons/MapPointSvg';

// COMPONENTS
import ScreenTopBar from '../../components/ScreenTopBar';
import LocationInfo from '../../components/map/LocationInfo';
import ModalLocationWarning from '../../components/controls/ModalLocationWarning';

Geolocation.setRNConfiguration({ skipPermissionRequests: false, locationProvider: 'auto' });

const AddPlaceScreen: MapNavigatorScreen<'AddPlace'> = ({ navigation, route }) => {
  const { type } = route.params;
  const { t } = useTranslation();
  const cameraRef = useRef<Camera | null>(null);
  const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);
  const [userPosition, setUserPosition] = useState<number[] | null>(null);
  const [userLocation, setUserLocation] = useState<LocationInfoType>({
    address: '',
    place: '...',
    country: '...',
  });

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (pos) => {
        setUserPosition([pos.coords.longitude, pos.coords.latitude]);
        getAddressLocation(pos.coords.longitude, pos.coords.latitude);
        setIsModalErrorOpen(false);
        setTimeout(() => {
          if (cameraRef.current) {
            cameraRef.current.flyTo([pos.coords.longitude, pos.coords.latitude], 1000);
          }
        }, 1);
      },
      (error) => {
        setIsModalErrorOpen(true);
      },
      { enableHighAccuracy: false },
    );
  };

  const addFeature = (feature: Feature<Geometry>) => {
    const [longitude, latitude] = (feature as Feature<Point>).geometry.coordinates;

    setUserPosition([longitude, latitude]);
    getAddressLocation(longitude, latitude);
  };

  const getAddressLocation = async (longitude: number, latitude: number) => {
    const location = await getReverseGeocoding(longitude, latitude);

    if (location) {
      setUserLocation(location);
    }
  };

  useEffect(() => {
    if (type === 'device_location') {
      getCurrentPosition();
    }
  }, []);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScreenTopBar />
      <LocationInfo address={userLocation?.address} place={userLocation?.place} country={userLocation?.country} />
      <View style={styles.mapContainer}>
        <Mapbox.MapView
          scaleBarEnabled={false}
          style={styles.map}
          onPress={(_feature: Feature<Geometry, GeoJsonProperties>) => {
            if (type === 'press_on_the_map') {
              addFeature(_feature);
            }
          }}
        >
          <Mapbox.Camera ref={cameraRef} allowUpdates={true} />
          {userPosition && (
            <Mapbox.MarkerView coordinate={userPosition}>
              <View style={styles.point}>
                <MapPointSvg fill={Colors.primary} stroke={Colors.black} />
              </View>
            </Mapbox.MarkerView>
          )}
        </Mapbox.MapView>
        <View style={styles.nextButtonContainer}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={[styles.nextButton, !userPosition && styles.nextButtonDisabled]}
            disabled={!userPosition}
            onPress={() => navigation.navigate('AddPlaceForm', { address: '', coordinates: userPosition })}
          >
            <Text style={styles.nextButtonText}>{t('buttons:next')}</Text>
            <NextSvg color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>
      <ModalLocationWarning visible={isModalErrorOpen} tryAgainFcn={getCurrentPosition} />
    </SafeAreaView>
  );
};

export default AddPlaceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  nextButtonContainer: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    bottom: 20,
  },
  nextButton: {
    height: 45,
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
  nextButtonText: {
    fontFamily: Fonts.RobotoMedium,
    fontSize: 18,
    color: Colors.white,
  },
  point: {
    width: 25,
    height: 25,
  },
});
