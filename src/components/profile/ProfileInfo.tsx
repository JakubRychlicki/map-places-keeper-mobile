import React, { FC } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';

// THEME
import Colors from '../../constants/Colors';

// ASSETS
import UserSvg from '../../assets/svg/icons/UserSvg';
import PlaceSvg from '../../assets/svg/icons/Place';

// COMPONENTS
import Typography, { TypographyType } from '../controls/Typography';

const { width } = Dimensions.get('window');

interface Props {
  username: string;
  numberOfUserPlaces: number;
}

const ProfileInfo: FC<Props> = ({ username, numberOfUserPlaces }) => {
  return (
    <View style={styles.container}>
      <View style={styles.mask} />
      <View style={styles.usernameBox}>
        <View style={styles.usernameIcon}>
          <UserSvg />
        </View>
        <Typography type={TypographyType.BigHeaderR} color={Colors.white} numberOfLines={1} style={styles.usernameText}>
          {username}
        </Typography>
      </View>
      <View style={styles.numberOfUserPlacesContainer}>
        <PlaceSvg />
        <Typography type={TypographyType.BigHeaderR} color={Colors.primary}>
          {numberOfUserPlaces}
        </Typography>
      </View>
    </View>
  );
};

export default ProfileInfo;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: width,
    height: 120,
    backgroundColor: Colors.primary,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  usernameBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Colors.border,
    borderBottomWidth: 2,
  },
  usernameText: {
    paddingBottom: 5,
  },
  usernameIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  numberOfUserPlacesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Colors.border,
    position: 'absolute',
    bottom: -25,
    right: 20,
  },
  mask: {
    position: 'absolute',
    bottom: -100,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: width,
    borderTopWidth: 100,
    borderLeftColor: 'transparent',
    borderTopColor: Colors.primary,
  },
});
