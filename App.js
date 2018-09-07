import React from 'react';
import { createBottomTabNavigator  } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import ScannerScreen from './screens/ScannerScreen'
import DetailedHistoryScreen from './screens/DetailedHistoryScreen'
import HomeScreen from './screens/HomeScreen'
import AddEntryScreen from './screens/AddEntryScreen'
import db from './components/db'

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
    db.createTable();
  }

  render() {
    return <RootStack />;
  }
}
