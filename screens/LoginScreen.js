import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export function LoginScreen({ onLogin }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue</Text>
      <Text style={styles.subtitle}>Connectez-vous pour continuer</Text>
      <Button title="Se connecter" onPress={onLogin} color="#FBAE3C" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
});
