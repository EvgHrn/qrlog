import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class DetailedHistoryScreen extends React.Component {
    static navigationOptions = {
      title: 'DETAILED'
    }
    render() {
      return(
        <View style={styles.container}>
          <Text>
            {this.props.navigation.getParam('code')}
          </Text>
          <Button
            title='HOME'
            onPress={() => this.props.navigation.navigate('Home')}/>
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