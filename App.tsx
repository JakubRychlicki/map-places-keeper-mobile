import { I18nextProvider } from 'react-i18next';
import MainNavigator from './src/navigation/MainNavigator';
import i18n from './src/assets/translations';
import { MAPBOX_TOKEN } from '@env';
import Mapbox from '@rnmapbox/maps';
import { injectStore } from './src/services/API';
import store from './src/store/configureStore';
import { StatusBar } from 'react-native';
import Colors from './src/constants/Colors';
import SplashScreen from 'react-native-splash-screen';
import { useEffect } from 'react';

Mapbox.setAccessToken(MAPBOX_TOKEN);

function App() {
  injectStore(store);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <MainNavigator />
    </I18nextProvider>
  );
}

export default App;
