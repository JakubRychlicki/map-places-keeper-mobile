import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { PointAnnotation } from '@rnmapbox/maps';
import { UserPlace } from '../../store/types/Map.model';
import MapPointSvg from '../../assets/svg/icons/MapPointSvg';

interface Props {
  data: UserPlace[];
}

const MapPoints: FC<Props> = ({ data }) => {
  const points = data.map((place) => {
    const coords = [place.attributes.longitude, place.attributes.latitude];
    return (
      <PointAnnotation key={place.id.toString()} id={place.id.toString()} coordinate={coords}>
        <View style={styles.icon}>
          <MapPointSvg />
        </View>
      </PointAnnotation>
    );
  });

  return <>{points}</>;
};

export default MapPoints;

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
});
