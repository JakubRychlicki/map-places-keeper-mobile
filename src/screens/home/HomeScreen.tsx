import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import { MainNavigatorScreen } from '../../navigation/MainNavigator';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import * as actions from '../../store/actions';
import Mapbox from '@rnmapbox/maps';

const { width } = Dimensions.get('window');

const HomeScreen: MainNavigatorScreen<'HomeScreen'> = ({ navigation, route }) => {
  const dispatch = useAppDispatch();
  const { locations } = useAppSelector((state) => state.user);

  const signout = () => {
    dispatch(actions.logout());
  };

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <View style={styles.mapContainer}>
        <Mapbox.MapView style={styles.map} />
      </View>
      <Button title="sign out" onPress={signout} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    width: width,
    height: 300,
  },
  map: {
    flex: 1,
  },
});
