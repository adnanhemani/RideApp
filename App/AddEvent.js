import NavigationBar from 'react-native-navbar';
'use strict';
var CheckBox = require('react-native-checkbox');

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TextInput,
  Picker,
  ScrollView,
  Alert,
} from 'react-native'
import {
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
} from "react-native";

import CookieManager from 'react-native-cookies';


import {
  Select,
  Option,
  OptionList,
  updatePosition
} from "react-native-dropdown";


class AddEvent extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            loggedIn: true,
            rando: "a",
            prefLocation: "",
            rte: false,
            rfe: false,
            latest: false,
            time: "",
          
        };

    }
  
  
  backOneScene () {
    this.props.navigator.pop();
  }
  
  submitted () {
    console.log("submitted form");
    Alert.alert("Submission successful", "Your new ride event was successfully received!",
               [
                {text: 'OK', onPress: () => console.log('ok pressed'), style: "cancel"},

              ]);
    }
  
  render () {
    return (
    <Navigator
          renderScene={this.renderScene.bind(this)}
          navigator = {this.props.navigator}
          ref='navigator'
      /> );
    }
  
    renderScene(route, navigator) {
      var TouchableElement = TouchableHighlight;
              //console.log(TouchableElement);
              if (Platform.OS === 'android') {
                TouchableElement = TouchableNativeFeedback;
              }
      const backButton = {
        title: "Back",
        handler: () => this.backOneScene(),
      };
        
      return (
              <ScrollView style={styles.container}>
              <NavigationBar
                      title = {{title: "Add Event", tintColor: 'black',}}
                      style={{ backgroundColor: "white", }}
                      leftButton={backButton}
                      statusBar={{ tintColor: "white", }}
                    />
                <Text style={styles.selectLocationText}>Event Name</Text>
                <TextInput
                  style={{
                    height: 45, 
                    width:  300 ,
                    borderWidth: 1,
                    borderColor: "rgba(0,0,0,0.5)",
                    marginLeft: 10,
                  }}
                  placeholder={'Event Name'}
                  placeholderTextColor={"rgba(198,198,204,1)"}
                  onChangeText={(text) => {this.setState({eventName: text})}}
                  onSubmitEditing={() => {this.setState({eventName: ''})}}
                  value={(this.state && this.state.eventName) || ''}
                />
                <Text style={styles.specReqsText}>Message about event:</Text>
                <TextInput
                  style={{
                    height: 90, 
                    width:  300 ,
                    borderWidth: 1,
                    borderColor: "rgba(0,0,0,0.5)",
                    marginLeft: 10,
                  }}
                  placeholder={'Message about event'}
                  placeholderTextColor={"rgba(198,198,204,1)"}
                  onChangeText={(text) => {this.setState({eventMessage: text})}}
                  onSubmitEditing={() => {this.setState({eventMessage: ''})}}
                  value={(this.state && this.state.eventMessage) || ''}
                />
                <Text style={styles.specReqsText}>Event Time</Text>
                <TextInput
                  style={{
                    height: 45, 
                    width: 100,
                    borderWidth: 1,
                    borderColor: "rgba(0,0,0,0.5)",
                    marginLeft: 10,
                  }}
                  placeholder={'Time'}
                  placeholderTextColor={"rgba(198,198,204,1)"}
                  onChangeText={(text) => {this.setState({seats: text})}}
                  onSubmitEditing={() => {this.setState({seats: ''})}}
                  value={(this.state && this.state.seats) || ''}
                  keyboardType="numeric"
                />
                <Text style={styles.specReqsText}>Event Expiry Time</Text>
                <TextInput
                  style={{
                    height: 45, 
                    width: 100,
                    borderWidth: 1,
                    borderColor: "rgba(0,0,0,0.5)",
                    marginLeft: 10,
                  }}
                  placeholder={'Time'}
                  placeholderTextColor={"rgba(198,198,204,1)"}
                  onChangeText={(text) => {this.setState({seats: text})}}
                  onSubmitEditing={() => {this.setState({seats: ''})}}
                  value={(this.state && this.state.seats) || ''}
                  keyboardType="numeric"
                />
                <View style={styles.submitlol}/>
                <TouchableElement
                        style={styles.submit}
                        onPress={() => this.submitted()}>
                        <View style={styles.submit}>
                            <Text style={styles.submitText}>Submit</Text>
                        </View>
                </TouchableElement>
                <OptionList style={{backgroundColor:'#fff'}} ref="OPTIONLIST"/>
              </ScrollView>
        
            );
    }
  
  
}

var styles = StyleSheet.create({
  topContainer : {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
  },
  submitlol: {
    marginTop: 60,
    
  },
  submitText: {
    color: 'black',
    fontSize:  16 ,
    fontWeight: 'normal',
    fontFamily: 'Helvetica Neue',
    alignSelf: "center",
  },
  checkboxes: {
    backgroundColor: '#F5FCFF',
    marginLeft: 10,
    marginRight: 10,

  },
  specReqsText : {
    color: 'black',
    fontSize:  16 ,
    fontWeight: 'normal',
    fontFamily: 'Helvetica Neue',
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 10,
    
  },
  selectLocationText : {
    color: 'black',
    fontSize:  16 ,
    fontWeight: 'normal',
    fontFamily: 'Helvetica Neue',
    marginBottom: 5,
    marginTop: 10,
    marginLeft: 10,
    
  },
  headerOtherText : {
    color: 'black',
    fontSize:  15 ,
    fontWeight: 'normal',
    fontFamily: 'Helvetica Neue',
    alignSelf: "center",
    backgroundColor: "#ffffff",
    
  },
  headTitle: {
    color: 'black',
    fontSize:  30 ,
    fontWeight: 'normal',
    fontFamily: 'Helvetica Neue',
    alignSelf: "center",
    
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
  submit: {
    marginLeft: 10,
    backgroundColor: "lightgrey",
    justifyContent: "center",
    height: 40,
    marginRight: 10,
  },
});
module.exports = AddEvent;