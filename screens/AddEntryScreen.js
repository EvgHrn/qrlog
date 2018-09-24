import React from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, Keyboard, TouchableOpacity, Button } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import EntriesContext from '../components/EntriesContext';

class AddEntryScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dateTimeOfAddingEntry: new Date().toISOString(),
      isDateTimePickerVisible: false,
      equipTitle: '', 
      equipId: '', 
      dateTimeOfEntry: '',
      entry: ''
    };
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    this.setState({
      dateTimeOfEntry:  new Date(date).toISOString(),
    });
    this._hideDateTimePicker();
  };

  static navigationOptions = {
    title: 'ADD ENTRY'
  }

  render() {
    return(
      <EntriesContext.Consumer>
        {
          (value) =>
            <KeyboardAvoidingView 
              style={styles.container}
              behavior="padding"
              enabled>
              <FormLabel>Name</FormLabel>
              <FormInput
                ref={input => this.nameInput = input}
                onChangeText={(equipTitle) => this.setState({equipTitle})}
              />
              <FormLabel>Serial No</FormLabel>
              <FormInput
                ref={input => this.idInput = input}
                onChangeText={(equipId) => this.setState({equipId})}
              />
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
              <FormLabel>Entry</FormLabel>
              <FormInput
                ref={input => this.entryInput = input}
                onChangeText={(entry) => this.setState({entry})}
              />
              <Button
                style={{ marginVertical: 40 }}
                title='Save'
                onPress={() => {
                  Keyboard.dismiss();
                  this.nameInput.clearText();
                  this.idInput.clearText();
                  this.entryInput.clearText();
                  console.log('Save button pressed');
                  value.db.post({
                    equipTitle: this.state.equipTitle,
                    equipId: this.state.equipId,
                    dateTimeOfAddingEntry: this.state.dateTimeOfAddingEntry,
                    dateTimeOfEntry: this.state.dateTimeOfEntry,
                    entry: this.state.entry
                  }).then((result) => {
                    console.log('New entry posted to db. Result:');
                    console.log(result);
                  }).catch((err) => console.error(err));
                  this.props.navigation.navigate('Home');
                }}
              />
            </KeyboardAvoidingView>
        }
      </EntriesContext.Consumer>
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