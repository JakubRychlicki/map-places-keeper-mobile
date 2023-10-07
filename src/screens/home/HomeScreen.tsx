import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, PermissionsAndroid, Platform } from 'react-native';
import Geolocation, {GeolocationResponse} from '@react-native-community/geolocation';
import { SafeAreaView } from 'react-native-safe-area-context';

// COMPONENTS
import Map from '../../components/map/Map';
import ScreenTopBar from '../../components/ScreenTopBar';

const widthScreen = Dimensions.get('window').width;

Geolocation.setRNConfiguration({skipPermissionRequests: true, locationProvider: 'playServices'});

const HomeScreen = () => {
  const [position, setPosition] = useState<GeolocationResponse | null>(null);
  const [subscriptionId, setSubscriptionId] = useState<number | null>(null);

  const watchPosition = () => {
    try {
      const watchID = Geolocation.watchPosition(
        (position) => {
          setPosition(position);
        },
        (error) => console.log('WatchPosition Error')
      );
      setSubscriptionId(watchID);
    } catch (error) {
      console.log('WatchPosition Error');
    }
  };

  const clearWatch = () => {
    subscriptionId !== null && Geolocation.clearWatch(subscriptionId);
    setSubscriptionId(null);
    setPosition(null);
  };

  useEffect(() => {
    if(Platform.OS === 'android'){
      const requestLocationPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Device current location permission',
              message: 'Allow app to get your current location',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            watchPosition();
          } else {
            console.log('Location permission denied')
          }
        } catch (err) {
          console.log(err);
        }
      }

      requestLocationPermission();
    }

    return () => {
      clearWatch();
    };

  },[]);
  
  return (
      <SafeAreaView edges={['top']} style={styles.container}>
        <ScreenTopBar  />
        
        <View style={styles.mapContainer}>
          {/* <Map /> */}
        </View>
      </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  mapContainer: {
    width: widthScreen,
    height: 300,
  },
});
