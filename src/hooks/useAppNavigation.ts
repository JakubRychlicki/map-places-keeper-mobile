import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../navigation/MainNavigator';

type NavigationProps = StackNavigationProp<MainStackParamList>;

export const useAppNavigation = () => useNavigation<NavigationProps>();