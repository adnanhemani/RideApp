'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  ScrollView,
} from 'react-native'
import CookieManager from 'react-native-cookies';
import RideApplLogin from './App';
//import Tabbar, { Tab, RawContent, IconWithBar, glypyMapMaker } from 'react-native-tabbar';



const glypy = glypyMapMaker({
  Groups: 'e900',
  Rides: 'e902',
  Settings: 'e901',
});

class Rides extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            loggedIn: true
        };
    }

    logout () {
        CookieManager.clearAll((err, res) => {
            console.log(err);
            console.log(res);
        });
    
        this.setState({
            loggedIn: false,
        });
    }
  
    render () {
        return (
        <Navigator
            renderScene={this.renderScene.bind(this)}
            navigator = {navigator}
           />
        );
      }

    renderScene (route, navigator) {
        if (this.state.loggedIn) {
            return (
                <View style={styles.container}>
                   
                </View>
            ); 
        } else {
            this.props.navigator.push({id: "LoginPage", name:"Index"})
        }
    }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = Rides;