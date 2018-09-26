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
        <TouchableOpacity onPress={this.onPress}>
          <View style={styles.container}>
            <Text>{this.props.entry.entry}</Text>
            <Text style={styles.light}>{this.props.entry.equipTitle}</Text>
            <Text style={styles.light}>{this.stringToHumanDateTime(this.props.entry.dateTimeOfEntry)}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'blue',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    light: {
      color: 'gray'
    }
  });
