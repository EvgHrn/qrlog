import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import db from '../components/db.js';

class DetailedList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      detailedEntries: []
    };
  }

  dateStringFromISOString = (str) => {
    return new Date(str).toDateString();
  }

  componentDidUpdate() {
    console.log('DetailesList was Updated');
    db.allDocs({
      include_docs: true,
      attachments: true
    }).then((allDocs) => {
      // Handle result
      const type = this.props.navigation.getParam('type');
      const dataString = this.props.navigation.getParam('dataString');
      if (type === 'equipTitle') {
        const filteredDocsByEquipTitle = allDocs.rows.filter((row) => row.doc.equipTitle === dataString);
        this.setState(() => {
          return {
            detailedEntries: filteredDocsByEquipTitle
          };
        });
      } else if (type === 'dateTimeOfEntry') {
        const dateString = this.dateStringFromISOString(dataString);
        const filteredDocsByDate = allDocs.rows.filter((row) => this.dateStringFromISOString(row.doc.dateTimeOfEntry) === dateString);
        this.setState(() => {
          return {
            detailedEntries: filteredDocsByDate
          };
        });
      }
    }).catch((err) => {
      console.error(err);
    });
  }

  componentDidMount() {
    console.log('DetailesList was Mount');
  }

  componentWillReceiveProps() {
    console.log('DetailesList will Receive Props');
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>
          History of
        </Text>
        <Text>
          {this.props.navigation.getParam('dataString')}
        </Text>
      </View>
    );
  }
}

export default class DetailedHistoryScreen extends React.Component {
    static navigationOptions = {
      title: 'DETAILED'
    }
    render() {
      return (
        <View style={styles.container}>
          <Text>
            {/* {this.props.navigation.getParam('code')} */}
          </Text>
          <DetailedList/>
          <Button
            title='ADD'
            onPress={() => this.props.navigation.navigate('AddEntry', { dataObj: dataObj })}
          />
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
