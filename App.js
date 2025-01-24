import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MyStack } from './navigation/navigation';
import { AuthNavigation } from './navigation/authNavigation';
import { getId, setId, setEmail } from './services/LocalStorage';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogin = async (data) => {
    const id = data.session.user.id;
    const email = data.session.user.email;
    await setId(id);
    await setEmail(email)
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    await setId(null);
    await setEmail(null);
    setIsAuthenticated(false);
  };

  const checkAuthentication = async () => {
    try {
      const token = await getId();
      if (token) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du token :', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FBAE3C" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth">
            {props => <AuthNavigation {...props} onLogin={handleLogin} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Main">
            {props => <MyStack {...props} onLogout={handleLogout} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
