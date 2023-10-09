import { View, Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { FC } from 'react';
import { Modal } from 'react-native-paper';
import Typography, { TypographyType } from '../controls/Typography';
import Button from '../controls/Button';

const widthScreen = Dimensions.get('window').width;

interface Props {
  visible: boolean;
  hideModal: () => void;
}

const ModalAddPlace: FC<Props> = ({ visible, hideModal }) => {
  return (
    <Modal visible={visible} onDismiss={hideModal} style={styles.container} contentContainerStyle={styles.content}>
      <Typography style={styles.title}>Choose how you want to add{'\n'} a place on the map?</Typography>
      <View style={styles.options}>
        <Button title="Device location" onPress={() => console.log('device')} />
        <Button title="Search for a place" onPress={() => console.log('search')} backgroundColor="#0096C7" />
        <Button title="Click on the map" onPress={() => console.log('map')} backgroundColor="#00B4D8" />
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
