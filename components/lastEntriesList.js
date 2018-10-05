import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';
import EntriesListItem from './EntriesListItem';
import { Constants } from 'expo';


export class LastEntriesList extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <FlatList contentContainerStyle={{
                marginTop: Constants.statusBarHeight
            }}
                data={this.props.entries}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <EntriesListItem entry={item}/>
                )
                }
                keyExtractor={(entry) => entry._id}
            />
        );
    }
}
