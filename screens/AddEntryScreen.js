import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

export default class AddEntryScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      equipTitle: '', 
      equipId: '', 
      dateTime: '',
      entry: ''
    };
  }

    static navigationOptions = {
      title: 'ADD ENTRY'
    }
    render() {
      return(
        <View style={styles.container}>
            <FormLabel>Name</FormLabel>
            <FormInput/>
            <FormValidationMessage>Error message</FormValidationMessage>
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