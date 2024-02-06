import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTranslation } from 'react-i18next';
import { MainNavigatorScreen } from '../../../navigation/MainNavigator';
import { useFormik } from 'formik';
import { LoginForm, defaultValuesLoginForm, loginFormValidationSchema } from './Login.utils';
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppDispatch';
import * as actions from '../../../store/actions';

// THEME
import Colors from '../../../constants/Colors';

// COMPONENTS
import ScreenTopBar from '../../../components/ScreenTopBar';
import Button from '../../../components/controls/Button';
import Input from '../../../components/controls/Input';
import Typography, { TypographyType } from '../../../components/controls/Typography';

const LoginScreen: MainNavigatorScreen<'LoginScreen'> = ({ navigation, route }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isLoginLoading, loginErrors } = useAppSelector((state) => state.user);

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
      <ScreenTopBar />

      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
      >
        <Typography type={TypographyType.BigHeaderR} style={styles.title}>
          {t('screens:login:letsSignIn')}
        </Typography>

        <View style={styles.formInputs}>
          <Input
            id="email"
            value={values.email}
            error={errors.email}
            label={t('screens:login:email')}
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
            label={t('screens:login:password')}
            onChange={setFieldValue}
            setFieldError={setFieldError}
            maxLength={255}
            isPassword
            required
          />
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.haveAccountContainer}>
            <Typography type={TypographyType.TextM}>{t('screens:login:dontHaveAccount')}</Typography>
            <Typography
              type={TypographyType.TextM}
              style={styles.haveAccountButton}
              onPress={() => navigation.navigate('RegisterScreen')}
            >
              {t('screens:login:register')}
            </Typography>
          </View>
          <Button title={t('screens:login:submit')} onPress={handleSubmit} loading={isLoginLoading} />
          {loginErrors?.length && (
            <View style={styles.loginErrorContainer}>
              <Typography color={Colors.red} style={styles.loginErrorText}>
                {t('errors:loginFailed')}
              </Typography>
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    marginBottom: 30,
    marginTop: 40,
  },
  formInputs: {
    flexGrow: 1,
    marginBottom: 30,
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  haveAccountContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  haveAccountButton: {
    color: Colors.primary,
  },
  loginErrorContainer: {
    paddingHorizontal: 20,
  },
  loginErrorText: {
    textAlign: 'center',
  },
});
