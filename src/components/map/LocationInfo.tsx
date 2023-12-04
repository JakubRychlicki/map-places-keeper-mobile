import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

// THEME
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import Typography, { TypographyType } from '../controls/Typography';

interface Props {
  title: string;
  address: string;
  place: string;
  country: string;
}

const LocationInfo: FC<Props> = ({ title, address, place, country }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Typography type={TypographyType.TextM} style={styles.title}>
        {title}
      </Typography>
      <View style={[styles.content, { flexDirection: address ? 'column' : 'row' }]}>
        {address ? (
          <View style={styles.row}>
            <View style={styles.column}>
              <Typography type={TypographyType.SmallHeaderR}>{t('screens:addPlace:address')}</Typography>
              <Typography type={TypographyType.Text} color={Colors.secondary}>
                {address}
              </Typography>
            </View>
            <View style={styles.column}>
              <Typography type={TypographyType.SmallHeaderR}>{t('screens:addPlace:place')}</Typography>
              <Typography type={TypographyType.Text} color={Colors.secondary}>
                {place}
              </Typography>
            </View>
          </View>
        ) : (
          <View style={styles.column}>
            <Typography type={TypographyType.SmallHeaderR}>{t('screens:addPlace:place')}</Typography>
            <Typography type={TypographyType.Text} color={Colors.secondary}>
              {place}
            </Typography>
          </View>
        )}
        <View>
          <Typography type={TypographyType.SmallHeaderR}>{t('screens:addPlace:country')}</Typography>
          <Typography type={TypographyType.Text} color={Colors.secondary}>
            {country}
          </Typography>
        </View>
      </View>
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
    paddingVertical: 20,
  },
  content: {
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 20,
  },
  column: {
    width: '50%',
  },
});
