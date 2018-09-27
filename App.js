import React from 'react';
import { createBottomTabNavigator  } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import ScannerScreen from './screens/ScannerScreen';
import DetailedHistoryScreen from './screens/DetailedHistoryScreen';
import HomeScreen from './screens/HomeScreen';
import AddEntryScreen from './screens/AddEntryScreen';
import db from './components/db.js';
import EntriesContext from './components/EntriesContext';

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
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Detailed') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
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
      const entries = result.rows.map((item) => item.doc);
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
