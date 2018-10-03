import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Camera, Permissions, BarCodeScanner } from 'expo';
// import { NavigationEvents } from 'react-navigation';

export default class ScannerScreen extends React.Component {

  static navigationOptions = {
    title: 'SCANNER'
  }

  state = {
    hasCameraPermission: null,
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  // componentDidUpdate() {
  //   console.log('Did update scannerscreen');
  // }

  render() {

    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={styles.container}>
      <BarCodeScanner
        style={{ flex: 1 }}
        onBarCodeRead={this._handleBarCodeRead}
      />
      </View>
    );

  }

  _handleBarCodeRead = ({ type, data }) => {
    // We wait data from camera like this: "title": "blabla", "id": "blabla"
    console.log('Data from camera:');
    console.log(data);
    this.props.navigation.navigate('Detailed', {
      dataString: data,
      type: 'equipTitleAndequipIdStr',
      prevScreen: 'scanner'
    });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
