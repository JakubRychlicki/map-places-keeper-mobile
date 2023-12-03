import React from 'react';
import { createStackNavigator, StackNavigationProp, TransitionPresets } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// SCREENS
import ProfileScreen from '../screens/Profile/ProfileScreen';
import PlaceDetails from '../screens/Profile/PlaceDetails';

export type ProfileNavigatorScreen<T extends keyof ProfileStackParamList> = React.FC<{
  navigation: StackNavigationProp<ProfileStackParamList, T>;
  route: RouteProp<ProfileStackParamList, T>;
}>;

export type ProfileStackParamList = {
  MainProfile: undefined;
  PlaceDetails: { id: number };
};

const ProfileStack = createStackNavigator<ProfileStackParamList>();

const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName="MainProfile"
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <ProfileStack.Screen name="MainProfile" component={ProfileScreen} />
      <ProfileStack.Screen name="PlaceDetails" component={PlaceDetails} />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigator;
