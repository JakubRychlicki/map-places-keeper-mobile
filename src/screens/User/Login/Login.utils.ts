import * as yup from 'yup';
import i18n from '../../../assets/translations';
import { FormikErrors } from 'formik';

export type LoginForm = {
  email: string;
  password: string;
};

export const defaultValuesLoginForm: LoginForm = {
  email: '',
  password: '',
};

export const loginFormValidationSchema = yup.object({
  email: yup.string().email(i18n.t('errors:invalidEmail')).required(i18n.t('errors:requiredField')),
  password: yup.string().required(i18n.t('errors:requiredField')),
});

export const isSaveEnabled = (values: LoginForm, errors: FormikErrors<LoginForm>, isDirty: boolean) => {
  return !(!values.email || !values.password || !!Object.values(errors).length || !isDirty);
};
