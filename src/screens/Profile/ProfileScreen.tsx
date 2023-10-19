import { View, Text } from 'react-native';
import { useAppSelector } from '../../hooks/useAppDispatch';

const ProfileScreen = () => {
  const { userPlaces } = useAppSelector((state) => state.map);
  console.log(userPlaces);

  return (
    <View>
      <Text>ProfileScreen</Text>
    </View>
  );
};

export default ProfileScreen;
