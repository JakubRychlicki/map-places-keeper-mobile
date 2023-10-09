import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, Text } from 'react-native';
import Colors from '../constants/Colors';

type TopbarProps = {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  title?: string;
  description?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

const Topbar: React.FC<TopbarProps> = ({ leftIcon, rightIcon, title, description, containerStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.sideContainer}>{leftIcon}</View>
      {!!title && (
        <View style={styles.textContainer}>
          <Text style={styles.text}>{title}</Text>
        </View>
      )}
      <View style={[styles.sideContainer, styles.rightSide]}>{rightIcon}</View>
    </View>
  );
};

export default Topbar;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: Colors.primary,
  },
  description: {
    marginTop: 3,
    textAlign: 'center',
  },
  rightSide: {
    alignItems: 'flex-end',
  },
  sideContainer: {
    width: 70,
  },
  text: {
    textAlign: 'center',
  },
  textContainer: {
    flex: 1,
  },
});
