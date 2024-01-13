import { useState } from 'react';
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
import FilterTab from '../../components/profile/FilterTab';

const ProfileScreen: ProfileNavigatorScreen<'MainProfile'> = ({ navigation }) => {
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.user);
  const { userPlaces } = useAppSelector((state) => state.map);
  const [activeCategoryID, setActiveCategoryID] = useState<number | null>(null);

  const openSettings = () => {
    navigation.navigate('Settings');
  };

  const changeCategory = (id: number | null) => {
    setActiveCategoryID(id);
  };

  const filterPlaces = userPlaces.data.filter((place) => {
    if (activeCategoryID === null) {
      return true;
    }

    return place.attributes.category.data.id === activeCategoryID;
  });

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScreenTopBar hideBackButton rightIcon={<RoundButton icon={<SettingsSvg />} onPress={openSettings} />} />
      <ProfileInfo username={user?.username || ''} numberOfUserPlaces={userPlaces.data.length} />
      <View style={styles.listHeader}>
        <Typography type={TypographyType.TextL} color={Colors.primary}>
          {t('screens:profile:myPlaces')}
        </Typography>
      </View>
      <FilterTab activeCategoryID={activeCategoryID} changeCategory={changeCategory} />
      <PlacesList places={filterPlaces} navigation={navigation} />
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
