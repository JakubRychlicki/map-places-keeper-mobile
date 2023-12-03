import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, Text } from 'react-native';
import Colors from '../constants/Colors';
import Typography, { TypographyType } from './controls/Typography';

type TopbarProps = {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  title?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

const Topbar: React.FC<TopbarProps> = ({ leftIcon, rightIcon, title, containerStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.sideContainer}>{leftIcon}</View>
      {!!title && (
        <View style={styles.textContainer}>
          <Typography type={TypographyType.TextM} numberOfLines={1} style={styles.text}>
            {title}
          </Typography>
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
  rightSide: {
    alignItems: 'flex-end',
  },
  sideContainer: {
    width: 60,
  },
  text: {
    color: Colors.white,
  },
  textContainer: {
    flex: 1,
  },
});
