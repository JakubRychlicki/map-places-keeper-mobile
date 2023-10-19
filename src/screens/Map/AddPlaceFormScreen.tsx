import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenTopBar from '../../components/ScreenTopBar';
import { MapNavigatorScreen } from '../../navigation/MapNavigator';
import { useFormik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Input from '../../components/controls/Input';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import * as actions from '../../store/actions';
import ImagePicker from 'react-native-image-crop-picker';
import { Feature, Point } from 'geojson';

export type PlaceForm = {
  address: string;
  name: string;
  desc: string;
};

const AddPlaceFormScreen: MapNavigatorScreen<'AddPlaceForm'> = ({ route }) => {
  const dispatch = useAppDispatch();
  const { address, coordinates } = route.params;
  const [image, setImage] = useState<any | null>(null);

  const defaultValuesLoginForm: PlaceForm = {
    address: address,
    name: '',
    desc: '',
  };

  const { values, errors, dirty, setFieldValue, handleSubmit, setFieldError } = useFormik<PlaceForm>({
    initialValues: defaultValuesLoginForm,
    onSubmit: (values) => {
      console.log(values);
    },
    validateOnChange: false,
  });

  const openCamera = async () => {
    // const result = await launchCamera({
    //   mediaType: 'photo',
    //   cameraType: 'back',
    //   quality: 0.9,
    //   presentationStyle: 'fullScreen',
    //   includeExtra: true,
    // });

    // if (result.assets) {
    //   const image = result.assets[0];
    //   console.log(image);
    //   const newImage = {
    //     uri: image.uri,
    //     type: image.type,
    //     name: image.fileName,
    //   };
    //   setImage(newImage);
    // }

    // ImagePicker.openPicker({
    //   width: 300,
    //   height: 400,
    // }).then(image => {
    //   console.log(image);
    // });

    try {
      const result = await ImagePicker.openCamera({
        width: 2000,
        height: 1500,
        cropping: true,
      });
      const newImage = {
        uri: result.path,
        type: result.mime,
        name: 'przyklad.jpg',
      };

      setImage(newImage);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const openGallery = async () => {
    // const result = await launchImageLibrary({
    //   mediaType: 'photo',
    //   quality: 0.9,
    //   includeExtra: true,
    // });
    // if (result.assets) {
    //   const image = result.assets[0];
    //   console.log(image);
    // }
  };

  const savePlace = () => {
    const feature: Feature<Point> = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [0, 0],
      },
      properties: null,
    };
    const newPlace = {
      place: {
        name: 'test',
        description: '',
        address: '',
        feature: feature,
      },
      file: image,
    };
    dispatch(actions.addPlace(newPlace));
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScreenTopBar />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
      >
        <View style={styles.inputsContainer}>
          <Input id="address" value={values.address} label={'Address'} />
          <Input id="name" value={values.name} label={'Name'} />
          <Input id="desc" value={values.desc} label={'Description'} multiline />
        </View>
        <View>
          <Button title="Camera" onPress={openCamera} />
          <Button title="Save" onPress={savePlace} />
        </View>
      </KeyboardAwareScrollView>
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
});
