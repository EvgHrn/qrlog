import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import lastEntriesList from '../components/lastEntriesList'

export default class HomeScreen extends React.Component {
    static navigationOptions = {
      title: 'HOME'
    }
    render() {
      return(
        <View style={styles.container}>
          <Text>
            Screen with some last events with all plotters
          </Text>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });