import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

// THEME
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

interface Props {
  isOpen: boolean;
  handleChange: (value: boolean) => void;
  onAddPlace: () => void;
}

const FabGroup: FC<Props> = ({ isOpen, handleChange, onAddPlace }) => {
  return (
    <FAB.Group
      open={isOpen}
      visible
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
          label: 'Add place',
          labelStyle: styles.actionLabel,
          style: styles.actionContainer,
          onPress: onAddPlace,
        },
        {
          icon: 'select-marker',
          color: Colors.white,
          label: 'Select area',
          labelStyle: styles.actionLabel,
          style: styles.actionContainer,
          onPress: () => console.log('Pressed star'),
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
