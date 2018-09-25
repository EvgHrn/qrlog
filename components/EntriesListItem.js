import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export class EntriesListItem extends React.Component {

    // _onPress = () => {
    //   // this.props.onPressItem(this.props.id);
    // };
  
    render() {
      return (
        <View style={styles.container}>
          <Text>{this.props.entry.entry}</Text>
          <Text style={styles.light}>{this.props.entry.equipTitle}</Text>
          <Text style={styles.light}>{this.props.entry.dateTimeOfEntry}</Text>
        </View>
        // <TouchableOpacity onPress={this._onPress}>
        //   <View style={{
        //     flex: 1,
        //     flexDirection: 'row',
        //     justifyContent: 'center',
        //     alignItems: 'center'
        //   }}>
        //     <Text>
        //       {this.props.id}
        //     </Text>
        //   </View>
        // </TouchableOpacity>
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
    light: {
      color: 'gray'
    }
  });
