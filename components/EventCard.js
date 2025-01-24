import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import supabase from '../services/SupabaseService';

const EventCard = ({ title, address, dateTime, isJoined, eventId, userId, isExpired }) => {
  const [joined, setJoined] = useState(isJoined);
  const [showModal, setShowModal] = useState(false);
  const [numberOfSeats, setNumberOfSeats] = useState(1);

  const navigation = useNavigation(); // Utilisation de la navigation

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
      console.log('Erreur lors de l\'inscription:', error.message);
    } else {
      setJoined(true);
      setShowModal(false);
    }
  };

  const handleNavigateToDetails = () => {
    if (!isExpired) {
      navigation.navigate('EventDetail', {
        eventId,
        userId,
      });
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        isExpired && styles.expiredCard, // Style assombri si l'événement est expiré
      ]}
      onPress={handleNavigateToDetails}
      disabled={isExpired} // Désactive la carte si l'événement est expiré
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.address}>{address}</Text>
      <Text style={styles.dateTime}>{dateTime}</Text>

      {!isExpired && (
        <TouchableOpacity
          style={[styles.joinButton, joined && styles.joinedButton]}
          onPress={handleJoin}
          disabled={joined}
        >
          <Text style={styles.joinButtonText}>{joined ? 'Joined' : 'Join'}</Text>
        </TouchableOpacity>
      )}

      {isExpired && (
        <Text style={styles.expiredText}>Event Expired</Text>
      )}

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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  expiredCard: {
    backgroundColor: '#E0E0E0', // Fond grisé
    opacity: 0.7, // Assombrissement
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  address: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  dateTime: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  joinButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  joinedButton: {
    backgroundColor: '#46A74D',
  },
  joinButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  expiredText: {
    color: '#B0B0B0',
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 10,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
    height: 40,
  },
});

export default EventCard;
