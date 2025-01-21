import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const EventCard = ({ title, address, dateTime, onJoin, isJoined }) => {
  const [joined, setJoined] = useState(false);

  const handleJoin = () => {
    setJoined(true);
    onJoin();
  };

  return (
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.address}>{address}</Text>
        <Text style={styles.dateTime}>{dateTime}</Text>
        <TouchableOpacity
          style={styles.joinButton}
          onPress={onJoin}
          disabled={isJoined}  // Désactiver le bouton si l'événement est déjà rejoint
        >
          <Text style={styles.joinButtonText}>{isJoined ? 'Joined' : 'Join'}</Text>
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,  // Espacement plus important entre les cartes
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Ombre pour Android
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
    backgroundColor: '#46A74D',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  joinedButton: {
    backgroundColor: '#A5D6A7',
  },
  joinButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default EventCard;
