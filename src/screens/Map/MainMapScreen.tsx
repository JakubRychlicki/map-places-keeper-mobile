import React, { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Mapbox, { Camera } from '@rnmapbox/maps';
import { MapNavigatorScreen } from '../../navigation/MapNavigator';

// COMPONENTS
import SearchAddress from '../../components/map/SearchAddress';
import FabGroup from '../../components/map/FabGroup';
import ModalAddPlace from '../../components/map/ModalAddPlace';

const MainMapScreen: MapNavigatorScreen<'MainMap'> = ({ navigation }) => {
  const cameraRef = useRef<Camera | null>(null);
  const [isOpenFAB, setIsOpenFAB] = useState(false);
  const [isModalAddPlaceOpen, setIsModalAddPlaceOpen] = useState(false);

  const moveToSpecificLocation = (coordinates: number[]) => {
    const [lon1, lat1, lon2, lat2] = coordinates;

    cameraRef.current?.fitBounds([lon1, lat1], [lon2, lat2]);
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <Mapbox.MapView scaleBarEnabled={false} style={styles.map}>
        <Mapbox.Camera ref={cameraRef} />
      </Mapbox.MapView>

      <SearchAddress moveTo={moveToSpecificLocation} />
      <FabGroup
        isOpen={isOpenFAB}
        handleChange={(value) => setIsOpenFAB(value)}
        onAddPlace={() => setIsModalAddPlaceOpen(true)}
      />
      <ModalAddPlace
        visible={isModalAddPlaceOpen}
        hideModal={() => setIsModalAddPlaceOpen(false)}
        navigation={navigation}
      />
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
