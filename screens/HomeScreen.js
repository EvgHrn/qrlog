import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { LastEntriesList } from '../components/LastEntriesList';
import EntriesContext from '../components/EntriesContext';

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
    
    return(
      <EntriesContext.Consumer>
        {
          (value) =>
            <View style={styles.container}>
              <LastEntriesList entries={this.state.entries}/>
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