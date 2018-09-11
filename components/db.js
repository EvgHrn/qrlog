import { SQLite } from 'expo';

const db = SQLite.openDatabase('db.db');

export const createTableIfNotExist = () => {
    db.transaction(tx => {
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

export const addEntryToDb = (equipTitle, equipId, dateTime, entry) => {
    db.transaction(tx => {
            tx.executeSql('insert into entries (equipTitle, equipId, dateTime, entry) values (?, ?, ?, ?)', [equipTitle, equipId, dateTime, entry]);
            tx.executeSql('select * from entries', [], (_, { rows }) =>
            console.log(JSON.stringify(rows)));
        },
        null,
    );
}