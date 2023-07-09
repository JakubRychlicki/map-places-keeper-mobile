import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, StyleSheet, Text, View } from 'react-native';
import { MainNavigatorScreen } from '../../../navigation/MainNavigator';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useFormik } from 'formik';
import { RegisterForm, defaultValuesRegisterForm, registerFormValidationSchema } from './Register.utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Colors from '../../../constants/Colors';
import Input from '../../../components/controls/Input';
import * as actions from '../../../store/actions';

const RegisterScreen: MainNavigatorScreen<'RegisterScreen'> = ({ navigation, route }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { values, errors, dirty, setFieldValue, handleSubmit, setFieldError } = useFormik<RegisterForm>({
    initialValues: defaultValuesRegisterForm,
    onSubmit: (values) => {
      dispatch(actions.register({ username: values.username, email: values.email, password: values.password }));
    },
    validateOnChange: false,
    validationSchema: registerFormValidationSchema,
  });

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
      >
        <Text>{t('register:createAccount')}</Text>
        <Input
          id="username"
          value={values.username}
          error={errors.username}
          label={t('register:username')}
          onChange={setFieldValue}
          setFieldError={setFieldError}
          maxLength={255}
          required
        />

        <Input
          id="email"
          value={values.email}
          error={errors.email}
          label={t('register:email')}
          onChange={setFieldValue}
          setFieldError={setFieldError}
          maxLength={255}
          keyboardType="email-address"
          required
        />

        <Input
          id="password"
          value={values.password}
          error={errors.password}
          label={t('register:password')}
          onChange={setFieldValue}
          setFieldError={setFieldError}
          maxLength={255}
          isPassword
          required
        />

        <Input
          id="confirmPassword"
          value={values.confirmPassword}
          error={errors.confirmPassword}
          label={t('register:confirmPassword')}
          onChange={setFieldValue}
          setFieldError={setFieldError}
          maxLength={255}
          isPassword
          required
        />

        <Button title={t('register:submit')} onPress={handleSubmit} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
