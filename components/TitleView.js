import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TitleView = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export const styles = StyleSheet.create({
    container : {
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 20,
        paddingTop: '5%',
    }
})



export default TitleView;