import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

// SCREENS
import HomeScreen from '../screens/home/HomeScreen';

export type MainNavigatorParamsList = {
  Home: undefined;
};

export type MainNavigatorScreen<T extends keyof MainNavigatorParamsList> = React.FC<{
  navigation: StackNavigationProp<MainNavigatorParamsList, T>;
}>;

const MainStack = createStackNavigator<MainNavigatorParamsList>();

const MainNavigator = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={HomeScreen} />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
