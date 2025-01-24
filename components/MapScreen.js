import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import supabase from '../services/SupabaseService'; // Assure-toi d'avoir configuré Supabase
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { getId } from '../services/LocalStorage';


const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [events, setEvents] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);

    useEffect(() => {
      const fetchUserId = async () => {
        try {
          const id = await getId();
          setUserId(id);
        } catch (err) {
          console.error('Erreur lors de la récupération de l\'ID utilisateur :', err);
        }
      };

      fetchUserId();
    }, []);

  const navigation = useNavigation();

  const fetchData = async () => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission refusée pour accéder à la localisation.');
        setIsLoading(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      const { data, error } = await supabase.getClient().from('events').select('*');
      if (error) {
        setErrorMsg('Erreur lors de la récupération des événements.');
      } else {
        setEvents(data);
      }
    } catch (error) {
      setErrorMsg('Erreur lors de la récupération de la localisation.');
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const handleCalloutPress = (eventId, userId) => {
    navigation.navigate('EventDetail', {
      eventId,
      userId,
    });
  };

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
          >
            {events.map((event, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: event.lat,
                  longitude: event.long,
                }}
                title={event.name}
                description={event.address}
                onCalloutPress={() => handleCalloutPress(event.id, userId)} // Redirection sur le clic du titre
              />
            ))}
          </MapView>
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
