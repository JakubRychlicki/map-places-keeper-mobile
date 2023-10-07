import { View, StyleSheet } from 'react-native'
import Mapbox from '@rnmapbox/maps';

const Map = () => {

  return (
    <View style={styles.container}>
        <Mapbox.MapView style={styles.container}>
            <Mapbox.UserLocation />
            <Mapbox.Camera followUserLocation followZoomLevel={16} />
        </Mapbox.MapView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
});

export default Map