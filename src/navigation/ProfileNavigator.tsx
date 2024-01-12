import React from 'react';
import { createStackNavigator, StackNavigationProp, TransitionPresets } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// THEME
import Colors from '../constants/Colors';

// SCREENS
import ProfileScreen from '../screens/Profile/ProfileScreen';
import PlaceDetails from '../screens/Profile/PlaceDetails';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import LanguagesScreen from '../screens/Settings/LanguagesScreen';

export type ProfileNavigatorScreen<T extends keyof ProfileStackParamList> = React.FC<{
  navigation: StackNavigationProp<ProfileStackParamList, T>;
  route: RouteProp<ProfileStackParamList, T>;
}>;

export type ProfileStackParamList = {
  MainProfile: undefined;
  PlaceDetails: { id: number };
  Settings: undefined;
  Languages: undefined;
};

const ProfileStack = createStackNavigator<ProfileStackParamList>();

const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName="MainProfile"
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
        cardStyle: { backgroundColor: Colors.background },
      }}
    >
      <ProfileStack.Screen name="MainProfile" component={ProfileScreen} />
      <ProfileStack.Screen name="PlaceDetails" component={PlaceDetails} />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} />
      <ProfileStack.Screen name="Languages" component={LanguagesScreen} />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigator;
