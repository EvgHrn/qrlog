import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera, Permissions } from 'expo';
import * as db from '../components/db.js';

export default class ScannerScreen extends React.Component {

  static navigationOptions = {
    title: 'SCANNER'
  }

  state = {
    hasCameraPermission: null,
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }

  render() {


    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
        </View>
      );
    }
  }

  _handleBarCodeRead = ({ type, data }) => {
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    this.props.navigation.navigate('Detailed', {
      code: data,
    });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    flex: 1
  },
}
);