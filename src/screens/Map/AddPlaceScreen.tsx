import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapNavigatorScreen } from '../../navigation/MapNavigator';
import Mapbox, { Camera } from '@rnmapbox/maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenTopBar from '../../components/ScreenTopBar';
import Geolocation from '@react-native-community/geolocation';
import Typography from '../../components/controls/Typography';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import NextSvg from '../../assets/svg/icons/NextSvg';
import { useTranslation } from 'react-i18next';
import ModalLocationWarning from '../../components/controls/ModalLocationWarning';

Geolocation.setRNConfiguration({ skipPermissionRequests: false, locationProvider: 'auto' });

const AddPlaceScreen: MapNavigatorScreen<'AddPlace'> = ({ navigation, route }) => {
  const { type } = route.params;
  const { t } = useTranslation();
  const cameraRef = useRef<Camera | null>(null);
  const [userPosition, setUserPosition] = useState<number[] | null>(null);
  const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (pos) => {
        setUserPosition([pos.coords.longitude, pos.coords.latitude]);
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

  useEffect(() => {
    getCurrentPosition();
  }, []);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScreenTopBar />
      <View style={styles.positionInfo}>
        <Text style={styles.positionHeader}>{t('addPlace:userCurrentPosition')}</Text>
        <Text style={styles.positionText}>{userPosition ? `${userPosition[0]}, ${userPosition[1]}` : 'Undefined'}</Text>
      </View>
      <Mapbox.MapView scaleBarEnabled={false} style={styles.map}>
        <Mapbox.Camera ref={cameraRef} allowUpdates={true} />
        {userPosition && (
          <Mapbox.ShapeSource
            id="source-1"
            shape={{
              type: 'Feature',
              geometry: { type: 'Point', coordinates: userPosition },
              properties: null,
            }}
          >
            <Mapbox.CircleLayer id="layer-1" />
          </Mapbox.ShapeSource>
        )}
      </Mapbox.MapView>
      <View style={styles.nextButtonContainer}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[styles.nextButton, !userPosition && styles.nextButtonDisabled]}
          disabled={!userPosition}
          onPress={() => navigation.navigate('AddPlaceForm')}
        >
          <Text style={styles.nextButtonText}>{t('buttons:next')}</Text>
          <NextSvg color={Colors.white} />
        </TouchableOpacity>
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
  map: {
    flex: 1,
  },
  positionInfo: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  positionHeader: {
    fontFamily: Fonts.RobotoMedium,
    fontSize: 24,
    color: Colors.black,
    marginBottom: 10,
  },
  positionText: {
    fontFamily: Fonts.RobotoMedium,
    fontSize: 14,
    color: Colors.black,
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
});
