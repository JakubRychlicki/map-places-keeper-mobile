import { View, StyleSheet } from 'react-native';
import Mapbox from '@rnmapbox/maps';
import { Feature, GeoJsonProperties, Geometry, Point } from 'geojson';
import { FC, useState } from 'react';

interface Props {
  addPlaceMode: boolean;
}

const Map: FC<Props> = ({ addPlaceMode }) => {
  const [currentLocation, setCurrentLocation] = useState<Point>();

  const addPoint = (feature: Feature<Geometry>) => {
    const [longitude, latitude] = (feature as Feature<Point>).geometry.coordinates;

    const _feature: Point = {
      type: 'Point',
      coordinates: (feature as Feature<Point>).geometry.coordinates,
    };

    setCurrentLocation(_feature);
  };

  return (
    <View style={styles.container}>
      <Mapbox.MapView
        style={styles.container}
        scaleBarEnabled={false}
        onPress={(_feature: Feature<Geometry, GeoJsonProperties>) => {
          if (addPlaceMode) {
            addPoint(_feature);
          }
        }}
      >
        {currentLocation ? (
          <Mapbox.PointAnnotation
            id="pointid"
            coordinate={currentLocation.coordinates}
            draggable
            onDragEnd={(feature) => setCurrentLocation(feature.geometry)}
          >
            <View style={styles.point} />
          </Mapbox.PointAnnotation>
        ) : null}
        {/* <Mapbox.UserLocation />
            <Mapbox.Camera followUserLocation followZoomLevel={16} /> */}
      </Mapbox.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  point: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'red',
  },
});

export default Map;
