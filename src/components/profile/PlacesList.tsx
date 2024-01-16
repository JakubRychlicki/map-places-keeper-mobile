import React, { FC } from 'react';
import { FlatList, ListRenderItem, StyleSheet } from 'react-native';
import { UserPlace } from '../../store/types/Map.model';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileStackParamList } from '../../navigation/ProfileNavigator';

// COMPONENTS
import PlacesItem from './PlacesItem';

interface Props {
  places: UserPlace[];
  navigation: StackNavigationProp<ProfileStackParamList, 'MainProfile'>;
}

const PlacesList: FC<Props> = ({ navigation, places }) => {
  const renderItem: ListRenderItem<UserPlace> = ({ item }) => {
    const { name, locality, graphics } = item.attributes;
    let imageURL = null;

    if (graphics.data !== null) {
      if (graphics.data.attributes.formats.medium?.url) {
        imageURL = graphics.data.attributes.formats.medium.url;
      } else {
        imageURL = graphics.data.attributes.url;
      }
    }

    return (
      <PlacesItem
        name={name}
        locality={locality}
        imageURL={imageURL}
        onPress={() => navigation.navigate('PlaceDetails', { id: item.id })}
      />
    );
  };

  return (
    <FlatList
      data={places}
      keyExtractor={(place) => place.id.toString()}
      numColumns={2}
      columnWrapperStyle={styles.row}
      renderItem={renderItem}
    />
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    columnGap: 30,
    marginHorizontal: 20,
  },
});
