import React, { useRef } from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardTypeOptions,
  StyleProp,
  TextStyle,
  ViewStyle,
  Text,
} from 'react-native';

// THEME
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';

// COMPONENTS
import Typography from './Typography';

export type InputProps = {
  value?: string;
  label?: string;
  id: string;
  error?: string;
  multiline?: boolean;
  placeholder?: string;
  maxLength?: number;
  isPassword?: boolean;
  keyboardType?: KeyboardTypeOptions;
  required?: boolean;
  onChange?: (id: string, value: string | number) => void;
  setFieldError?: (id: string, value: any) => void;
  onBlur?: (e: any) => void;
  inputStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

const Input: React.FC<InputProps> = ({
  id,
  value,
  label,
  error,
  multiline,
  placeholder,
  maxLength,
  keyboardType,
  isPassword,
  required,
  inputStyle,
  style,
  containerStyle,
  children,
  onChange,
  onBlur,
  setFieldError,
}) => {
  const inputRef = useRef<TextInput>(null);

  const onChangeText = (v: string) => {
    onChange?.(id, v);
    setFieldError?.(id, undefined);
  };

  return (
    <View style={containerStyle}>
      {!!label && (
        <Typography style={styles.label}>
          {label} {required && <Text style={styles.asterisk}>*</Text>}
        </Typography>
      )}

      <View style={[styles.inputContainer, multiline && styles.mainMultiline]}>
        <TouchableOpacity
          style={[styles.mainContainer, multiline && styles.multilineInsideContainer, style]}
          activeOpacity={1}
          onPress={() => inputRef.current?.focus()}
        >
          <TextInput
            ref={inputRef}
            style={[styles.container, multiline && styles.multiline, inputStyle]}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            maxLength={maxLength}
            multiline={multiline}
            onBlur={onBlur}
            keyboardType={keyboardType}
            secureTextEntry={isPassword}
          />
        </TouchableOpacity>
        {children}
      </View>

      {!!error && (
        <View style={styles.errorText}>
          <Text>{error}</Text>
        </View>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  asterisk: {
    color: Colors.red,
  },
  charNumber: {
    position: 'absolute',
    right: 10,
    top: 150,
  },
  container: {
    alignItems: 'flex-start',
    color: Colors.primaryText,
    fontFamily: Fonts.RobotoRegular,
    flex: 1,
    fontSize: 16,
    height: 40,
    padding: 0,
    paddingRight: 10,
  },
  errorText: {
    color: Colors.red,
    marginBottom: 6,
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    height: 40,
  },
  label: {
    marginBottom: 6,
    marginTop: 15,
  },
  mainContainer: {
    flex: 1,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 2,
  },
  mainMultiline: {
    height: 100,
  },
  multiline: {
    height: 'auto',
    minHeight: 44,
    textAlignVertical: 'top',
  },
  multilineInsideContainer: {
    paddingVertical: 5,
  },
  warningIcon: {
    paddingTop: 3,
  },
});
