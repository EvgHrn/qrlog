import React, { Component } from 'react';
import { SQLite } from 'expo';

export class db extends Component {

    constructor(props) {
        super(props);
        this.db = SQLite.openDatabase('db.db');
    }

    createTable = () => {
        this.db.transaction(tx => {
            tx.executeSql(

                /*

                id
                equipTitle
                equipId
                dateTime
                entry

                */

                'create table if not exists entries (id integer primary key not null, equipTitle text, equipId text, dateTime text, entry text);'
            );
        });
    }

    addEntry(equipTitle, equipId, dateTime, entry) {

        this.db.transaction(tx => {
                tx.executeSql('insert into entries (equipTitle, equipId, dateTime, entry) values (?, ?, ?, ?)', [equipTitle, equipId, dateTime, entry]);
                tx.executeSql('select * from entries', [], (_, { rows }) =>
                console.log(JSON.stringify(rows)));
            },
            null,
            this.update
        );
    }

    render() {
        return (
            <View>
                
            </View>
        )
    }
}
