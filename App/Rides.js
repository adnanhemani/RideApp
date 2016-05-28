'use strict';

import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CookieManager from 'react-native-cookies';
import RideApplLogin from './App';

export default class Rides extends Component {

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
        if (this.state.loggedIn) {
            return (
                <View style={styles.container}>
                    <Text style={styles.welcome}>
                        You are authenticated!
                    </Text>
                </View>
            ); 
        } else {
            return (
                <RideApplLogin/>
            );
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