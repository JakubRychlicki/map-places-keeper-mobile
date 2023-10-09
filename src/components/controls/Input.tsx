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
import Colors from '../../constants/Colors';

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
        <Text style={styles.label}>
          {label} {required && <Text style={styles.asterisk}>*</Text>}
        </Text>
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
            selectionColor={Colors.black}
            placeholder={placeholder}
            placeholderTextColor={'rgba(0,0,0,0.3)'}
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
    color: Colors.black,
    flex: 1,
    fontSize: 16,
    height: 50,
    padding: 0,
    paddingHorizontal: 10,
    borderColor: Colors.border,
    borderWidth: 2,
    borderRadius: 10,
  },
  errorText: {
    color: Colors.red,
    marginBottom: 6,
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    height: 50,
  },
  label: {
    marginBottom: 6,
    marginTop: 10,
    color: Colors.color1,
  },
  mainContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    flex: 1,
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
