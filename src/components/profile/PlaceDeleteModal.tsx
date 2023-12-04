import React, { FC } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Modal } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

// THEME
import Colors from '../../constants/Colors';

// COMPONENTS
import Typography, { TypographyType } from '../controls/Typography';
import Loader from '../controls/Loader';

const widthScreen = Dimensions.get('window').width;

interface Props {
  visible: boolean;
  isLoading: boolean;
  hideModal: () => void;
  deletePlace: () => void;
}

const PlaceDeleteModal: FC<Props> = ({ visible, isLoading, hideModal, deletePlace }) => {
  const { t } = useTranslation();

  return (
    <Modal visible={visible} onDismiss={hideModal} style={styles.container} contentContainerStyle={styles.content}>
      <Typography style={styles.title} type={TypographyType.MediumHeaderR}>
        {t('modals:deletePlace:title')}
      </Typography>
      <Typography style={styles.desc}>{t('modals:deletePlace:desc')}</Typography>
      <View style={styles.buttons}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <TouchableOpacity onPress={hideModal}>
              <Typography>{t('modals:deletePlace:options:cancel')}</Typography>
            </TouchableOpacity>
            <TouchableOpacity onPress={deletePlace}>
              <Typography color={Colors.red}>{t('modals:deletePlace:options:delete')}</Typography>
            </TouchableOpacity>
          </>
        )}
      </View>
    </Modal>
  );
};

export default PlaceDeleteModal;

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
    marginBottom: 10,
  },
  desc: {
    marginBottom: 20,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 20,
    paddingVertical: 10,
  },
});
