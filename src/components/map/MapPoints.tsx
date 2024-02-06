import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { MarkerView, PointAnnotation } from '@rnmapbox/maps';
import { UserPlace } from '../../store/types/Map.model';
import { SvgXml } from 'react-native-svg';

interface Props {
  data: UserPlace[];
  isInteractive?: boolean;
  showPlace?: (place: UserPlace) => void;
}

const MapPoints: FC<Props> = ({ data, isInteractive, showPlace }) => {
  const points = data.map((place) => {
    const { longitude, latitude, category } = place.attributes;
    const coords = [longitude, latitude];
    const icon = category.data.attributes.icon;

    const onPress = showPlace ? () => showPlace(place) : () => {};

    if (isInteractive) {
      return (
        <MarkerView key={place.id.toString()} id={place.id.toString()} coordinate={coords}>
          <TouchableOpacity activeOpacity={0.8} style={styles.icon} onPress={onPress}>
            <SvgXml xml={icon} />
          </TouchableOpacity>
        </MarkerView>
      );
    }

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
