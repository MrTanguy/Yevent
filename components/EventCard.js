import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const EventCard = ({ title, address, dateTime, onJoin }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.address}>{address}</Text>
      <Text style={styles.dateTime}>{dateTime}</Text>
      <TouchableOpacity style={styles.joinButton} onPress={onJoin}>
        <Text style={styles.joinButtonText}>Joined</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    padding: 15,
    borderRadius: 10,
    marginBottom: '4%'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 14,
    color: '#333',
    marginTop: '1%'
  },
  dateTime: {
    fontSize: 14,
    color: '#555',
    marginTop: '1%'
  },
  joinButton: {
    backgroundColor: '#46A74D',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'flex-end',
    marginTop: '1%'
  },
  joinButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default EventCard;
