import React from 'react';
import { createStackNavigator, StackNavigationProp, TransitionPresets } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { LocationDetails } from '../store/types/Map.model';

// THEME
import Colors from '../constants/Colors';

// SCREENS
import MainMapScreen from '../screens/Map/MainMapScreen';
import AddPlaceScreen from '../screens/Map/AddPlaceScreen';
import AddPlaceFormScreen from '../screens/Map/AddPlaceFormScreen/AddPlaceFormScreen';
import AddPlaceSearchScreen from '../screens/Map/AddPlaceSearchScreen';
import SpatialSearchScreen from '../screens/Map/SpatialSearchScreen';
import PlacesScreen from '../screens/Map/PlacesScreen';
import FoundPlaceDetails from '../screens/Map/FoundPlaceDetails';

export type MapNavigatorScreen<T extends keyof MapStackParamList> = React.FC<{
  navigation: StackNavigationProp<MapStackParamList, T>;
  route: RouteProp<MapStackParamList, T>;
}>;

export type MapStackParamList = {
  MainMap: undefined;
  AddPlace: { type: string };
  AddPlaceSearch: undefined;
  AddPlaceForm: { location: LocationDetails };
  SpatialSearch: undefined;
  Places: { area: number[][] };
  FoundPlaceDetails: { id: number };
};

const MapStack = createStackNavigator<MapStackParamList>();

const MapNavigator = () => {
  return (
    <MapStack.Navigator
      initialRouteName="MainMap"
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
        cardStyle: { backgroundColor: Colors.background },
      }}
    >
      <MapStack.Screen name="MainMap" component={MainMapScreen} />
      <MapStack.Screen name="AddPlace" component={AddPlaceScreen} />
      <MapStack.Screen name="AddPlaceSearch" component={AddPlaceSearchScreen} />
      <MapStack.Screen name="AddPlaceForm" component={AddPlaceFormScreen} />
      <MapStack.Screen name="SpatialSearch" component={SpatialSearchScreen} />
      <MapStack.Screen name="Places" component={PlacesScreen} />
      <MapStack.Screen name="FoundPlaceDetails" component={FoundPlaceDetails} />
    </MapStack.Navigator>
  );
};

export default MapNavigator;
