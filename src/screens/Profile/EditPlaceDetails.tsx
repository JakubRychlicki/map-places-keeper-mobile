import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ProfileNavigatorScreen } from '../../navigation/ProfileNavigator';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Photo } from '../../store/types/Utils.model';
import { useFormik } from 'formik';
import { PlaceForm, placeFormValidationSchema } from '../Map/AddPlaceFormScreen/AddPlaceFormScreen.utils';
import { PlaceCategory } from '../../store/types/Categories';

import { API_URL } from '@env';
import * as actions from '../../store/actions';

// THEME
import Colors from '../../constants/Colors';

// ASSETS
import PhotoSvg from '../../assets/svg/icons/PhotoSvg';
import PlusSvg from '../../assets/svg/icons/PlusSvg';
import PlaceholderImage from '../../assets/images/placeholder.jpg';

// COMPONENTS
import ScreenTopBar from '../../components/ScreenTopBar';
import Input from '../../components/controls/Input';
import Typography from '../../components/controls/Typography';
import Button from '../../components/controls/Button';
import ModalCategories from '../../components/map/ModalCategories';
import ModalPhotoPicker from '../../components/map/ModalPhotoPicker';

const EditPlaceDetails: ProfileNavigatorScreen<'EditPlaceDetails'> = ({ navigation, route }) => {
  const { place } = route.params;
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { categories, isUpdatePlaceLoading } = useAppSelector((state) => state.map);
  const [placeCategoryId, setPlaceCategoryId] = useState(place.attributes.category.data.id);
  const [isModalCategoriesOpen, setIsModalCategoriesOpen] = useState(false);
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [isModalPhotoPickerOpen, setIsModalPhotoPickerOpen] = useState(false);

  let imageURL = null;

  if (place.attributes.graphics.data !== null) {
    if (place.attributes.graphics.data.attributes.formats.medium?.url) {
      imageURL = place.attributes.graphics.data.attributes.formats.medium.url;
    } else {
      imageURL = place.attributes.graphics.data.attributes.url;
    }
  }

  const category = categories.data.find((item) => item.id === placeCategoryId);
  let activeNameCategory = category?.attributes.name || t('screens:addPlace:form:defaultCategory');

  if (i18n.language === 'pl') {
    if (category) {
      activeNameCategory = category.attributes.localizations.data.find((loc) => loc.attributes.locale === 'pl')
        ?.attributes.name as string;
    }
  }

  const { values, errors, dirty, setFieldValue, handleSubmit, setFieldError } = useFormik<PlaceForm>({
    initialValues: {
      name: place.attributes.name,
      desc: place.attributes.description,
    },
    onSubmit: (values) => {
      const newPlace = {
        placeID: place.id,
        place: {
          name: values.name,
          description: values.desc,
          category: placeCategoryId,
        },
        file: photo,
      };

      dispatch(actions.updatePlace(newPlace));
      navigation.goBack();
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
      <ScreenTopBar title={t('screens:editPlaceDetails:title')} />
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
          <Typography style={styles.categoryLabel}>{t('screens:addPlace:form:category')}</Typography>
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
          <View>
            <Typography style={styles.photoLabel}>{t('screens:editPlaceDetails:photo:old')}</Typography>
            <View style={styles.addPhotoButton}>
              {imageURL ? (
                <Image source={{ uri: `${API_URL}${imageURL}` }} style={styles.addPhotoButtonPhoto} />
              ) : (
                <Image source={PlaceholderImage} style={styles.addPhotoButtonPhoto} />
              )}
            </View>
          </View>
          <View>
            <Typography style={styles.photoLabel}>{t('screens:editPlaceDetails:photo:new')}</Typography>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.addPhotoButton}
              onPress={() => {
                if (!photo) {
                  setIsModalPhotoPickerOpen(true);
                }
              }}
            >
              {photo ? <Image source={{ uri: photo?.uri }} style={styles.addPhotoButtonPhoto} /> : <PhotoSvg />}
              {!photo && (
                <View style={[styles.addPhotoButtonIcon, styles.addPhotoButtonIconPlus]}>
                  <PlusSvg stroke={Colors.primary} />
                </View>
              )}
            </TouchableOpacity>
            {photo && (
              <TouchableOpacity style={styles.removePhotoButton} onPress={() => setPhoto(null)}>
                <Typography color={Colors.red}>{t('screens:addPlace:form:removePhoto')}</Typography>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <Button title={t('screens:editPlaceDetails:submit')} onPress={handleSubmit} loading={isUpdatePlaceLoading} />
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

export default EditPlaceDetails;

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
  photoLabel: {
    marginBottom: 10,
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
  addPhotoButtonPhoto: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  photoInputContainer: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 30,
  },
  removePhotoButton: {
    marginTop: 10,
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
