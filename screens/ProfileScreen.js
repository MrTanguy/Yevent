import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet, Dimensions, Text, ScrollView } from 'react-native';
import SvgBackground from '../components/SvgBackground';
import TitleView from '../components/TitleView'
import EventCard from '../components/EventCard'
import EventCardContainer from '../components/EventCardContainer'

export const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SvgBackground />
      <TitleView title='Profile' />
      <EventCardContainer>
        <EventCard  title='Soirée' address='1 Avenue Ynov, 69002 Lyon' dateTime='18h30 22/01/25' onJoin={() => {}} />
        <EventCard  title='Soirée' address='1 Avenue Ynov, 69002 Lyon' dateTime='18h30 22/01/25' onJoin={() => {}} />
        <EventCard  title='Soirée' address='1 Avenue Ynov, 69002 Lyon' dateTime='18h30 22/01/25' onJoin={() => {}} />
        <EventCard  title='Soirée' address='1 Avenue Ynov, 69002 Lyon' dateTime='18h30 22/01/25' onJoin={() => {}} />
        <EventCard  title='Soirée' address='1 Avenue Ynov, 69002 Lyon' dateTime='18h30 22/01/25' onJoin={() => {}} />
      </EventCardContainer>
    </SafeAreaView>
  )
};

