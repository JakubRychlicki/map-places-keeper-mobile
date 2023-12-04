import React, { FC } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

// THEME
import Colors from '../../constants/Colors';

// ICONS
import CloseSvg from '../../assets/svg/icons/CloseSvg';

// COMPONENTS
import Typography, { TypographyType } from '../controls/Typography';

interface Props {
  features: any[];
  removePoint: (feature: any) => void;
}

const PointsControl: FC<Props> = ({ features, removePoint }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Typography type={TypographyType.SmallHeaderR}>
        {t('screens:spatialSearch:createdPoints', { value: features.length, max: 6 })}
      </Typography>
      <View style={styles.pointsList}>
        {features.length === 0 && <Typography type={TypographyType.Text}>{t('screens:spatialSearch:hint')}</Typography>}
        {features.map((f, i) => (
          <TouchableOpacity
            key={f.id}
            activeOpacity={0.6}
            onPress={() => {
              if (f.isRemoveMode) {
                removePoint(f);
              }
            }}
            style={styles.pointBox}
          >
            <View style={[styles.point, { backgroundColor: f.color }]}>
              {f.isRemoveMode ? (
                <View style={styles.pointRemoveIcon}>
                  <CloseSvg stroke={Colors.white} />
                </View>
              ) : (
                <Typography type={TypographyType.SmallHeaderR} color={Colors.white}>
                  {++i}
                </Typography>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default PointsControl;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  pointsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    height: 50,
    marginTop: 10,
  },
  pointBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.primary,
  },
  point: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.black,
    borderWidth: 1,
  },
  pointRemoveIcon: {
    width: 15,
    height: 15,
  },
});
