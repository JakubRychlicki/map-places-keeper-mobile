import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileNavigatorScreen } from '../../navigation/ProfileNavigator';
import { useAppSelector } from '../../hooks/useAppDispatch';
import Loader from '../../components/controls/Loader';
import ScreenTopBar from '../../components/ScreenTopBar';

const PlaceDetails: ProfileNavigatorScreen<'PlaceDetails'> = ({ route }) => {
  const { id } = route.params;
  const { userPlaces } = useAppSelector((state) => state.map);
  const currentPlace = userPlaces.data.find((place) => place.id === id);

  if (!currentPlace) {
    return <Loader />;
  }

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScreenTopBar />
      <View>
        <Text>{currentPlace.attributes.name}</Text>
      </View>
    </SafeAreaView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
