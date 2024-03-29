import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

// THEME
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

interface Props {
  isOpen: boolean;
  onPress: () => void;
  handleChange: (value: boolean) => void;
  onAddPlace: () => void;
  onSelectArea: () => void;
  onFitToPlaces: () => void;
}

const FabGroup: FC<Props> = ({ isOpen, onPress, handleChange, onAddPlace, onSelectArea, onFitToPlaces }) => {
  const { t } = useTranslation();

  return (
    <FAB.Group
      open={isOpen}
      visible
      onPress={onPress}
      icon={isOpen ? 'arrow-down-thin' : 'arrow-up-thin'}
      backdropColor={Colors.backgroundTransparent}
      style={styles.container}
      fabStyle={styles.button}
      color={Colors.primary}
      rippleColor={Colors.secondary}
      actions={[
        {
          icon: 'plus',
          color: Colors.white,
          label: t('screens:mainMap:fab:addPlace'),
          labelStyle: styles.actionLabel,
          style: styles.actionContainer,
          onPress: onAddPlace,
        },
        {
          icon: 'select-marker',
          color: Colors.white,
          label: t('screens:mainMap:fab:spatialSearch'),
          labelStyle: styles.actionLabel,
          style: styles.actionContainer,
          onPress: onSelectArea,
        },
        {
          icon: 'fit-to-screen-outline',
          color: Colors.white,
          label: t('screens:mainMap:fab:fitToPlaces'),
          labelStyle: styles.actionLabel,
          style: styles.actionContainer,
          onPress: onFitToPlaces,
        },
      ]}
      onStateChange={({ open }) => handleChange(open)}
    />
  );
};

export default FabGroup;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  button: {
    backgroundColor: Colors.lightBlue,
    marginBottom: 20,
  },
  actionLabel: {
    fontFamily: Fonts.NunitoMedium,
    color: Colors.white,
  },
  actionContainer: {
    backgroundColor: Colors.border,
  },
});
