import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

const EventCardContainer = ({ children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>{children}</ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '5%',
  },
  innerContainer: {
    alignItems: 'center',
    width: '90%',
    height: '90%',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFA500',
    borderRadius: 20,
    paddingTop: '3%',
    paddingLeft: '3%',
    paddingRight: '3%',
  },
  scrollView: {
    width: '100%',
  },
});

export default EventCardContainer;
