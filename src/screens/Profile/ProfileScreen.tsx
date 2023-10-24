import { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import * as actions from '../../store/actions';

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const { userPlaces } = useAppSelector((state) => state.map);
  console.log(userPlaces);

  useEffect(() => {
    dispatch(actions.getUserPlaces());
  }, []);

  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button title="test" onPress={() => console.log(userPlaces)} />
    </View>
  );
};

export default ProfileScreen;
