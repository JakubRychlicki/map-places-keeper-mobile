import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, MapView, UserLocation, UserLocationRenderMode } from '@rnmapbox/maps';
import { MapNavigatorScreen } from '../../navigation/MapNavigator';
import { useAppSelector } from '../../hooks/useAppDispatch';
import Geolocation from '@react-native-community/geolocation';

// COMPONENTS
import SearchAddress from '../../components/map/SearchAddress';
import FabGroup from '../../components/map/FabGroup';
import ModalAddPlace from '../../components/map/ModalAddPlace';
import MapPoints from '../../components/map/MapPoints';
import ModalLocationWarning from '../../components/controls/ModalLocationWarning';

const MainMapScreen: MapNavigatorScreen<'MainMap'> = ({ navigation }) => {
  const { userPlaces } = useAppSelector((state) => state.map);
  const cameraRef = useRef<Camera | null>(null);
  const [isOpenFAB, setIsOpenFAB] = useState(false);
  const [isModalAddPlaceOpen, setIsModalAddPlaceOpen] = useState(false);
  const [isModalLocationWarningOpen, setIsModalLocationWarningOpen] = useState(false);

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (pos) => {
        const { longitude, latitude } = pos.coords;
        setIsModalLocationWarningOpen(false);
        setTimeout(() => {
          if (cameraRef.current) {
            cameraRef.current.flyTo([longitude, latitude], 1000);
          }
        }, 1);
      },
      (error) => {
        setIsModalLocationWarningOpen(true);
      },
      { enableHighAccuracy: false },
    );
  };

  const moveToSpecificLocation = (coordinates: number[]) => {
    const [lon1, lat1, lon2, lat2] = coordinates;

    cameraRef.current?.fitBounds([lon1, lat1], [lon2, lat2]);
  };

  useEffect(() => {
    getCurrentPosition();
  }, []);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <MapView scaleBarEnabled={false} logoEnabled={false} attributionEnabled={false} style={styles.map}>
        <Camera ref={cameraRef} followUserLocation={true} />
        <MapPoints data={userPlaces.data} />
        <UserLocation renderMode={UserLocationRenderMode.Native} />
      </MapView>
      <SearchAddress moveTo={moveToSpecificLocation} />
      <FabGroup
        isOpen={isOpenFAB}
        handleChange={(value) => setIsOpenFAB(value)}
        onAddPlace={() => setIsModalAddPlaceOpen(true)}
        onSelectArea={() => navigation.navigate('SpatialSearch')}
      />
      <ModalAddPlace
        visible={isModalAddPlaceOpen}
        hideModal={() => setIsModalAddPlaceOpen(false)}
        navigation={navigation}
      />
      <ModalLocationWarning visible={isModalLocationWarningOpen} tryAgainFcn={getCurrentPosition} />
    </SafeAreaView>
  );
};

export default MainMapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
