import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import SvgBackground from '../components/SvgBackground';
import TitleView from '../components/TitleView'

export const ReservationsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SvgBackground />
      <TitleView title='Reservations' />
    </SafeAreaView>
  )
};

