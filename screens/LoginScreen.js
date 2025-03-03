import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import SvgBackground from '../components/SvgBackground';
import supabase from '../services/SupabaseService';
import TitleView from '../components/TitleView';

export function LoginScreen({ navigation, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.getClient().auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        onLogin(data);
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SvgBackground />
      <TitleView title="Login" />
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Login" onPress={handleLogin} color="#FBAE3C" />
      </View>
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>New here?</Text>
        <Button title="Register" onPress={() => navigation.navigate('Register')} color="#FBAE3C" />
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 20,
    marginTop: '40%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 25,
    marginTop: 25,
  },
  registerContainer: {
    position: 'absolute',
    bottom: '8%',
    width: '100%',
    alignItems: 'center',
  },
  registerText: {
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
});
