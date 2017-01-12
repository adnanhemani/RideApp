'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  ScrollView,
} from 'react-native'
import RideApplLogin from './App';
import RidesPage from "./RidesPage";
import Tabbar, { Tab, RawContent, IconWithBar, glypyMapMaker, Rawbar } from 'react-native-tabbar';
import Register from "./Register";
import GroupsPage from "./GroupsPage";
import SettingsPage from "./SettingsPage";


const glypy = glypyMapMaker({
  Groups: 'e900',
  Rides: 'e902',
  Settings: 'e901',
});

class Tabs extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            loggedIn: true,
            noback: true,
        };
    }
    
    settingsPressed () {
      console.log("a");
      this.props.navigator.push({id:"LoginPage", name: "LoginPage"});
    }

  
    render () {
        return (
        <Navigator
            renderScene={this.renderScene.bind(this)}
            navigator = {this.props.navigator}
           />
        );
      }

    renderScene (route, navigator) {
        if (this.state.loggedIn) {
            return (
                   <Tabbar ref="myTabbar" barColor={'gray'}>
                    <Tab name="Groups">
                      <IconWithBar label="Groups" type={glypy.Groups} from={'icomoon'}/>
                      <RawContent>
                        <GroupsPage navigator={this.props.navigator} user={this.props.user}/>
                      </RawContent>
                    </Tab>
                     <Tab name="Rides">
                      <IconWithBar label="Rides" type={glypy.Rides} from={'icomoon'}/>
                      <RawContent>
                        <RidesPage navigator={this.props.navigator} user={this.props.user}/>
                      </RawContent>
                    </Tab>
                    <Tab name="Settings">
                      <IconWithBar label="Settings" type={glypy.Settings} from={'icomoon'}/>
                      <RawContent>
                        <SettingsPage navigator={this.props.navigator} user={this.props.user}/>
                      </RawContent>
                    </Tab>
                  </Tabbar>
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

module.exports = Tabs;