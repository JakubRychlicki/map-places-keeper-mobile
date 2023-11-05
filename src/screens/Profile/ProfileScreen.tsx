import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileNavigatorScreen } from '../../navigation/ProfileNavigator';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import * as actions from '../../store/actions';

// THEME
import Colors from '../../constants/Colors';

// ASSETS
import LogoutSvg from '../../assets/svg/icons/LogoutSvg';

// COMPONENTS
import PlacesList from '../../components/profile/PlacesList';
import ScreenTopBar from '../../components/ScreenTopBar';
import RoundButton from '../../components/controls/RoundButton';
import ProfileInfo from '../../components/profile/ProfileInfo';
import Typography, { TypographyType } from '../../components/controls/Typography';

const ProfileScreen: ProfileNavigatorScreen<'MainProfile'> = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { userPlaces } = useAppSelector((state) => state.map);

  const logoutUser = () => {
    dispatch(actions.logout());
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScreenTopBar hideBackButton rightIcon={<RoundButton icon={<LogoutSvg />} onPress={logoutUser} />} />
      <ProfileInfo username={user?.username || ''} numberOfUserPlaces={userPlaces.data.length} />
      <View style={styles.listHeader}>
        <Typography type={TypographyType.TextL} color={Colors.primary}>
          {t('profile:myPlaces')}
        </Typography>
      </View>
      <PlacesList navigation={navigation} />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 100,
    paddingLeft: 20,
    paddingBottom: 10,
  },
});
