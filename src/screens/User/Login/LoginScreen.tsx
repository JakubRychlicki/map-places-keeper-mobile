import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, StyleSheet, Text, View } from 'react-native';
import { MainNavigatorScreen } from '../../../navigation/MainNavigator';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useFormik } from 'formik';
import { LoginForm, defaultValuesLoginForm, loginFormValidationSchema } from './Login.utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Colors from '../../../constants/Colors';
import Input from '../../../components/controls/Input';
import * as actions from '../../../store/actions';

const LoginScreen: MainNavigatorScreen<'LoginScreen'> = ({ navigation, route }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { values, errors, dirty, setFieldValue, handleSubmit, setFieldError } = useFormik<LoginForm>({
    initialValues: defaultValuesLoginForm,
    onSubmit: (values) => {
      dispatch(actions.login({ identifier: values.email, password: values.password }));
    },
    validateOnChange: false,
    validationSchema: loginFormValidationSchema,
  });

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
      >
        <Text>{t('login:logIn')}</Text>

        <Input
          id="email"
          value={values.email}
          error={errors.email}
          label={t('login:email')}
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
          label={t('login:password')}
          onChange={setFieldValue}
          setFieldError={setFieldError}
          maxLength={255}
          isPassword
          required
        />

        <Button title={t('login:submit')} onPress={handleSubmit} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
