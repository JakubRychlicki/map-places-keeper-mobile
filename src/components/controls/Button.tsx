import React, { FC } from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

// THEME
import Colors from '../../constants/Colors';

// COMPONENTS
import Typography, { TypographyType } from './Typography';

interface Props {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  loading?: boolean;
  disabled?: boolean;
}

const Button: FC<Props> = ({ title, onPress, backgroundColor, loading, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.container, disabled && styles.disabled, { backgroundColor: backgroundColor || Colors.primary }]}
      activeOpacity={0.6}
      onPress={onPress}
      disabled={disabled}
    >
      {loading ? (
        <ActivityIndicator size="small" color={Colors.white} />
      ) : (
        <Typography type={TypographyType.TextM} style={styles.text}>
          {title}
        </Typography>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  text: {
    color: Colors.white,
  },
  disabled: {
    opacity: 0.6,
  },
});
