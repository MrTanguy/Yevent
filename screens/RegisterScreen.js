import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, KeyboardAvoidingView } from 'react-native';
import SvgBackground from '../components/SvgBackground';
import supabase from '../services/SupabaseService';
import TitleView from '../components/TitleView';

export function RegisterScreen({ navigation, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      const { user, error } = await supabase.getClient().auth.signUp({
        email,
        password,
      });

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        const { data, error } = await supabase.getClient().auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            Alert.alert('Error', error.message);
        } else {
            onLogin(data);
        }
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Something went wrong during registration.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SvgBackground />
      <TitleView title="Register" />
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
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <Button title="Register" onPress={handleRegister} color="#FBAE3C" />
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <Button title="Login" onPress={() => navigation.navigate('Login')} color="#FBAE3C" />
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
  loginContainer: {
    position: 'absolute',
    bottom: '8%',
    width: '100%',
    alignItems: 'center',
  },
  loginText: {
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
});
