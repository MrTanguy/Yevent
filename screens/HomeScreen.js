import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import SvgBackground from '../components/SvgBackground';
import { styles } from '../styles/styles';
import TitleView from '../components/TitleView'
import MapScreen from '../components/MapScreen'

export const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SvgBackground />
      <TitleView title='Home' />
      <MapScreen/>
    </SafeAreaView>
  )
};

