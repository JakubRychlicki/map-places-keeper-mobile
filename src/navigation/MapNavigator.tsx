import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// SCREENS
import MainMapScreen from '../screens/Map/MainMapScreen';
import AddPlaceScreen from '../screens/Map/AddPlaceScreen';
import AddPlaceFormScreen from '../screens/Map/AddPlaceFormScreen';
import AddPlaceSearchScreen from '../screens/Map/AddPlaceSearchScreen';

export type MapNavigatorScreen<T extends keyof MapStackParamList> = React.FC<{
  navigation: StackNavigationProp<MapStackParamList, T>;
  route: RouteProp<MapStackParamList, T>;
}>;

export type MapStackParamList = {
  MainMap: undefined;
  AddPlace: { type: string };
  AddPlaceSearch: undefined;
  AddPlaceForm: undefined;
};

const MapStack = createStackNavigator<MapStackParamList>();

const MapNavigator = () => {
  return (
    <MapStack.Navigator
      initialRouteName="MainMap"
      screenOptions={{
        headerShown: false,
      }}
    >
      <MapStack.Screen name="MainMap" component={MainMapScreen} />
      <MapStack.Screen name="AddPlace" component={AddPlaceScreen} />
      <MapStack.Screen name="AddPlaceSearch" component={AddPlaceSearchScreen} />
      <MapStack.Screen name="AddPlaceForm" component={AddPlaceFormScreen} />
    </MapStack.Navigator>
  );
};

export default MapNavigator;
