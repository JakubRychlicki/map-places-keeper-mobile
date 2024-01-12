import React, { FC } from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator, View } from 'react-native';

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
  icon?: React.ReactNode;
}

const Button: FC<Props> = ({ title, onPress, backgroundColor, loading, disabled, icon }) => {
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
        <View style={styles.content}>
          <Typography type={TypographyType.TextM} style={styles.text}>
            {title}
          </Typography>
          {icon && <View style={styles.icon}>{icon}</View>}
        </View>
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
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  text: {
    color: Colors.white,
  },
  disabled: {
    opacity: 0.6,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
