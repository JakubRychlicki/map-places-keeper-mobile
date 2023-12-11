import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { PointAnnotation } from '@rnmapbox/maps';
import { UserPlace } from '../../store/types/Map.model';
import { SvgXml } from 'react-native-svg';

interface Props {
  data: UserPlace[];
}

const MapPoints: FC<Props> = ({ data }) => {
  const points = data.map((place) => {
    const { longitude, latitude, category } = place.attributes;
    const coords = [longitude, latitude];
    const icon = category.data.attributes.icon;

    return (
      <PointAnnotation key={place.id.toString()} id={place.id.toString()} coordinate={coords}>
        <View style={styles.icon}>
          <SvgXml xml={icon} />
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
