import React, { FC } from 'react';
import { FlatList, ListRenderItem, StyleSheet } from 'react-native';
import { useAppSelector } from '../../hooks/useAppDispatch';
import { UserPlace } from '../../store/types/Map.model';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileStackParamList } from '../../navigation/ProfileNavigator';

// COMPONENTS
import PlacesItem from './PlacesItem';

interface Props {
  navigation: StackNavigationProp<ProfileStackParamList, 'MainProfile'>;
}

const PlacesList: FC<Props> = ({ navigation }) => {
  const { userPlaces } = useAppSelector((state) => state.map);

  const renderItem: ListRenderItem<UserPlace> = ({ item }) => {
    const { name, locality, graphics } = item.attributes;
    const imageURL = graphics?.data.attributes.formats.medium.url || graphics?.data.attributes.url;

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
      data={userPlaces.data}
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
