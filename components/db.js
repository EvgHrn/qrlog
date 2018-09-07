import React, { Component } from 'react'

export class db extends Component {

    constructor(props) {
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

                'create table if not exists items (id integer primary key not null, equipTitle text, equipId text, dateTime text, entry text);'
            );
        });
    }

    render() {
        return (
            <View>
                
            </View>
        )
    }
}
