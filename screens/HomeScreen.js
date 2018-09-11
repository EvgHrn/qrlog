import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import LastEntriesList from '../components/LastEntriesList'

export default class HomeScreen extends React.Component {
    static navigationOptions = {
      title: 'HOME'
    }
    render() {
      return(
        <View style={styles.container}>
          <LastEntriesList/>
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