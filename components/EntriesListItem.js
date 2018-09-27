import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';

class EntriesListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  onPress = (entryObj, type) => {
    console.log('Item on HomeScreen was pressed so we navigate to DetailedScreen');
    this.props.navigation.navigate('Detailed', {
      entryObj,
      type,
      prevScreen: 'home'
    });
  }

  stringToHumanDateTime = (str) => {
    return new Date(str).toLocaleString('ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };

  render() {
    return (
      <View style={styles.container}>

          <Text style={styles.mainText}>
            {this.props.entry.entry}
          </Text>

          <TouchableOpacity onPress={() => this.onPress(this.props.entry, 'equipTitleAndId')}>
            <Text style={styles.lightText}>
              {this.props.entry.equipTitle}
            </Text>
            <Text style={styles.lightText}>
              {this.props.entry.equipId}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onPress(this.props.entry, 'dateTimeOfEntry')}>
            <Text style={styles.lightText}>
              {this.stringToHumanDateTime(this.props.entry.dateTimeOfEntry)}
            </Text>
          </TouchableOpacity>
          
      </View>
    );
  }
}

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingVertical: 5
    },
    mainText: {
      fontSize: 14
    },
    lightText: {
      color: 'gray',
      fontSize: 12
    }
  });

export default withNavigation(EntriesListItem);
