import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';
import { EntriesListItem } from './EntriesListItem';
import { Constants } from 'expo';


export class LastEntriesList extends Component {

    render() {
        return (
            <FlatList contentContainerStyle={{
                marginTop: Constants.statusBarHeight
                // flex: 1,
                // alignItems: 'flex-start',
                // justifyContent: 'flex-start'
            }}
                // style={{
                //     marginTop: Constants.statusBarHeight,
                //     flex: 1
                // }}
                data={this.props.entries}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <EntriesListItem entry={item}/>
                )  
                }
                keyExtractor={(entry) => entry.dateTimeOfAddingEntry}
            />
        );
    }
}
