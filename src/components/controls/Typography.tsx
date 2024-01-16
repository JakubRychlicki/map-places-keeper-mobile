import React, { FC } from 'react';
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
  color?: string;
};

export enum TypographyType {
  Title = 'title',
  Text = 'text',
  TextM = 'textM',
  TextL = 'textL',
  SmallHeaderR = 'smallHeaderRoboto',
  MediumHeaderR = 'mediumHeaderRoboto',
  BigHeaderN = 'bigHeaderNunito',
  BigHeaderR = 'bigHeaderRoboto',
}

const Typography: FC<TypographyProps> = ({
  children,
  type = TypographyType.Text,
  style,
  numberOfLines,
  opacity,
  color,
  onPress,
}) => {
  return (
    <TextComponent
      style={[opacity && styles.opacity, { color: color || Colors.primaryText }, styles[type], style]}
      numberOfLines={numberOfLines}
      onPress={onPress}
    >
      {children}
    </TextComponent>
  );
};

export default Typography;

const styles = StyleSheet.create({
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
  textM: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 18,
  },
  textL: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 24,
  },
  bigHeaderNunito: {
    fontSize: 36,
    fontFamily: Fonts.NunitoSemiBold,
  },
  smallHeaderRoboto: {
    fontSize: 14,
    fontFamily: Fonts.RobotoMedium,
  },
  mediumHeaderRoboto: {
    fontSize: 18,
    fontFamily: Fonts.RobotoMedium,
  },
  bigHeaderRoboto: {
    fontSize: 36,
    fontFamily: Fonts.RobotoMedium,
  },
});
