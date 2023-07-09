import { I18nextProvider } from 'react-i18next';
import MainNavigator from './src/navigation/MainNavigator';
import i18n from './src/assets/translations';
import { MAPBOX_TOKEN } from '@env';
import Mapbox from '@rnmapbox/maps';

Mapbox.setAccessToken(MAPBOX_TOKEN);

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <MainNavigator />
    </I18nextProvider>
  );
}

export default App;
