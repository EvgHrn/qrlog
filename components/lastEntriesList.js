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
                    <EntriesListItem name={item.equipTitle}/>
                }
                keyExtractor={(entry) => entry.equipId}
            />
        );
    }
}