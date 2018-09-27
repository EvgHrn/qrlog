import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { LastEntriesList } from '../components/LastEntriesList';
import db from '../components/db.js';

export default class DetailedHistoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailedEntries: []
    };
  };

  static navigationOptions = {
    title: 'DETAILED'
  }

  componentDidUpdate() {
    console.log('DetailedList was Updated');
  }

  componentDidMount() {
    console.log('DetailedList was Mount');
    console.log('We update Detailed list state');
    this.setNewDetailedList();
  }

  componentWillReceiveProps() {
    console.log('DetailedList will Receive Props');
    console.log('We update Detailed list state');
    this.setNewDetailedList();
  }

    dateStringFromISOString(str) {
      return new Date(str).toDateString();
    }
  
    setNewDetailedList() {
      db.allDocs({
        include_docs: true,
        attachments: true
      }).then((allDocs) => {
        
        const type = this.props.navigation.getParam('type');
        const entryObj = this.props.navigation.getParam('entryObj');
        const dataString = this.props.navigation.getParam('dataString');

        // From Detailed screen
        if (type === 'equipTitleAndId') {
          const filteredDocsByEquipTitleOrEquipId = allDocs.rows.filter((row) => ((row.doc.equipTitle === entryObj.equipTitle) || (row.doc.equipId === entryObj.equipId)));
          this.setState(() => {
            return {
              detailedEntries: filteredDocsByEquipTitleOrEquipId
            };
          });
        // From Detailed screen
        } else if (type === 'dateTimeOfEntry') {
          const dateString = this.dateStringFromISOString(entryObj.dateTimeOfEntry);
          const filteredDocsByDate = allDocs.rows.filter((row) => this.dateStringFromISOString(row.doc.dateTimeOfEntry) === dateString);
          this.setState(() => {
            return {
              detailedEntries: filteredDocsByDate
            };
          });
        // From Scanner screen
        } else if (type === 'equipTitleAndequipIdStr') {
          let dataObj;
          try {
            dataObj = JSON.parse('{ ' + dataString + ' }');
          } catch (err) {
            console.log('Unkown equipment');
            Alert.alert(
              'Error',
              'Unknown qr',
              [
                {
                  text: 'Try again',
                  onPress: () => this.props.navigation.navigate('SCANNER')
                }
              ],
              { cancelable: false }
            );
          }
          const filteredDocsByEquipTitleOrEquipId = allDocs.rows.filter((row) => ((row.doc.equipTitle === dataObj.title) || (row.doc.equipId === dataObj.id)));
          this.setState(() => {
            return {
              detailedEntries: filteredDocsByEquipTitleOrEquipId
            };
          });
        }
        console.log('Filtered list of entries:');
        console.log(this.state.detailedEntries);
      }).catch((err) => {
        console.error(err);
      });
    }

    render() {
      let dataObj = {};
      if (this.props.navigation.getParam('prevScreen') === 'scanner') {
        // dataObj = JSON.parse('{ ' + this.props.navigation.getParam('dataString') + ' }');
      } else if (this.props.navigation.getParam('prevScreen') === 'home') {
        // dataObj = JSON.parse('{ ' + this.props.navigation.getParam('dataString') + ' }');
      }
      return (
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            <LastEntriesList entries={this.state.detailedEntries.map((row) => row.doc)}/>
          </View>
          <Button
            title='ADD'
            // onPress={() => this.props.navigation.navigate('AddEntry', { dataObj: dataObj })}
          />
        </View>
      );
    }
 }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
