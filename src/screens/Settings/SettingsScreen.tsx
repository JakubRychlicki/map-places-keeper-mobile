import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileNavigatorScreen } from '../../navigation/ProfileNavigator';
import * as actions from '../../store/actions';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useTranslation } from 'react-i18next';

// THEME
import Colors from '../../constants/Colors';

// ASSETS
import LogoutSvg from '../../assets/svg/icons/LogoutSvg';
import PointSvg from '../../assets/svg/icons/PointSvg';

// COMPONENTS
import ScreenTopBar from '../../components/ScreenTopBar';
import Typography, { TypographyType } from '../../components/controls/Typography';
import Button from '../../components/controls/Button';

const SettingsScreen: ProfileNavigatorScreen<'Settings'> = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScreenTopBar />
      <ScrollView contentContainerStyle={styles.content}>
        <Typography type={TypographyType.BigHeaderR} color={Colors.primary} style={styles.heading}>
          {t('screens:settings:title')}
        </Typography>
        <View style={styles.settingsList}>
          <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('Languages')}>
            <View style={styles.settingPoint}>
              <PointSvg />
            </View>
            <Typography type={TypographyType.TextM}>{t('screens:settings:language:title')}</Typography>
          </TouchableOpacity>
        </View>
        <View style={styles.logoutContainer}>
          <Button
            title={t('screens:settings:logout')}
            icon={<LogoutSvg />}
            onPress={() => dispatch(actions.logout())}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  heading: {
    paddingVertical: 20,
    textAlign: 'center',
  },
  settingsList: {
    flexGrow: 1,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  settingPoint: {
    width: 24,
    height: 24,
  },
  logoutContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
});
