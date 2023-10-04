import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import { MainNavigatorScreen } from '../../../navigation/MainNavigator';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useFormik } from 'formik';
import { RegisterForm, defaultValuesRegisterForm, registerFormValidationSchema } from './Register.utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Colors from '../../../constants/Colors';
import Input from '../../../components/controls/Input';
import * as actions from '../../../store/actions';
import Typography, { TypographyType } from '../../../components/controls/Typography';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ScreenTopBar from '../../../components/ScreenTopBar';

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
      <ScreenTopBar />
      
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
      >
        <Typography type={TypographyType.BigHeaderR} style={styles.title}>
          {t('register:createAccount')}
        </Typography>

        <View style={styles.formInputs}>
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
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.haveAccountContainer}>
            <Typography type={TypographyType.TextM} style={styles.haveAccountText}>{t('register:haveAccount')}</Typography>
            <Typography type={TypographyType.TextM} style={styles.haveAccountButton} onPress={() => navigation.navigate('LoginScreen')}>{t('register:login')}</Typography>
          </View>
          <TouchableOpacity style={styles.signUpButton} onPress={handleSubmit}>
          <Typography type={TypographyType.TextM}>{t('register:submit')}</Typography>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      </SafeAreaView>
    
  );
};

export default RegisterScreen;

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
    marginBottom: 40,
  },
  haveAccountContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5
  },
  haveAccountText: {
    color: Colors.black,
  },
  haveAccountButton: {
    color: Colors.purple
  },
  signUpButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 20,
  }
});
