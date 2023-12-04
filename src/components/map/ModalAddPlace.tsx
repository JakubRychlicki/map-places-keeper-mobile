import { View, Dimensions, StyleSheet } from 'react-native';
import { FC } from 'react';
import { Modal } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { MapStackParamList } from '../../navigation/MapNavigator';
import { useTranslation } from 'react-i18next';

// THEME
import Colors from '../../constants/Colors';

// CONPONENTS
import Typography from '../controls/Typography';
import Button from '../controls/Button';

const widthScreen = Dimensions.get('window').width;

interface Props {
  visible: boolean;
  hideModal: () => void;
  navigation: StackNavigationProp<MapStackParamList, 'MainMap'>;
}

const ModalAddPlace: FC<Props> = ({ visible, hideModal, navigation }) => {
  const { t } = useTranslation();

  return (
    <Modal visible={visible} onDismiss={hideModal} style={styles.container} contentContainerStyle={styles.content}>
      <Typography style={styles.title}>{t('modals:addPlace:desc')}</Typography>
      <View style={styles.options}>
        <Button
          title={t('modals:addPlace:options:device')}
          onPress={() => {
            navigation.navigate('AddPlace', { type: 'device_location' });
            hideModal();
          }}
        />
        <Button
          title={t('modals:addPlace:options:search')}
          onPress={() => {
            navigation.navigate('AddPlaceSearch');
            hideModal();
          }}
          backgroundColor={Colors.secondary}
        />
        <Button
          title={t('modals:addPlace:options:map')}
          onPress={() => {
            navigation.navigate('AddPlace', { type: 'press_on_the_map' });
            hideModal();
          }}
          backgroundColor={Colors.tertiary}
        />
      </View>
    </Modal>
  );
};

export default ModalAddPlace;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  content: {
    width: widthScreen * 0.8,
    backgroundColor: Colors.white,
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
});
