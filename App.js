import React from 'react';
import { createBottomTabNavigator  } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import ScannerScreen from './screens/ScannerScreen';
import DetailedHistoryScreen from './screens/DetailedHistoryScreen';
import HomeScreen from './screens/HomeScreen';
import AddEntryScreen from './screens/AddEntryScreen';
import db from './components/db.js';
import EntriesContext from './components/EntriesContext';
import { YellowBox } from 'react-native';

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

  changes = db.changes({
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
    db.allDocs({
      include_docs: true,
      attachments: true
    }).then((result) => {
      const entries = result.rows.map((item) => item.doc).sort((entryObj1, entryObj2) => {
        const date1 = new Date(entryObj1.dateTimeOfEntry);
        const date2 = new Date(entryObj2.dateTimeOfEntry);
        if (date1 > date2) {
          return -1;
        } else {
          return 1;
        }
      });
      this.setAppState({ entries: entries });
    }).catch((err) => {
      console.error(err);
    });
  }

  componentWillMount() {
    console.log('App component will mount');
    this.allDocsToState();
  }

  render() {
    return (
      <EntriesContext.Provider value={this.state.entries}>
        <RootStack/>
      </EntriesContext.Provider>
    );
  }
}
