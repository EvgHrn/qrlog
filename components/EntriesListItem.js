import React, { Component } from 'react'

export class EntriesListItem extends React.Component {

    _onPress = () => {
      // this.props.onPressItem(this.props.id);
    };
  
    render() {
    //   const textColor = this.props.selected ? "red" : "black";
      return (
        <TouchableOpacity onPress={this._onPress}>
          <View>
            <Text>
              Entry
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  }
