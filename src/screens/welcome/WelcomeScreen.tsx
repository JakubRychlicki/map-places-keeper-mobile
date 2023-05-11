import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// Theme
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';

// Svg
import WorldDrawSvg from '../../assets/svg/graphics/WorldDrawSvg';

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.illustrationBox}>
        <WorldDrawSvg />
        <View style={styles.circle} />
      </View>
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>{'Keep your\n favorite places'}</Text>
          <Text style={styles.desc}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever.
          </Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={[styles.button, styles.buttonRegister]}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonSignIn]}>
            <Text style={styles.buttonText}>Sign In</Text>
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
    fontSize: 36,
    fontFamily: Fonts.NunitoMedium,
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 30,
  },
  desc: {
    fontSize: 14,
    fontFamily: Fonts.RobotoRegular,
    color: Colors.black,
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
