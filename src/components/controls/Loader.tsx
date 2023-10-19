import React from 'react';
import { StyleSheet, View, ActivityIndicator, StyleProp, ViewStyle } from 'react-native';

// THEME
import Colors from '../../constants/Colors';

type LoaderProps = {
  backgroundColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

const Loader: React.FC<LoaderProps> = ({ backgroundColor, containerStyle }) => (
  <View style={[styles.container, { backgroundColor }, containerStyle]}>
    <ActivityIndicator size="small" color={Colors.primary} />
  </View>
);

export default Loader;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.background,
    flex: 1,
    justifyContent: 'center',
  },
});
