import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { LastEntriesList } from '../components/LastEntriesList';
import EntriesContext from '../components/EntriesContext';
import db from '../components/db.js';

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'HOME'
  }

  render() {
    
    return(
      <EntriesContext.Consumer>
        {
          (entries) =>
            <View style={styles.container}>
              <LastEntriesList entries={entries}/>
              <Button
                title='Destroy db'
                onPress={() => {
                  db.destroy().then(function (response) {
                    console.log('Db desroy');
                  }).catch(function (err) {
                    console.error(err);
                  });
                }}
              />
            </View>
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
