import React from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, View, TouchableOpacity, Button } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';


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
    console.log('A date has been picked: ', date);
    this.setState({
      datetime:  new Date(date),
    });
    this._hideDateTimePicker();
  };

  static navigationOptions = {
    title: 'ADD ENTRY'
  }

  render() {
    console.log(this.props);
    
    return(
      <KeyboardAvoidingView 
          style={styles.container}
          behavior="padding"
          enabled>
        <FormLabel>Name</FormLabel>
        <FormInput/>
        {/* <FormValidationMessage>Error message</FormValidationMessage> */}
        <FormLabel>Serial No</FormLabel>
        <FormInput/>
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
        <FormInput/>
        {/* <FormValidationMessage>Error message</FormValidationMessage> */}
        <Button
          style={{ marginVertical: 20 }}
          title='Save'
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

export default withNavigation(AddEntryScreen); 