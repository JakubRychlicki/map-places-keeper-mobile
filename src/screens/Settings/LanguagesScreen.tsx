import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { ProfileNavigatorScreen } from '../../navigation/ProfileNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

// THEME
import Colors from '../../constants/Colors';

// ASSETS
import PolishFlagSvg from '../../assets/svg/icons/PolishFlagSvg';
import EnglishFlagSvg from '../../assets/svg/icons/EnglishFlagSvg';

// COMPONENTS
import ScreenTopBar from '../../components/ScreenTopBar';
import Typography, { TypographyType } from '../../components/controls/Typography';
import { Storage } from '../../services/Storage';

const LanguagesScreen: ProfileNavigatorScreen<'Languages'> = () => {
  const { t, i18n } = useTranslation();
  const [activeLanguage, setActiveLanguage] = useState('');

  // Settings Values
  const languages: any[] = [
    { label: t('screens:settings:language:english'), value: 'en', icon: <EnglishFlagSvg /> },
    { label: t('screens:settings:language:polish'), value: 'pl', icon: <PolishFlagSvg /> },
  ];

  const onChangeLanguage = async (value: string) => {
    try {
      await Storage.set('language', value);
      i18n.changeLanguage(value);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const language = languages.find((language) => language.value === i18n.language)?.label;
    if (language) {
      setActiveLanguage(language);
    }
  }, [i18n.language]);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScreenTopBar title={t('screens:settings:language:change')} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.languagesList}>
          {languages?.map((item, index) => (
            <TouchableOpacity
              activeOpacity={0.6}
              key={index}
              style={[
                styles.languageItem,
                { backgroundColor: activeLanguage === item.label ? Colors.primary : Colors.white },
              ]}
              onPress={() => onChangeLanguage(item.value)}
            >
              <Typography
                type={TypographyType.TextM}
                style={{ color: activeLanguage === item.label ? Colors.white : Colors.primaryText }}
              >
                {item.label}
              </Typography>
              {item.icon}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LanguagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  languagesList: {
    gap: 15,
    paddingHorizontal: 20,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
});
