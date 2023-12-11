import { FC } from 'react';
import { View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Modal } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import { Photo } from '../../store/types/Utils.model';
import { useTranslation } from 'react-i18next';
import uuid from 'react-native-uuid';

// THEME
import Colors from '../../constants/Colors';

// ASSETS
import CameraSvg from '../../assets/svg/icons/CameraSvg';
import GallerySvg from '../../assets/svg/icons/GallerySvg';

// CONPONENTS
import Typography from '../controls/Typography';

const widthScreen = Dimensions.get('window').width;

interface Props {
  visible: boolean;
  hideModal: () => void;
  handlePhoto: (image: Photo) => void;
}

const ModalPhotoPicker: FC<Props> = ({ visible, hideModal, handlePhoto }) => {
  const { t } = useTranslation();

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
        name: uuid.v4() as string,
      };

      handlePhoto(newImage);
    } catch (error) {
      console.log('Error:', error);
      hideModal();
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
        name: uuid.v4() as string,
      };

      handlePhoto(newImage);
    } catch (error) {
      console.log('Error:', error);
      hideModal();
    }
  };

  return (
    <Modal visible={visible} onDismiss={hideModal} style={styles.container} contentContainerStyle={styles.content}>
      <Typography style={styles.title}>{t('modals:photoPicker:desc')}</Typography>
      <View style={styles.options}>
        <TouchableOpacity activeOpacity={0.6} style={styles.option} onPress={openCamera}>
          <View style={styles.icon}>
            <CameraSvg fill={Colors.primary} />
          </View>
          <Typography>{t('modals:photoPicker:options:camera')}</Typography>
        </TouchableOpacity>
        <Typography>{t('modals:photoPicker:or')}</Typography>
        <TouchableOpacity activeOpacity={0.6} style={styles.option} onPress={openGallery}>
          <View style={styles.icon}>
            <GallerySvg fill={Colors.primary} />
          </View>
          <Typography>{t('modals:photoPicker:options:gallery')}</Typography>
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 30,
  },
  option: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },
  icon: {
    width: 50,
    height: 50,
  },
});
