import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';
import { EntriesListItem } from './EntriesListItem';


export class LastEntriesList extends Component {

    render() {
        return (
            <FlatList
                data={this.props.entries}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) =>
                    <EntriesListItem entry={item}/>
                }
                keyExtractor={(entry) => entry.dateTimeOfAddingEntry}
            />
        );
    }
}
