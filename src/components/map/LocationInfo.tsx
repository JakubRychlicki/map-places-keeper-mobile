import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

// THEME
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';

interface Props {
  address: string;
  place: string;
  country: string;
}

const LocationInfo: FC<Props> = ({ address, place, country }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('addPlace:locationInformation')}</Text>
      <View style={[styles.content, { flexDirection: address ? 'column' : 'row' }]}>
        {address ? (
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>{t('addPlace:address')}</Text>
              <Text style={styles.value}>{address}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>{t('addPlace:place')}</Text>
              <Text style={styles.value}>{place}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.column}>
            <Text style={styles.label}>{t('addPlace:place')}</Text>
            <Text style={styles.value}>{place}</Text>
          </View>
        )}
        <View>
          <Text style={styles.label}>{t('addPlace:country')}</Text>
          <Text style={styles.value}>{country}</Text>
        </View>
      </View>
      <View style={styles.bottomLine}></View>
    </View>
  );
};

export default LocationInfo;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  title: {
    fontFamily: Fonts.RobotoMedium,
    fontSize: 18,
    color: Colors.primaryText,
    paddingVertical: 20,
  },
  content: {
    paddingBottom: 30,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 20,
  },
  column: {
    width: '50%',
  },
  label: {
    fontFamily: Fonts.RobotoMedium,
    fontSize: 14,
    color: Colors.primaryText,
  },
  value: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 14,
    color: Colors.secondary,
  },
  bottomLine: {
    alignSelf: 'center',
    width: '100%',
    height: 1,
    backgroundColor: Colors.lightBlue,
  },
});
