import React, { FC } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Typography, { TypographyType } from './Typography';

interface Props {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
}

const Button: FC<Props> = ({ title, onPress, backgroundColor }) => {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: backgroundColor || '#0077B6' }]}
      activeOpacity={0.6}
      onPress={onPress}
    >
      <Typography type={TypographyType.TextM} style={styles.text}>
        {title}
      </Typography>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#48CAE4',
  },
  text: {
    color: '#fff',
  },
});
