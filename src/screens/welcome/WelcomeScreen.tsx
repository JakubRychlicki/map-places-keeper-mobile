import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MainNavigatorScreen } from '../../navigation/MainNavigator';
import { useTranslation } from 'react-i18next';

// Theme
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';

// Svg
import WorldDrawSvg from '../../assets/svg/graphics/WorldDrawSvg';
import Typography, { TypographyType } from '../../components/controls/Typography';

const WelcomeScreen: MainNavigatorScreen<'WelcomeScreen'> = ({ navigation, route }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.illustrationBox}>
        <WorldDrawSvg />
        <View style={styles.circle} />
      </View>
      <View style={styles.content}>
        <View>
          <Typography type={TypographyType.BigHeader} style={styles.title}>
            {t('welcomeScreen:title')}
          </Typography>
          <Typography type={TypographyType.Text} style={styles.desc}>
            {t('welcomeScreen:desc')}
          </Typography>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => navigation.navigate('RegisterScreen')}
            style={[styles.button, styles.buttonRegister]}
          >
            <Text style={styles.buttonText}>{t('buttons:register')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('LoginScreen')}
            style={[styles.button, styles.buttonSignIn]}
          >
            <Text style={styles.buttonText}>{t('buttons:login')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  illustrationBox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 350,
  },
  circle: {
    position: 'absolute',
    top: -350,
    width: 700,
    height: 700,
    borderRadius: 350,
    backgroundColor: '#FDA286',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  desc: {
    textAlign: 'center',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    borderColor: Colors.border,
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  button: {
    flex: 1,
    paddingVertical: 15,
  },
  buttonRegister: {
    backgroundColor: Colors.white,
  },
  buttonSignIn: {
    backgroundColor: Colors.lightGray,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: Fonts.RobotoRegular,
    color: Colors.black,
    textAlign: 'center',
  },
});