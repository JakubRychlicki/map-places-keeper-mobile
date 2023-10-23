import * as yup from 'yup';
import i18n from '../../../assets/translations';
import { FormikErrors } from 'formik';

export type PlaceForm = {
  name: string;
  desc: string;
};

export const defaultValuesPlaceForm: PlaceForm = {
  name: '',
  desc: '',
};

export const placeFormValidationSchema = yup.object({
  name: yup.string().required(i18n.t('errors:requiredField')),
  desc: yup.string(),
});

export const isSaveEnabled = (values: PlaceForm, errors: FormikErrors<PlaceForm>, isDirty: boolean) => {
  return !(!values.name || !!Object.values(errors).length || !isDirty);
};
