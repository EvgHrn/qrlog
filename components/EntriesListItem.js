import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export class EntriesListItem extends React.Component {

  onPress = () => {
    // This.props.onPressItem(this.props.id);
  };

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

          <TouchableOpacity onPress={this.onPress}>
            <Text style={styles.lightText}>
              {this.props.entry.equipTitle}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.onPress}>
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
      // backgroundColor: 'blue',
      paddingHorizontal: 20,
      paddingVertical: 5
      // alignItems: 'flex-start',
      // justifyContent: 'flex-start',
    },
    mainText: {
      fontSize: 14
    },
    lightText: {
      color: 'gray',
      fontSize: 12
    }
  });
