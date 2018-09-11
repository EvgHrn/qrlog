import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {LastEntriesList} from '../components/LastEntriesList';
import * as db from '../components/db.js';

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      entries: null
    };
  }

  static navigationOptions = {
    title: 'HOME'
  }

  render() {

    console.log(this.state);
    
    return(
      <View style={styles.container}>
        <LastEntriesList entries={this.state.entries}/>
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