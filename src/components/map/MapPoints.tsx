import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MarkerView  } from '@rnmapbox/maps';
import { UserPlace } from '../../store/types/Map.model';
import { SvgXml } from 'react-native-svg';

interface Props {
  data: UserPlace[];
  showPlace: (place: UserPlace) => void;
}

const MapPoints: FC<Props> = ({ data, showPlace }) => {
  const points = data.map((place) => {
    const { longitude, latitude, category } = place.attributes;
    const coords = [longitude, latitude];
    const icon = category.data.attributes.icon;

    return (
      <MarkerView key={place.id.toString()} id={place.id.toString()} coordinate={coords}>
        <TouchableOpacity activeOpacity={0.8} style={styles.icon} onPress={() => showPlace(place)}>
          <SvgXml xml={icon} />
        </TouchableOpacity>
      </MarkerView>
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
