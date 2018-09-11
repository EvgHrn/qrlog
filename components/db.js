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
        },
        e => {
            alert(e);
            console.error(e);
        },
        () => console.log('Table equipment created')
    );
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
        },
        e => {
            alert(e);
            console.error(e);
        },
        () => console.log('Table entries created')
    );
}

export const addEntryToDb = (equipTitle, equipId, dateTime, entry) => {
    db.transaction(tx => {
            tx.executeSql('insert into entries (equipTitle, equipId, dateTime, entry) values (?, ?, ?, ?)', [equipTitle, equipId, dateTime, entry]);
            tx.executeSql('select * from entries', [], (_, { rows }) =>
                console.log(JSON.stringify(rows)));
        },
        e => {
            alert(e);
            console.error(e);
        },
        () => console.log('New entry created')
    );
}