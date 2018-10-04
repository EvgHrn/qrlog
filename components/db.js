import PouchDB from 'pouchdb-react-native';
import { SQLite } from 'expo';
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite';
import { SERVER_IP, DB_PASS } from 'react-native-dotenv';

const SQLiteAdapter = new SQLiteAdapterFactory(SQLite);

PouchDB.plugin(SQLiteAdapter);
PouchDB.plugin(require('pouchdb-find'));

const db = new PouchDB('entries.db', { adapter: 'react-native-sqlite' });

export default db;
