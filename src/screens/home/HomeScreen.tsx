import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { MainNavigatorScreen } from '../../navigation/MainNavigator';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import * as actions from '../../store/actions';

const HomeScreen: MainNavigatorScreen<'HomeScreen'> = ({ navigation, route }) => {
  const dispatch = useAppDispatch();
  const { locations } = useAppSelector((state) => state.user);

  const signout = () => {
    dispatch(actions.logout());
  };

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <Button title="sign out" onPress={signout} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
