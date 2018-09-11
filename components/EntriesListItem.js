import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

export class EntriesListItem extends React.Component {

    // _onPress = () => {
    //   // this.props.onPressItem(this.props.id);
    // };
  
    render() {
    //   const textColor = this.props.selected ? "red" : "black";
    console.log(this.props.name);
    
      return (
        <Text>{this.props.name}</Text>
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
