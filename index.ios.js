'use strict';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
} from "react-native";

import React, {Component} from "react";

var RideApplLogin = require('./App/App');
var Register = require('./App/Register');
var Tabs = require('./App/Tabs');
var RidesPage = require("./App/RidesPage");
var GroupsPage = require("./App/GroupsPage");
var GroupDetails = require("./App/GroupDetails");
var RideSeek = require("./App/RideSeek");
var RideResults = require("./App/rideresults");
var SettingsPage = require("./App/SettingsPage");
var AddGroup = require("./App/AddGroup");
var LeaveGroup = require("./App/LeaveGroup");
var CreateGroup = require("./App/CreateGroup");
var GroupMgmt = require("./App/GroupMgmt");
var GroupMgmtOptions = require("./App/GroupMgmtOptions");

class App extends Component {
  render() {
    return (
      <Navigator
          initialRoute={{id: 'LoginPage', name: 'Index'}}
          renderScene={this.renderScene.bind(this)}
          configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromRight;
          }} />
    );
  }
  renderScene(route, navigator) {
    var routeId = route.id;
    if (routeId === 'LoginPage') {
      return (
        <RideApplLogin
          navigator={navigator} />
      );
    }
    if (routeId === "GroupMgmtOptions") {
      return (
        <GroupMgmtOptions
            navigator={navigator} />
      );
    }
    if (routeId === "GroupMgmt") {
      return (
        <GroupMgmt
            navigator = {navigator} />
      );
    }
    if (routeId === "CreateGroup") {
      return (
        <CreateGroup
            navigator={navigator} />
      );
    }
    if (routeId === "LeaveGroup") {
      return (
        <LeaveGroup
            navigator={navigator} />
        );
    }
    if (routeId === "AddGroup") {
      return (
        <AddGroup
            navigator={navigator} />
      );
    }
    if (routeId === "RideResults") {
      return (
        <RideResults
            navigator={navigator} />
      );
    }
    if (routeId === "RideSeek") {
      return (
        <RideSeek
            navigator={navigator} />
      );
    }
    if (routeId === "GroupDetails") {
      return (
      <GroupDetails
          navigator= {navigator} />
        );
    }
    if (routeId === 'Tabs') {
      return (
        <Tabs
          navigator={navigator} />
      );
    }
    if (routeId === 'Register') {
      return (
        <Register
            navigator={navigator} />
      );
    }
    if (routeId === "Rides") {
      return (
        <RidesPage
            navigator={navigator} />
      );
    }
    if (routeId === "Groups") {
      return (
          <GroupsPage
            navigator={navigator} />
      );
    }
    return this.noRoute(navigator);

  }
  noRoute(navigator) {
    return (
      <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
        <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
            onPress={() => navigator.pop()}>
          <Text style={{color: 'red', fontWeight: 'bold'}}> Oops! </Text>
        </TouchableOpacity>
      </View>
    );
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
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('RideApp', () => App);