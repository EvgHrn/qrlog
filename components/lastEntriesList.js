import React, { Component } from 'react';
import EntriesListItem from './EntriesListItem';

export class LastEntriesList extends Component {

    _keyExtractor = (item, index) => item.id;

    _renderItem = ({item}) => (
        <EntriesListItem
            id={item.id}
            onPressItem={this._onPressItem}
            selected={!!this.state.selected.get(item.id)}
            title={item.title}
        />
    );

    render() {
        return (
            <FlatList
                data={this.props.data}
                // extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
        )
    }
}
