import React, { FC } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Button from './Button';
import { Modal } from 'react-native-paper';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import { useTranslation } from 'react-i18next';

const widthScreen = Dimensions.get('window').width;

interface Props {
  visible: boolean;
  tryAgainFcn: () => void;
}

const ModalLocationWarning: FC<Props> = ({ visible, tryAgainFcn }) => {
  const { t } = useTranslation();

  return (
    <Modal visible={visible} style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t('errors:name')}</Text>
      <Text style={styles.desc}>{t('errors:failToGetLocation')}</Text>

      <View style={styles.buttons}>
        <Button title={t('buttons:tryAgain')} onPress={tryAgainFcn} />
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
    fontFamily: Fonts.RobotoMedium,
    fontSize: 20,
    textAlign: 'center',
    color: Colors.black,
  },
  desc: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 14,
    textAlign: 'center',
    color: Colors.black,
    paddingVertical: 15,
  },
  buttons: {
    marginTop: 15,
  },
});
