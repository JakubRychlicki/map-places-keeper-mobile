import React, { useState, useRef, useEffect, useCallback } from 'react';
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
    cameraRef.current?.setCamera({
      centerCoordinate: [place.attributes.longitude, place.attributes.latitude],
      padding: {
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
      },
      zoomLevel: 15,
      animationDuration: 500,
    });
  };

  const hideActivePlace = () => {
    setActivePlace(null);
  };

  const fitMapToPlaces = useCallback(() => {
    if (!userPlaces.data.length) return;

    const coordinates = userPlaces.data.map((place) => [place.attributes.longitude, place.attributes.latitude]);
    const lon = coordinates.map((coord) => coord[0]);
    const lat = coordinates.map((coord) => coord[1]);

    const lon1 = Math.min(...lon);
    const lat1 = Math.min(...lat);
    const lon2 = Math.max(...lon);
    const lat2 = Math.max(...lat);

    cameraRef.current?.fitBounds([lon1, lat1], [lon2, lat2], 20, 500);
  }, [userPlaces.data]);

  const getBoundsFromMap = async () => {
    const bounds = await mapRef.current?.getVisibleBounds();
    setMapBounds(bounds);

    return bounds;
  };

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (pos) => {
        cameraRef.current?.setCamera({
          centerCoordinate: [pos.coords.longitude, pos.coords.latitude],
          zoomLevel: 10,
          animationDuration: 0,
          animationMode: 'none',
        });
        setIsModalLocationWarningOpen(false);
      },
      (error) => {
        setIsModalLocationWarningOpen(true);
      },
      { enableHighAccuracy: false },
    );
  };

  const moveToSpecificLocation = (coordinates: number[]) => {
    cameraRef.current?.setCamera({
      centerCoordinate: coordinates,
      zoomLevel: 15,
      animationDuration: 500,
    });
  };

  useEffect(() => {
    getCurrentPosition();
  }, [cameraRef.current]);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <MapView ref={mapRef} scaleBarEnabled={false} style={styles.map}>
        <Camera ref={cameraRef} followZoomLevel={15} />
        <MapPoints data={userPlaces.data} isInteractive={true} showPlace={changeActivePlace} />
        <UserLocation renderMode={UserLocationRenderMode.Native} />
      </MapView>
      <SearchAddress moveTo={moveToSpecificLocation} />
      <FabGroup
        isOpen={isOpenFAB}
        onPress={hideActivePlace}
        handleChange={(value) => setIsOpenFAB(value)}
        onAddPlace={() => {
          setIsModalAddPlaceOpen(true);
          getBoundsFromMap();
        }}
        onSelectArea={async () => {
          const bounds = await getBoundsFromMap();
          navigation.navigate('SpatialSearch', { bounds: bounds });
        }}
        onFitToPlaces={() => {
          fitMapToPlaces();
          setIsOpenFAB(false);
        }}
      />
      {activePlace && <ModalPlaceInfo place={activePlace} hideModal={hideActivePlace} navigation={navigation} />}
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
