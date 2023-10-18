import { View, Dimensions, StyleSheet } from 'react-native';
import { FC } from 'react';
import { Modal } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { MapStackParamList } from '../../navigation/MapNavigator';

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
  return (
    <Modal visible={visible} onDismiss={hideModal} style={styles.container} contentContainerStyle={styles.content}>
      <Typography style={styles.title}>Choose how you want to add{'\n'} a place on the map?</Typography>
      <View style={styles.options}>
        <Button
          title="Device location"
          onPress={() => {
            navigation.navigate('AddPlace', { type: 'device_location' });
            hideModal();
          }}
        />
        <Button
          title="Search for a place"
          onPress={() => {
            navigation.navigate('AddPlaceSearch');
            hideModal();
          }}
          backgroundColor="#0096C7"
        />
        <Button
          title="Click on the map"
          onPress={() => {
            navigation.navigate('AddPlace', { type: 'press_on_the_map' });
            hideModal();
          }}
          backgroundColor="#00B4D8"
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
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 30,
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
