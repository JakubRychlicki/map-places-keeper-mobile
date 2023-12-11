import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { MapNavigatorScreen } from '../../../navigation/MapNavigator';
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppDispatch';
import * as actions from '../../../store/actions';
import { PlaceCategory } from '../../../store/types/Categories';
import { Photo } from '../../../store/types/Utils.model';
import { PlaceForm, defaultValuesPlaceForm, placeFormValidationSchema } from './AddPlaceFormScreen.utils';

// THEME
import Colors from '../../../constants/Colors';

// ASSETS
import PhotoSvg from '../../../assets/svg/icons/PhotoSvg';
import PlusSvg from '../../../assets/svg/icons/PlusSvg';

// COMPONENTS
import ScreenTopBar from '../../../components/ScreenTopBar';
import Input from '../../../components/controls/Input';
import Button from '../../../components/controls/Button';
import ModalPhotoPicker from '../../../components/map/ModalPhotoPicker';
import Typography from '../../../components/controls/Typography';
import ModalCategories from '../../../components/map/ModalCategories';

const AddPlaceFormScreen: MapNavigatorScreen<'AddPlaceForm'> = ({ route, navigation }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isAddPlaceLoading, categories } = useAppSelector((state) => state.map);
  const { location } = route.params;
  const [placeCategoryId, setPlaceCategoryId] = useState(1);
  const [isModalCategoriesOpen, setIsModalCategoriesOpen] = useState(false);
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [isModalPhotoPickerOpen, setIsModalPhotoPickerOpen] = useState(false);

  const activeNameCategory = categories.data.find((item) => item.id === placeCategoryId)?.attributes.name || 'General';

  const { values, errors, dirty, setFieldValue, handleSubmit, setFieldError } = useFormik<PlaceForm>({
    initialValues: defaultValuesPlaceForm,
    onSubmit: (values) => {
      const newPlace = {
        place: {
          name: values.name,
          description: values.desc,
          locality: location.place,
          street_address: location.address,
          country: location.country,
          category: placeCategoryId,
          longitude: location.coordinates[0],
          latitude: location.coordinates[1],
        },
        file: photo,
      };
      dispatch(actions.addPlace(newPlace));
      navigation.navigate('MainMap');
    },
    validateOnChange: false,
    validationSchema: placeFormValidationSchema,
  });

  const handlePhoto = (image: Photo) => {
    setPhoto(image);
  };

  const changeCategory = (place: PlaceCategory) => {
    setPlaceCategoryId(place.id);
  };

  useEffect(() => {
    if (categories.data.length > 0) {
      const generalCategory = categories.data.find((item) => item.attributes.name === 'General');
      if (generalCategory) setPlaceCategoryId(generalCategory.id);
    }
  }, []);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScreenTopBar title={t('screens:addPlace:form:title')} />

      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
      >
        <View style={styles.inputsContainer}>
          <Input
            id="name"
            value={values.name}
            error={errors.name}
            label={t('screens:addPlace:form:name')}
            onChange={setFieldValue}
            setFieldError={setFieldError}
            maxLength={255}
            required
          />
          <Input
            id="desc"
            value={values.desc}
            error={errors.desc}
            label={t('screens:addPlace:form:description')}
            onChange={setFieldValue}
            setFieldError={setFieldError}
            maxLength={255}
            multiline
          />
        </View>
        <View style={styles.categoryContainer}>
          <Typography style={styles.categoryLabel}>{t('screens:addPlace:form:description')}</Typography>
          <View style={styles.categoryInput}>
            <Typography style={styles.categoryInputText}>{activeNameCategory}</Typography>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.categoryChangeButton}
              onPress={() => setIsModalCategoriesOpen(true)}
            >
              <Typography color={Colors.primary}>{t('screens:addPlace:form:categoryChange')}</Typography>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.photoInputContainer}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.addPhotoButton}
            onPress={() => {
              if (!photo) {
                setIsModalPhotoPickerOpen(true);
              }
            }}
            onLongPress={() => {
              if (photo) {
                console.log('try remove photo');
              }
            }}
            delayLongPress={500}
          >
            {photo ? <Image source={{ uri: photo?.uri }} style={styles.addPhotoButtonPhoto} /> : <PhotoSvg />}
            {!photo && (
              <View style={[styles.addPhotoButtonIcon, styles.addPhotoButtonIconPlus]}>
                <PlusSvg stroke={Colors.primary} />
              </View>
            )}
          </TouchableOpacity>
        </View>

        <Button title={t('screens:addPlace:form:submit')} onPress={handleSubmit} loading={isAddPlaceLoading} />
      </KeyboardAwareScrollView>
      <ModalCategories
        visible={isModalCategoriesOpen}
        hideModal={() => setIsModalCategoriesOpen(false)}
        activeCategoryId={placeCategoryId}
        changeCategory={changeCategory}
      />
      <ModalPhotoPicker
        visible={isModalPhotoPickerOpen}
        hideModal={() => setIsModalPhotoPickerOpen(false)}
        handlePhoto={handlePhoto}
      />
    </SafeAreaView>
  );
};

export default AddPlaceFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  inputsContainer: {
    marginBottom: 20,
  },
  addPhotoButton: {
    position: 'relative',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
    overflow: 'hidden',
  },
  addPhotoButtonIcon: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
  },
  addPhotoButtonIconPlus: {
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
  },
  addPhotoButtonIconRemove: {
    backgroundColor: Colors.red,
    borderColor: Colors.red,
  },
  addPhotoButtonPhoto: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  photoInputContainer: {
    marginBottom: 20,
  },
  categoryContainer: {
    borderBottomColor: Colors.primary,
    borderBottomWidth: 2,
    marginBottom: 20,
  },
  categoryLabel: {
    marginBottom: 6,
    marginTop: 15,
  },
  categoryInput: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
  },
  categoryInputText: {
    fontSize: 16,
  },
  categoryChangeButton: {
    display: 'flex',
    justifyContent: 'center',
    height: 40,
    paddingHorizontal: 10,
  },
});
