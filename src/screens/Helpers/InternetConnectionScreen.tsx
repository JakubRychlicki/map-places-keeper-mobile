import { View, StyleSheet, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';

// THEME
import Colors from '../../constants/Colors';

// ASSETS
import WifiErrorSvg from '../../assets/svg/icons/WifiErrorSvg';

// COMPONENTS
import Typography, { TypographyType } from '../../components/controls/Typography';

let widthDevice = Dimensions.get('window').width;
let heightDevice = Dimensions.get('window').height;

const InternetConnectionScreen = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.announcement}>
        <View style={styles.announcementIcon}>
          <WifiErrorSvg />
        </View>
        <Typography type={TypographyType.TextM} style={styles.announcementText}>
          {t('internet:noInternet')}
        </Typography>
      </View>
    </View>
  );
};

export default InternetConnectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    height: heightDevice,
    width: widthDevice,
    backgroundColor: Colors.backgroundTransparent,
    zIndex: 1000,
  },
  announcement: {
    position: 'absolute',
    width: widthDevice * 0.8,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  announcementIcon: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
  },
  announcementText: {
    textAlign: 'center',
  },
});
