import React from 'react';
import { debounce } from 'ts-debounce';
import { TouchableOpacity, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import Colors from '../../constants/Colors';

type RoundButtonProps = {
  icon?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  pressWithDebounce?: boolean;
  disabled?: boolean;
  disabledWithOpacity?: boolean;
  type?: 'medium';
};

const RoundButton: React.FC<RoundButtonProps> = ({
  icon,
  containerStyle,
  onPress,
  pressWithDebounce,
  disabledWithOpacity,
  disabled,
  type = 'medium',
}) => {
  const press = pressWithDebounce && onPress ? debounce(onPress, 300) : onPress;

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[styles.container, styles[type], disabledWithOpacity && disabled && styles.opacity, containerStyle]}
      disabled={disabled}
      onPress={() => press?.()}
    >
      {icon}
    </TouchableOpacity>
  );
};

export default RoundButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.orange,
    borderRadius: 15,
    justifyContent: 'center',
  },
  medium: {
    height: 45,
    width: 45,
  },
  opacity: {
    opacity: 0.2,
  },
});