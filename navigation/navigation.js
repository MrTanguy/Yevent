import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { EventsScreen } from '../screens/EventsScreen';
import { EventDetailScreen } from '../screens/EventDetailScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const GlobalStack = createNativeStackNavigator();

function TabNavigator({onLogout}) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Events') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FBAE3C',
        tabBarInactiveTintColor: '#FBAE3C',
        tabBarStyle: {
          position: 'absolute',
          borderRadius: 15,
          marginHorizontal: 20,
          marginBottom: 10,
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 8,
          elevation: 5,
          borderTopWidth: 0,
        },
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="Events"
        component={EventsScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        options={{ headerShown: false }}
      >
        {props => <ProfileScreen {...props} onLogout={onLogout} />}
      </Tab.Screen>

    </Tab.Navigator>
  );
}

export function MyStack({ onLogout }) {
  return (
    <GlobalStack.Navigator>
      {/* Tab Navigator */}
      <GlobalStack.Screen
        name="MainTabs"
        options={{ headerShown: false }}
      >
        {props => <TabNavigator {...props} onLogout={onLogout} />}
      </GlobalStack.Screen>
      {/* Global Screens */}
      <GlobalStack.Screen
        name="EventDetail"
        component={EventDetailScreen}
        options={{ headerShown: false }}
      />
    </GlobalStack.Navigator>
  );
}

