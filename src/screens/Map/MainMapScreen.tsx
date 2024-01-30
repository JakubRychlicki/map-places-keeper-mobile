import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, MapView, UserLocation, UserLocationRenderMode } from '@rnmapbox/maps';
import { MapNavigatorScreen } from '../../navigation/MapNavigator';
import { useAppSelector } from '../../hooks/useAppDispatch';
import { Position } from '@rnmapbox/maps/lib/typescript/types/Position';
import { UserPlace } from '../../store/types/Map.model';
import Geolocation from '@react-native-community/geolocation';

// COMPONENTS
import SearchAddress from '../../components/map/SearchAddress';
import FabGroup from '../../components/map/FabGroup';
import ModalAddPlace from '../../components/map/ModalAddPlace';
import MapPoints from '../../components/map/MapPoints';
import ModalLocationWarning from '../../components/controls/ModalLocationWarning';
import ModalPlaceInfo from '../../components/map/ModalPlaceInfo';

const MainMapScreen: MapNavigatorScreen<'MainMap'> = ({ navigation }) => {
  const { userPlaces } = useAppSelector((state) => state.map);
  const mapRef = useRef<MapView | null>(null);
  const cameraRef = useRef<Camera | null>(null);
  const [isOpenFAB, setIsOpenFAB] = useState(false);
  const [isModalAddPlaceOpen, setIsModalAddPlaceOpen] = useState(false);
  const [isModalLocationWarningOpen, setIsModalLocationWarningOpen] = useState(false);
  const [mapBounds, setMapBounds] = useState<[Position, Position] | undefined>(undefined);
  const [activePlace, setActivePlace] = useState<UserPlace | null>(null);

  const changeActivePlace = (place: UserPlace) => {
    setActivePlace(place);
  };

  const getBoundsFromMap = async () => {
    const bounds = await mapRef.current?.getVisibleBounds();
    setMapBounds(bounds);

    return bounds;
  };

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (pos) => {
        setIsModalLocationWarningOpen(false);
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
      <MapView ref={mapRef} scaleBarEnabled={false} logoEnabled={false} attributionEnabled={false} style={styles.map}>
        <Camera ref={cameraRef} followUserLocation={true} followZoomLevel={12} />
        <MapPoints data={userPlaces.data} showPlace={changeActivePlace} />
        <UserLocation renderMode={UserLocationRenderMode.Native} />
      </MapView>
      <SearchAddress moveTo={moveToSpecificLocation} />
      <FabGroup
        isOpen={isOpenFAB}
        handleChange={(value) => setIsOpenFAB(value)}
        onAddPlace={() => {
          setIsModalAddPlaceOpen(true);
          getBoundsFromMap();
        }}
        onSelectArea={async () => {
          const bounds = await getBoundsFromMap();
          navigation.navigate('SpatialSearch', { bounds: bounds });
        }}
      />
      {activePlace && (
        <ModalPlaceInfo place={activePlace} hideModal={() => setActivePlace(null)} navigation={navigation} />
      )}
      <ModalAddPlace
        visible={isModalAddPlaceOpen}
        hideModal={() => setIsModalAddPlaceOpen(false)}
        navigation={navigation}
        mapBounds={mapBounds}
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
