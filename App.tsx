import { I18nextProvider } from 'react-i18next';
import MainNavigator from './src/navigation/MainNavigator';
import i18n from './src/assets/translations';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <MainNavigator />
    </I18nextProvider>
  );
}

export default App;
