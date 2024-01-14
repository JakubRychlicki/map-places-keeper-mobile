import React, { FC } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';

// COMPONENTS
import Button from './Button';
import Typography, { TypographyType } from './Typography';

const widthScreen = Dimensions.get('window').width;

interface Props {
  visible: boolean;
  tryAgainFcn: () => void;
}

const ModalLocationWarning: FC<Props> = ({ visible, tryAgainFcn }) => {
  const { t } = useTranslation();

  return (
    <Modal
      isVisible={visible}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      useNativeDriverForBackdrop={true}
      style={styles.container}
    >
      <View style={styles.content}>
        <Typography type={TypographyType.MediumHeaderR} style={styles.title}>
          {t('errors:name')}
        </Typography>
        <Typography style={styles.desc}>{t('errors:failToGetLocation')}</Typography>

        <View style={styles.buttons}>
          <Button title={t('buttons:tryAgain')} onPress={tryAgainFcn} />
        </View>
      </View>
    </Modal>
  );
};

export default ModalLocationWarning;

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
  },
  desc: {
    textAlign: 'center',
    paddingVertical: 15,
  },
  buttons: {
    marginTop: 15,
  },
});
