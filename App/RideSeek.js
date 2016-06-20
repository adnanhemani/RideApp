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


class RideSeek extends Component {

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
  
    showTimePicker() {
        var date = this.state.date;
        this.picker.showTimePicker(date, (d)=>{
            this.setState({date:d});
        });
    }
  
    _getOptionList() {
      return this.refs.navigator.refs['OPTIONLIST'];
    }

    componentDidUpdate () {
        updatePosition(this.refs.navigator.refs['SELECT1']);
        updatePosition(this.refs.navigator.refs['OPTIONLIST']);

    }

    setPrefLocation(location) {
    this.setState({
        prefLocation: location
      });
    }
  
  rideToEvent () {
    this.setState({rte: !this.state.rte});
  }
  
  rideFromEvent() {
    this.setState({rfe: !this.state.rfe});
  }
  
  latestPickup () {
    this.setState({latest: !this.state.latest});
  }
  
  backOneScene () {
    this.props.navigator.pop();
  }
  
  submitted () {
    console.log("submitted form");
    Alert.alert("Submission successful", "Your ride request was successfully received!",
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
                      style={{ backgroundColor: "white", }}
                      leftButton={backButton}
                      statusBar={{ tintColor: "white", }}
                    />
                <View style={styles.topContainer}>
                <Text style={styles.headTitle}>
                  Event Name: {this.state.rando}
                </Text>
                <Text style={styles.headerOtherText}>Event Time: {this.state.rando}</Text>
                <Text style={styles.headerOtherText}>Event Signup Expiry: {this.state.rando}</Text>
                </View>
                <Text style={styles.selectLocationText}>Preferred Location</Text>
                <Select
                  width={250}
                  ref="SELECT1"
                  optionListRef={this._getOptionList.bind(this)}
                  defaultValue="Select a Preferred Location"
                  onSelect={this.setPrefLocation.bind(this)}>
                  <Option>Location 1</Option>
                  <Option>Location 2</Option>
                  <Option>Location 3</Option>
                </Select>
                <Text style={styles.specReqsText}>If you plan on driving, what time will you be leaving?</Text>
                <TextInput
                  style={{
                    height: 30, 
                    width: 100,
                    borderWidth: 1,
                    borderColor: "rgba(0,0,0,0.5)",
                    marginLeft: 10,
                  }}
                  placeholder={'Time'}
                  placeholderTextColor={"rgba(198,198,204,1)"}
                  onChangeText={(text) => {this.setState({time: text})}}
                  onSubmitEditing={() => {this.setState({time: ''})}}
                  value={(this.state && this.state.time) || ''}
                />
                <Text style={styles.specReqsText}>If you plan on driving, how many open spaces will be in your car?</Text>
                <TextInput
                  style={{
                    height: 30, 
                    width: 100,
                    borderWidth: 1,
                    borderColor: "rgba(0,0,0,0.5)",
                    marginLeft: 10,
                  }}
                  placeholder={'Open Spaces'}
                  placeholderTextColor={"rgba(198,198,204,1)"}
                  onChangeText={(text) => {this.setState({seats: text})}}
                  onSubmitEditing={() => {this.setState({seats: ''})}}
                  value={(this.state && this.state.seats) || ''}
                  keyboardType="numeric"
                />
                <Text style={styles.specReqsText}>Special Requests: (Please be curteous)</Text>
                <CheckBox 
                      style={styles.checkboxes}
                      label="Ride to event ONLY"
                      checked={this.state.rte}
                      onChange={() => this.rideToEvent()} />
                <CheckBox 
                      style={styles.checkboxes}
                      label="Ride from event ONLY"
                      checked={this.state.rfe}
                      onChange={() => this.rideFromEvent()} />
                <CheckBox 
                      style={styles.checkboxes}
                      label="Latest possible time for pickup."
                      checked={this.state.latest}
                      onChange={() => this.latestPickup()} />
                <View style={{ height: 30 }}/>
                <TouchableElement
                        style={styles.submit}
                        onPress={() => this.submitted()}>
                        <View>
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
  submit: {
    marginTop: 30,
    
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
module.exports = RideSeek;