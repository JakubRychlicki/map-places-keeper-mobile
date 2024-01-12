import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileNavigatorScreen } from '../../navigation/ProfileNavigator';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../hooks/useAppDispatch';

// THEME
import Colors from '../../constants/Colors';

// ASSETS
import SettingsSvg from '../../assets/svg/icons/SettingsSvg';

// COMPONENTS
import PlacesList from '../../components/profile/PlacesList';
import ScreenTopBar from '../../components/ScreenTopBar';
import RoundButton from '../../components/controls/RoundButton';
import ProfileInfo from '../../components/profile/ProfileInfo';
import Typography, { TypographyType } from '../../components/controls/Typography';

const ProfileScreen: ProfileNavigatorScreen<'MainProfile'> = ({ navigation }) => {
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.user);
  const { userPlaces } = useAppSelector((state) => state.map);

  const openSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScreenTopBar hideBackButton rightIcon={<RoundButton icon={<SettingsSvg />} onPress={openSettings} />} />
      <ProfileInfo username={user?.username || ''} numberOfUserPlaces={userPlaces.data.length} />
      <View style={styles.listHeader}>
        <Typography type={TypographyType.TextL} color={Colors.primary}>
          {t('screens:profile:myPlaces')}
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
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 100,
    paddingLeft: 20,
    paddingBottom: 10,
  },
});
