import { SQLite } from 'expo';

const db = SQLite.openDatabase('db.db');

export const createTablesIfNotExist = () => {
    db.transaction(tx => {
        tx.executeSql(
           'create table if not exists equipment ( \
                id integer primary key not null, \
                equipTitle text not null, \
                equipId text unique \
            );'
        );
    });
    db.transaction(tx => {
        tx.executeSql(
            
            'PRAGMA foreign_keys=on; \
            create table if not exists entries ( \
                id integer primary key not null, \
                equipTitle text not null, \
                equipId text, \
                dateTime text not null, \
                entry text not null \
                FOREIGN KEY (equipTitle) REFERENCES equipment(equipTitle) \
                FOREIGN KEY (equipId) REFERENCES equipment(equipId) \
            );'
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