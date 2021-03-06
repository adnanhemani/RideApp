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
import OneSignal from 'react-native-onesignal';

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
var AddEvent = require("./App/AddEvent");
var MemberMgmt = require("./App/MemberMgmt");
var MemberEdit = require("./App/MemberEdit");

class App extends Component {
  render() {
    OneSignal.enableInAppAlertNotification(true);
    OneSignal.setSubscription(true);
    var pendingNotifications = [];

    OneSignal.configure({
        onIdsAvailable: function(device) {
            console.log('UserId = ', device.userId);
            console.log('PushToken = ', device.pushToken);
        },
      onNotificationOpened: function(message, data, isActive) {
          var notification = {message: message, data: data, isActive: isActive};
          console.log('NOTIFICATION OPENED: ', notification);
          pendingNotifications.push(notification);
          handleNotification(notification);
      }
    });
    
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
    if (routeId === "MemberEdit") {
      return (
        <MemberEdit
          navigator={navigator} {...route.passProps}/>
      );
    }
    if (routeId === "MemberMgmt") {
      return (
        <MemberMgmt
          navigator={navigator} {...route.passProps}/>
      );
    }
    if (routeId === "AddEvent") {
      return (
        <AddEvent
          navigator={navigator} {...route.passProps}/>
      );
    }
    if (routeId === "GroupMgmtOptions") {
      return (
        <GroupMgmtOptions
            navigator={navigator} {...route.passProps}/>
      );
    }
    if (routeId === "GroupMgmt") {
      return (
        <GroupMgmt
            navigator = {navigator} {...route.passProps}/>
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
            navigator={navigator} {...route.passProps}/>
        );
    }
    if (routeId === "AddGroup") {
      return (
        <AddGroup
            navigator={navigator} {...route.passProps}/>
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
            navigator={navigator} {...route.passProps}/>
      );
    }
    if (routeId === "GroupDetails") {
      return (
      <GroupDetails
          navigator= {navigator} {...route.passProps} />
        );
    }
    if (routeId === 'Tabs') {
      return (
        <Tabs
          navigator={navigator} {...route.passProps}/>
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
            navigator={navigator} {...route.passProps}/>
      );
    }
    if (routeId === "Groups") {
      return (
          <GroupsPage
            navigator={navigator} {...route.passProps}/>
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