import React, { useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { useInternetStatus } from '../hooks/useInternetStatus';
import * as actions from '../store/actions';
import Loader from '../components/controls/Loader';

// THEME
import Colors from '../constants/Colors';

// SCREENS
import WelcomeScreen from '../screens/Welcome/WelcomeScreen';
import RegisterScreen from '../screens/User/Register/RegisterScreen';
import LoginScreen from '../screens/User/Login/LoginScreen';
import InternetConnectionScreen from '../screens/Helpers/InternetConnectionScreen';

// NAVIGATORS
import RootNavigator from './RootNavigator';

export type MainNavigatorScreen<T extends keyof MainStackParamList> = React.FC<{
  navigation: StackNavigationProp<MainStackParamList, T>;
  route: RouteProp<MainStackParamList, T>;
}>;

export type MainStackParamList = {
  WelcomeScreen: undefined;
  RegisterScreen: undefined;
  LoginScreen: undefined;
  RootScreen: undefined;
};

const MainStack = createStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  const dispatch = useAppDispatch();
  const { token, isUserProfileLoading } = useAppSelector((state) => state.user);
  const isInternet = useInternetStatus();

  useEffect(() => {
    if (token) {
      dispatch(actions.getUserProfile());
    }
  }, [token]);

  if (isUserProfileLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaProvider style={styles.container}>
      {!isInternet ? <InternetConnectionScreen /> : null}
      <NavigationContainer>
        <MainStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {!token ? (
            <>
              <MainStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
              <MainStack.Screen name="RegisterScreen" component={RegisterScreen} />
              <MainStack.Screen name="LoginScreen" component={LoginScreen} />
            </>
          ) : (
            <MainStack.Screen name="RootScreen" component={RootNavigator} />
          )}
        </MainStack.Navigator>
      </NavigationContainer>

      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.background} />
    </SafeAreaProvider>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
});
