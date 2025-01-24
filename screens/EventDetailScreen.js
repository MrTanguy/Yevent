import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Platform,
  StatusBar,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import supabase from '../services/SupabaseService';
import { convertISOToReadableDate, getAddressFromCoordinates } from '../utils/convertion';
import SvgBackground from '../components/SvgBackground';

export const EventDetailScreen = ({ route }) => {
  const { eventId, userId } = route.params;

  const [eventData, setEventData] = useState(null);
  const [userEventInfo, setUserEventInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [numberOfSeats, setNumberOfSeats] = useState(1);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);

        const { data: event, error: eventError } = await supabase
          .getClient()
          .from('events')
          .select('*')
          .eq('id', eventId)
          .single();

        if (eventError) throw new Error(eventError.message);

        const { data: userEvent, error: userEventError } = await supabase
          .getClient()
          .from('users_events')
          .select('*')
          .eq('event_id', eventId)
          .eq('user_id', userId)
          .single();

        if (userEventError && userEventError.code !== 'PGRST116') throw new Error(userEventError.message);

        setEventData(event);
        setUserEventInfo(userEvent || null);
        setJoined(!!userEvent);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId, userId]);

  const handleJoin = () => {
    setShowModal(true);
  };

  const handleConfirmJoin = async () => {
    const { data, error } = await supabase
      .getClient()
      .from('users_events')
      .insert([
        {
          user_id: userId,
          event_id: eventId,
          nb: numberOfSeats,
        },
      ]);

    if (error) {
      console.log("Erreur lors de l'inscription:", error.message);
    } else {
      setJoined(true);
      setShowModal(false);
      setUserEventInfo({ nb: numberOfSeats });
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FBAE3C" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <SvgBackground />
      <View style={styles.content}>
        {eventData && (
          <>
            <Text style={styles.title}>{eventData.name}</Text>
            <Text style={styles.info}>
              Address: {getAddressFromCoordinates(eventData.lat, eventData.long)}
            </Text>
            <Text style={styles.info}>Date: {convertISOToReadableDate(eventData.timestamp)}</Text>
          </>
        )}

        {userEventInfo ? (
          <Text style={styles.info}>
            You have joined this event with {userEventInfo.nb} seat(s) reserved.
          </Text>
        ) : (
          <Text style={styles.info}>You have not joined this event yet.</Text>
        )}

        <TouchableOpacity
          style={[styles.joinButton, joined && styles.joinedButton]}
          onPress={handleJoin}
          disabled={joined}
        >
          <Text style={styles.joinButtonText}>{joined ? 'Joined' : 'Join'}</Text>
        </TouchableOpacity>

        {joined && userEventInfo && (
          <View style={styles.qrCodeContainer}>
            <Text style={styles.info}>Votre QR-code de réservation :</Text>
            <QRCode
              value={JSON.stringify({
                userId,
                eventId,
                nbSeats: userEventInfo.nb,
              })}
              size={150}
              backgroundColor="white"
              color="black"
            />
          </View>
        )}
      </View>

      {/* Modal pour sélectionner les places */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Number of Seats</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={String(numberOfSeats)}
              onChangeText={(text) => setNumberOfSeats(parseInt(text) || 1)}
            />
            <Button title="Confirm" onPress={handleConfirmJoin} />
            <Button title="Cancel" onPress={() => setShowModal(false)} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FBAE3C',
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  joinButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 20,
    elevation: 3, // Ombre sur Android
    shadowColor: '#000', // Ombre sur iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  joinedButton: {
    backgroundColor: '#46A74D',
  },
  joinButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  qrCodeContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#333333',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  qrCodeTitle: {
    fontSize: 18,
    color: '#FBAE3C',
    marginBottom: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    width: 300,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    height: 40,
    width: '100%',
    marginBottom: 15,
  },
});

