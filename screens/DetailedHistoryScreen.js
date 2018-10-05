import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { LastEntriesList } from '../components/LastEntriesList';
import { localdb } from '../components/db.js';

export default class DetailedHistoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailedEntries: [],
      dataObj: {}
    };
  }

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
    this.setNewDataObj();
  }

  componentWillReceiveProps() {
    console.log('DetailedList will Receive Props');
    console.log('We update Detailed list state');
    this.setNewDetailedList();
    this.setNewDataObj();
  }

    dateStringFromISOString(str) {
      return new Date(str).toDateString();
    }

    setNewDataObj() {
      let dataObj = {
        title: '',
        id: ''
      };
      if (this.props.navigation.getParam('prevScreen') === 'scanner') {
        dataObj = JSON.parse('{ ' + this.props.navigation.getParam('dataString') + ' }');
      } else if ((this.props.navigation.getParam('prevScreen') === 'home') && (this.props.navigation.getParam('type') === 'equipTitleAndId')) {
        dataObj = {
          title: this.props.navigation.getParam('entryObj').equipTitle,
          id: this.props.navigation.getParam('entryObj').equipId
        };
      }
      this.setState(() => {
        return {
          dataObj
        };
      });
    }

    setNewDetailedList() {
      localdb.allDocs({
        include_docs: true,
        attachments: true
      }).then((allDocs) => {

        const type = this.props.navigation.getParam('type');
        const entryObj = this.props.navigation.getParam('entryObj');
        const dataString = this.props.navigation.getParam('dataString');

        // From Detailed or Home screen
        if (type === 'equipTitleAndId') {
          const filteredDocsByEquipTitleOrEquipId = allDocs.rows.filter((row) => ((row.doc.equipTitle === entryObj.equipTitle) && (row.doc.equipId === entryObj.equipId)));
          this.setState(() => {
            return {
              detailedEntries: filteredDocsByEquipTitleOrEquipId
            };
          });
        // From Detailed or Home screen
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
              'Unknown code',
              [
                {
                  text: 'Try again',
                  onPress: () => this.props.navigation.navigate('SCANNER')
                }
              ],
              { cancelable: false }
            );
          }
          const filteredDocsByEquipTitleOrEquipId = allDocs.rows.filter((row) => ((row.doc.equipTitle === dataObj.title) && (row.doc.equipId === dataObj.id)));
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
      console.log('Render detailed list with dataObj:');
      console.log(this.state.dataObj);
      const { dataObj } = this.state;
      return (
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            <LastEntriesList entries={this.state.detailedEntries.map((row) => row.doc)}/>
          </View>
          <Button
            title='ADD'
            onPress={() => this.props.navigation.navigate('AddEntry', { dataObj })}
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
