import * as yup from 'yup';
import i18n from '../../../assets/translations';
import { FormikErrors } from 'formik';

export type RegisterForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const defaultValuesRegisterForm: RegisterForm = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const registerFormValidationSchema = yup.object({
  username: yup.string().min(3, i18n.t('error:invalidUsername')).required(i18n.t('errors:requiredField')),
  email: yup.string().email(i18n.t('errors:invalidEmail')).required(i18n.t('errors:requiredField')),
  password: yup.string().min(6, i18n.t('errors:invalidPassword')).required(i18n.t('errors:requiredField')),
  confirmPassword: yup
    .string()
    .min(6, i18n.t('errors:invalidPassword'))
    .oneOf([yup.ref('password')], i18n.t('errors:passwordsMustMatch'))
    .required(i18n.t('errors:requiredField')),
});

export const isSaveEnabled = (values: RegisterForm, errors: FormikErrors<RegisterForm>, isDirty: boolean) => {
  return !(
    !values.username ||
    !values.email ||
    !values.password ||
    !values.confirmPassword ||
    !!Object.values(errors).length ||
    !isDirty
  );
};
