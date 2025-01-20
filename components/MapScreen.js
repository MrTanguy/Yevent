import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission refusée pour accéder à la localisation.');
        setIsLoading(false);
        return;
      }

      try {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch (error) {
        setErrorMsg('Erreur lors de la récupération de la localisation.');
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FFA500" />
        <Text style={styles.loaderText}>Chargement de la carte...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {location ? (
          <MapView
            style={styles.map}
            initialRegion={location}
            region={location}
            showsUserLocation={true}
            showsMyLocationButton={true}
          />
        ) : (
          <Text style={styles.errorText}>{errorMsg || 'Chargement...'}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '5%',
  },
  innerContainer: {
    width: '90%',
    height: '90%',
    borderWidth: 2,
    borderColor: '#FFA500',
    borderRadius: 20,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#FF0000',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#FFA500',
  },
});

export default MapScreen;
