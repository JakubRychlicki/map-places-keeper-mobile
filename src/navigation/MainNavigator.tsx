import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator, StackNavigationProp, TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { useInternetStatus } from '../hooks/useInternetStatus';
import * as actions from '../store/actions';
import { useTranslation } from 'react-i18next';
import { Storage } from '../services/Storage';

// THEME
import Colors from '../constants/Colors';

// SCREENS
import WelcomeScreen from '../screens/Welcome/WelcomeScreen';
import RegisterScreen from '../screens/User/Register/RegisterScreen';
import LoginScreen from '../screens/User/Login/LoginScreen';
import InternetConnectionScreen from '../screens/Helpers/InternetConnectionScreen';

// COMPONENTS
import Loader from '../components/controls/Loader';

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
  const { i18n } = useTranslation();
  const { token, isUserProfileLoading } = useAppSelector((state) => state.user);
  const { isUserPlacesLoading, isCategoriesLoading } = useAppSelector((state) => state.map);
  const isInternet = useInternetStatus();

  // Get language from async storage
  const getLanguage = async () => {
    try {
      const language = await Storage.getString('language');
      if (language) {
        i18n.changeLanguage(language);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getLanguage();
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(actions.getUserProfile());
      dispatch(actions.getPlacesCategories());
    }
  }, [token]);

  if (isUserProfileLoading && isUserPlacesLoading && isCategoriesLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaProvider style={styles.container}>
      {!isInternet ? <InternetConnectionScreen /> : null}
      <NavigationContainer>
        <MainStack.Navigator
          screenOptions={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS,
            cardStyle: { backgroundColor: Colors.background },
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
    </SafeAreaProvider>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.red,
  },
});
