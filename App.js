import React from 'react';
import { createBottomTabNavigator  } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { SQLite } from 'expo';
import ScannerScreen from './screens/ScannerScreen';
import DetailedHistoryScreen from './screens/DetailedHistoryScreen';
import HomeScreen from './screens/HomeScreen';
import AddEntryScreen from './screens/AddEntryScreen';

const db = SQLite.openDatabase('db.db');

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

  componentDidMount() {
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

  addEntry(equipTitle, equipId, dateTime, entry) {

    db.transaction(tx => {
            tx.executeSql('insert into entries (equipTitle, equipId, dateTime, entry) values (?, ?, ?, ?)', [equipTitle, equipId, dateTime, entry]);
            tx.executeSql('select * from entries', [], (_, { rows }) =>
            console.log(JSON.stringify(rows)));
        },
        null,
        this.update
    );
  }

  render() {
    return <RootStack addEntry={this.addEntry}/>;
  }
}
