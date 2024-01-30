import React, { FC } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { UserPlace } from '../../store/types/Map.model';
import { StackNavigationProp } from '@react-navigation/stack';
import { MapStackParamList } from '../../navigation/MapNavigator';
import { useTranslation } from 'react-i18next';
import * as Animatable from 'react-native-animatable';

// THEME
import Colors from '../../constants/Colors';

// ICONS
import CloseSvg from '../../assets/svg/icons/CloseSvg';

// COMPONENTS
import Typography, { TypographyType } from '../controls/Typography';

interface Props {
  place: UserPlace;
  hideModal: () => void;
  navigation: StackNavigationProp<MapStackParamList, 'MainMap'>;
}

const { width } = Dimensions.get('window');

const ModalPlaceInfo: FC<Props> = ({ place, navigation, hideModal }) => {
  const { t } = useTranslation();
  const { name, locality } = place.attributes;

  return (
    <Animatable.View animation="fadeInUp" style={styles.container}>
      <View style={styles.titleContainer}>
        <Typography type={TypographyType.SmallHeaderR} color={Colors.primary} numberOfLines={1}>
          {name}
        </Typography>
        <Typography color={Colors.secondary} numberOfLines={1}>
          {locality}
        </Typography>
      </View>
      <View style={styles.options}>
        <TouchableOpacity onPress={hideModal} style={styles.closeButton}>
          <View style={styles.closeButtonIcon}>
            <CloseSvg stroke={Colors.primary} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('FoundPlaceDetails', { id: place.id })}
          style={styles.detailsButton}
        >
          <Typography type={TypographyType.Title} color={Colors.white}>
            {t('modals:placeInfo:details')}
          </Typography>
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );
};

export default ModalPlaceInfo;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    bottom: 20,
    width: width * 0.6,
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  titleContainer: {
    paddingBottom: 20,
  },
  options: {
    flexDirection: 'row',
    gap: 10,
  },
  closeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
    padding: 10,
    borderRadius: 20,
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  closeButtonIcon: {
    width: 25,
    height: 25,
  },
  detailsButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },
});
