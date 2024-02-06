import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTranslation } from 'react-i18next';
import { MainNavigatorScreen } from '../../../navigation/MainNavigator';
import { useFormik } from 'formik';
import { RegisterForm, defaultValuesRegisterForm, registerFormValidationSchema } from './Register.utils';
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppDispatch';
import * as actions from '../../../store/actions';

// THEME
import Colors from '../../../constants/Colors';

// COMPONENTS
import ScreenTopBar from '../../../components/ScreenTopBar';
import Button from '../../../components/controls/Button';
import Input from '../../../components/controls/Input';
import Typography, { TypographyType } from '../../../components/controls/Typography';

const RegisterScreen: MainNavigatorScreen<'RegisterScreen'> = ({ navigation, route }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isRegisterLoading, registerErrors } = useAppSelector((state) => state.user);

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
      <ScreenTopBar />

      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
      >
        <Typography type={TypographyType.BigHeaderR} style={styles.title}>
          {t('screens:register:createAccount')}
        </Typography>

        <View style={styles.formInputs}>
          <Input
            id="username"
            value={values.username}
            error={errors.username}
            label={t('screens:register:username')}
            onChange={setFieldValue}
            setFieldError={setFieldError}
            maxLength={255}
            required
          />

          <Input
            id="email"
            value={values.email}
            error={errors.email}
            label={t('screens:register:email')}
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
            label={t('screens:register:password')}
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
            label={t('screens:register:confirmPassword')}
            onChange={setFieldValue}
            setFieldError={setFieldError}
            maxLength={255}
            isPassword
            required
          />
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.haveAccountContainer}>
            <Typography type={TypographyType.TextM}>{t('screens:register:haveAccount')}</Typography>
            <Typography
              type={TypographyType.TextM}
              style={styles.haveAccountButton}
              onPress={() => navigation.navigate('LoginScreen')}
            >
              {t('screens:register:login')}
            </Typography>
          </View>
          <Button title={t('screens:register:submit')} onPress={handleSubmit} loading={isRegisterLoading} />
          {registerErrors?.length && (
            <View style={styles.registerErrorContainer}>
              <Typography color={Colors.red} style={styles.registerErrorText}>
                {t('errors:registerFailed')}
              </Typography>
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

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
    marginBottom: 40,
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
  registerErrorContainer: {
    paddingHorizontal: 20,
  },
  registerErrorText: {
    textAlign: 'center',
  },
});
