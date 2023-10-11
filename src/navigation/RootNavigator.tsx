import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

// THEME
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

// ICONS
import MapSvg from '../assets/svg/icons/MapSvg';
import ProfileSvg from '../assets/svg/icons/ProfileSvg';

// SCREENS
import ProfileScreen from '../screens/Profile/ProfileScreen';

// NAVIGATORS
import MapNavigator from './MapNavigator';

export type RootNavigatorParamsList = {
  Map: undefined;
  Profile: undefined;
};

export type RootNavigatorScreen<T extends keyof RootNavigatorParamsList> = React.FC<{
  navigation: BottomTabNavigationProp<RootNavigatorParamsList, T>;
}>;

const BottomTab = createBottomTabNavigator<RootNavigatorParamsList>();

const RootNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Map"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.inactive,
        tabBarLabelStyle: styles.bottomTabLabel,
      }}
    >
      <BottomTab.Screen
        name="Map"
        component={MapNavigator}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View style={{ width: size, height: size }}>
              <MapSvg color={color} />
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View style={{ width: size, height: size }}>
              <ProfileSvg color={color} />
            </View>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({
  bottomTabLabel: {
    fontFamily: Fonts.RobotoMedium,
  },
});
