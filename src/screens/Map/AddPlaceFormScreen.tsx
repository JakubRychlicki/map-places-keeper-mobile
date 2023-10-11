import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenTopBar from '../../components/ScreenTopBar';

const AddPlaceFormScreen = () => {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScreenTopBar />
      <View>
        <Text>AddPlaceFormScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default AddPlaceFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
