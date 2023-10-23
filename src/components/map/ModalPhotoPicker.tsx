import { FC } from 'react';
import { View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Modal } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';

// ICONS
import CameraSvg from '../../assets/svg/icons/CameraSvg';
import GallerySvg from '../../assets/svg/icons/GallerySvg';

// CONPONENTS
import Typography from '../controls/Typography';
import { Photo } from '../../store/types/Utils.model';

const widthScreen = Dimensions.get('window').width;

interface Props {
  visible: boolean;
  hideModal: () => void;
  handlePhoto: (image: Photo) => void;
}

const ModalPhotoPicker: FC<Props> = ({ visible, hideModal, handlePhoto }) => {
  const openCamera = async () => {
    try {
      const result = await ImagePicker.openCamera({
        width: 2000,
        height: 1500,
        cropping: true,
        mediaType: 'photo',
      });
      const newImage = {
        uri: result.path,
        type: result.mime,
        name: 'przyklad.jpg',
      };

      handlePhoto(newImage);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const openGallery = async () => {
    try {
      const result = await ImagePicker.openPicker({
        width: 2000,
        height: 1500,
        cropping: true,
        maxFiles: 1,
        mediaType: 'photo',
      });
      const newImage = {
        uri: result.path,
        type: result.mime,
        name: 'przyklad.jpg',
      };

      handlePhoto(newImage);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <Modal visible={visible} onDismiss={hideModal} style={styles.container} contentContainerStyle={styles.content}>
      <Typography style={styles.title}>Add photo with</Typography>
      <View style={styles.options}>
        <TouchableOpacity onPress={openCamera}>
          <View style={styles.icon}>
            <CameraSvg />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={openGallery}>
          <View style={styles.icon}>
            <GallerySvg />
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ModalPhotoPicker;

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
  icon: {
    width: 40,
    height: 40,
  },
});
