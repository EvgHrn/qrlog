import React from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, Keyboard, TouchableOpacity, Button } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import * as db from '../components/db.js';

class AddEntryScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      datetime: new Date(),
      isDateTimePickerVisible: false,
      equipTitle: '', 
      equipId: '', 
      dateTime: '',
      entry: ''
    };
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    //console.log('A date has been picked: ', date);
    this.setState({
      datetime:  new Date(date),
    });
    this._hideDateTimePicker();
  };

  static navigationOptions = {
    title: 'ADD ENTRY'
  }

  render() {
    //console.log(this.props);
    
    return(
      <KeyboardAvoidingView 
          style={styles.container}
          behavior="padding"
          enabled>

        <FormLabel>Name</FormLabel>
        <FormInput
          ref={input => this.nameInput = input}
          onChangeText={(equipTitle) => this.setState({equipTitle})}
        />
        {/* <FormValidationMessage>Error message</FormValidationMessage> */}

        <FormLabel>Serial No</FormLabel>
        <FormInput
          ref={input => this.idInput = input}
          onChangeText={(equipId) => this.setState({equipId})}
        />
        {/* <FormValidationMessage>Error message</FormValidationMessage> */}

        <FormLabel>Date</FormLabel>
        <TouchableOpacity onPress={this._showDateTimePicker}>
          <Text>{this.state.datetime.toLocaleString("ru", {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'})}</Text>
        </TouchableOpacity>
        <DateTimePicker
          mode='datetime'
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
        {/* <FormInput/> */}
        {/* <FormValidationMessage>Error message</FormValidationMessage> */}

        <FormLabel>Entry</FormLabel>
        <FormInput
          ref={input => this.entryInput = input}
          onChangeText={(entry) => this.setState({entry})}
        />
        {/* <FormValidationMessage>Error message</FormValidationMessage> */}

        <Button
          style={{ marginVertical: 40 }}
          title='Save'
          onPress={() => {
            Keyboard.dismiss();
            this.nameInput.clearText();
            this.idInput.clearText();
            this.entryInput.clearText();
            console.log('Save button pressed');
            db.addEntryToDb(this.state.equipTitle, this.state.equipId, this.state.datetime.toISOString(), this.state.entry);

          } 
          }
        />
      </KeyboardAvoidingView>
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

export default AddEntryScreen; 