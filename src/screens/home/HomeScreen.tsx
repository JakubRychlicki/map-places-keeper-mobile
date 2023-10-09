import React, { useState, useRef } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Geolocation from '@react-native-community/geolocation';
import Mapbox, { Camera } from '@rnmapbox/maps';

// COMPONENTS
import SearchAddress from '../../components/map/SearchAddress';
import FabGroup from '../../components/map/FabGroup';
import ModalAddPlace from '../../components/map/ModalAddPlace';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

Geolocation.setRNConfiguration({ skipPermissionRequests: true, locationProvider: 'playServices' });

const HomeScreen = () => {
  const cameraRef = useRef<Camera | null>(null);
  const [isOpenFAB, setIsOpenFAB] = useState(false);
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const moveToSpecificLocation = (coordinates: number[]) => {
    const [lon1, lat1, lon2, lat2] = coordinates;

    cameraRef.current?.fitBounds([lon1, lat1], [lon2, lat2]);
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View>
        <View style={styles.mapContainer}>
          <Mapbox.MapView scaleBarEnabled={false} style={styles.map}>
            <Mapbox.Camera ref={cameraRef} />
          </Mapbox.MapView>
        </View>
        <SearchAddress moveTo={moveToSpecificLocation} />
        <FabGroup isOpen={isOpenFAB} handleChange={(value) => setIsOpenFAB(value)} onAddPlace={showModal} />
        <ModalAddPlace visible={visible} hideModal={hideModal} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapContainer: {
    height: heightScreen,
    width: widthScreen,
  },
  map: {
    flex: 1,
  },
});
