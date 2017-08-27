

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

console.disableYellowBox = true;
import MapView from 'react-native-maps';
import io from 'socket.io-client/dist/socket.io.js';
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
var lat;
var long;
var alt;


export default class ChildTracker extends Component {
  constructor(props){
    super(props);
    alt = this;
    this.state=({
      region:{
        latitude: 0,
        longitude: 0,
        latitudeDelta:0.0922,
        longitudeDelta:0.0922*ASPECT_RATIO
      },
      Marker:{
        latitude:0,
        longitude:0,
      }
    });
    this.socket = io('https://child-tracker.herokuapp.com')
    this.socket.on('lat',function(data){
      lat = parseFloat(data);
    });
    this.socket.on('long',function(data){
      long = parseFloat(data);
      alt.setState({
        region:{
          latitude: lat,
          longitude: long,
          latitudeDelta:0.0922,
          longitudeDelta:0.0922*ASPECT_RATIO
        },
        Marker:{
          latitude: lat,
          longitude: long,
        }
      })
    });
  }
  render(){
    return(
      <View style={styles.container}>
      <MapView
        style={styles.map}
        region={this.state.region}
      >
        <MapView.Marker
            coordinate={this.state.Marker}
        />
      </MapView>
      </View>


    );
  }
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    width:width,
    height:height
  },
});
AppRegistry.registerComponent('ChildTracker', () => ChildTracker);
