import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAppSelector } from '../hooks/useAppDispatch';
import { useInternetStatus } from '../hooks/useInternetStatus';

// THEME
import Colors from '../constants/Colors';

// SCREENS
import WelcomeScreen from '../screens/Welcome/WelcomeScreen';
import RegisterScreen from '../screens/User/Register/RegisterScreen';
import LoginScreen from '../screens/User/Login/LoginScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import InternetConnectionScreen from '../screens/Helpers/InternetConnectionScreen';

export type MainNavigatorScreen<T extends keyof MainStackParamList> = React.FC<{
  navigation: StackNavigationProp<MainStackParamList, T>;
  route: RouteProp<MainStackParamList, T>;
}>;

export type MainStackParamList = {
  WelcomeScreen: undefined;
  RegisterScreen: undefined;
  LoginScreen: undefined;
  RootScreen: undefined
};

const MainStack = createStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  const { token } = useAppSelector((state) => state.user);
  const isInternet = useInternetStatus();
  
  return (
    <SafeAreaProvider>
      {!isInternet ? (
        <InternetConnectionScreen />
      ) : null}
      <NavigationContainer>
        <MainStack.Navigator screenOptions={
          {
            headerShown: false
          }}>
          {!token ? (
            <>
              <MainStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
              <MainStack.Screen name="RegisterScreen" component={RegisterScreen} />
              <MainStack.Screen name="LoginScreen" component={LoginScreen} />
            </>
          ) : (
            <MainStack.Screen name="RootScreen" component={HomeScreen} />
          )}
        </MainStack.Navigator>
      </NavigationContainer>

      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.background} />
    </SafeAreaProvider>
  );
};

export default MainNavigator;
