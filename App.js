import React from 'react';
import { createBottomTabNavigator  } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import ScannerScreen from './screens/ScannerScreen';
import DetailedHistoryScreen from './screens/DetailedHistoryScreen';
import HomeScreen from './screens/HomeScreen';
import AddEntryScreen from './screens/AddEntryScreen';
import { localdb, remoteDb } from './components/db.js';
import EntriesContext from './components/EntriesContext';
import { YellowBox, Alert } from 'react-native';

YellowBox.ignoreWarnings(['Remote debugger']);

const RootStack = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Scanner: ScannerScreen,
    Detailed: DetailedHistoryScreen,
    AddEntry: AddEntryScreen
  },
  {
    initialRouteName: 'Home',
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Detailed') {
          iconName = `ios-list${focused ? '' : '-outline'}`;
        } else if (routeName === 'Scanner') {
          iconName = `ios-qr-scanner${focused ? '' : '-outline'}`;
        } else if (routeName === 'AddEntry') {
          iconName = `ios-add${focused ? '' : '-outline'}`;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      entries: []
    };
  }

  setAppState(stateObj) {
    this.setState(() => {
      return stateObj;
    });
  }

  localChanges = localdb.changes({
    since: 'now',
    live: true,
    include_docs: true
  }).
  on('change', () => {
    this.allDocsToState();
  }).
  on('error', (err) => {
    console.error(err);
  });

  allDocsToState() {
    localdb.allDocs({
      include_docs: true,
      attachments: true
    }).then((result) => {
      const entries = result.rows.map((item) => item.doc).sort((entryObj1, entryObj2) => {
        const date1 = new Date(entryObj1.dateTimeOfEntry);
        const date2 = new Date(entryObj2.dateTimeOfEntry);
        if (date1 > date2) {
          return -1;
        }
        return 1;
      });
      this.setAppState({ entries: entries });
    }).catch((err) => {
      console.error(err);
    });
  }

  componentDidMount() {
    console.log('App component did mount');
    console.log('remote db: ', remoteDb);
    this.allDocsToState();
    const opts = {
      live: true,
      retry: true
    };
    localdb.sync(remoteDb, opts)
    .on('change', function (info) {
      console.log('Sync change', info);
    }).on('paused', function (err) {
      // replication paused (e.g. replication up to date, user went offline)
      console.log('Sync paused', err);
    }).on('active', function () {
      // replicate resumed (e.g. new changes replicating, user went back online)
      console.log('Sync active');
    }).on('denied', function (err) {
      // a document failed to replicate (e.g. due to permissions)
      console.log('Sync denied', err);
      Alert.alert('Sync error', 'Access to database denied');
    }).on('complete', function (info) {
      // handle complete
      console.log('Sync complete', info);
    }).on('error', function (err) {
      // handle error
      console.log('Sync error', err);
      Alert.alert('Sync error', 'Sync with database error');
    });
  }

  render() {
    return (
      <EntriesContext.Provider value={this.state.entries}>
        <RootStack/>
      </EntriesContext.Provider>
    );
  }
}
