import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

// SCREENS
import WelcomeScreen from '../screens/welcome/WelcomeScreen';

export type MainNavigatorParamsList = {
  Welcome: undefined;
};

export type MainNavigatorScreen<T extends keyof MainNavigatorParamsList> = React.FC<{
  navigation: StackNavigationProp<MainNavigatorParamsList, T>;
}>;

const MainStack = createStackNavigator<MainNavigatorParamsList>();

const MainNavigator = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Welcome" component={WelcomeScreen} />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
