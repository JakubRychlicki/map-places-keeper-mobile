import React from 'react';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import { StyleProp, StyleSheet, Text as TextComponent, TextStyle } from 'react-native';

type TypographyProps = {
  type?: TypographyType;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  children?: React.ReactNode;
  onPress?: () => void;
  opacity?: boolean;
};

export enum TypographyType {
  Title = 'title',
  Text = 'text',
  BigHeader = 'bigHeader',
}

const Typography: React.FC<TypographyProps> = ({
  children,
  type = TypographyType.Text,
  style,
  numberOfLines,
  opacity,
  onPress,
}) => {
  return (
    <TextComponent
      style={[styles.mainText, opacity && styles.opacity, styles[type], style]}
      numberOfLines={numberOfLines}
      onPress={onPress}
    >
      {children}
    </TextComponent>
  );
};

export default Typography;

const styles = StyleSheet.create({
  mainText: {
    color: Colors.text,
  },
  opacity: {
    opacity: 0.5,
  },
  title: {
    fontFamily: Fonts.NunitoMedium,
    fontSize: 14,
  },
  text: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 14,
  },
  bigHeader: {
    fontSize: 36,
    fontFamily: Fonts.NunitoSemiBold,
  },
});
