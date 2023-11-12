import React, { FC } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

// THEME
import Colors from '../../constants/Colors';

interface Props {
  onPress: () => void;
  disabled?: boolean;
  active?: boolean;
  size: number;
  icon?: React.ReactNode;
}

const IconButton: FC<Props> = ({ onPress, disabled, active, size, icon }) => {
  const iconSize = size * 0.5;
  const borderRadius = iconSize;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { width: size, height: size, borderRadius },
        disabled && styles.disabled,
        active && styles.active,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={{ width: iconSize, height: iconSize }}>{icon}</View>
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    backgroundColor: Colors.white,
    borderColor: Colors.border,
  },
  disabled: {
    opacity: 0.3,
  },
  active: {
    backgroundColor: Colors.primary,
  },
});
