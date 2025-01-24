import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert, ActivityIndicator } from 'react-native';
import SvgBackground from '../components/SvgBackground';
import TitleView from '../components/TitleView';
import EventCard from '../components/EventCard';
import EventCardContainer from '../components/EventCardContainer';
import supabase from '../services/SupabaseService';
import { useFocusEffect } from '@react-navigation/native';
import { getId } from '../services/LocalStorage';
import { convertISOToReadableDate, getAddressFromCoordinates } from '../utils/convertion';

export const EventsScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  // Récupérer l'ID utilisateur une fois au montage du composant
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await getId();
        setUserId(id);
      } catch (err) {
        console.error("Erreur lors de la récupération de l'ID utilisateur :", err);
      }
    };

    fetchUserId();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (!userId) return;

      const fetchEvents = async () => {
        try {
          setLoading(true);

          const { data, error } = await supabase
            .getClient()
            .from('events')
            .select('*, users_events(user_id)')
            .eq('users_events.user_id', userId);

          if (error) {
            Alert.alert('Erreur', error.message);
            return;
          }

          const updatedEvents = data.map((event) => ({
            ...event,
            isJoined: event.users_events && event.users_events.length > 0,
          }));

          setEvents(updatedEvents);
        } catch (err) {
          console.error("Erreur lors de la récupération des événements :", err);
          Alert.alert('Erreur', "Impossible de récupérer les événements.");
        } finally {
          setLoading(false);
        }
      };

      fetchEvents();
    }, [userId])
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <SvgBackground />
        <ActivityIndicator size="large" color="#FBAE3C" />
        <Text>Chargement des événements...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SvgBackground />
      <TitleView title="Events" />
      <EventCardContainer>
        {events.length > 0 ? (
          events.map((event, index) => (
            <EventCard
              key={index}
              title={event.name}
              address={getAddressFromCoordinates(event.lat, event.long)}
              dateTime={convertISOToReadableDate(event.timestamp)}
              isJoined={event.isJoined}
              eventId={event.id}
              userId={userId}
              isExpired={new Date(event.timestamp) < new Date()}
            />
          ))
        ) : (
          <View style={styles.noEventsContainer}>
            <Text style={styles.noEventsText}>Aucun événement trouvé.</Text>
          </View>
        )}
      </EventCardContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  noEventsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noEventsText: {
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
});
