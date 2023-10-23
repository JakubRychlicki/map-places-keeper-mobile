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
  const { isLoginLoading } = useAppSelector((state) => state.user);

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
          {t('login:letsSignIn')}
        </Typography>

        <View style={styles.formInputs}>
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
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.haveAccountContainer}>
            <Typography type={TypographyType.TextM} style={styles.haveAccountText}>
              {t('login:dontHaveAccount')}
            </Typography>
            <Typography
              type={TypographyType.TextM}
              style={styles.haveAccountButton}
              onPress={() => navigation.navigate('RegisterScreen')}
            >
              {t('login:register')}
            </Typography>
          </View>
          <Button title={t('login:submit')} onPress={handleSubmit} loading={isLoginLoading} />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    color: Colors.black,
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
  haveAccountText: {
    color: Colors.black,
  },
  haveAccountButton: {
    color: Colors.secondary,
  },
  signInButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 20,
  },
});
