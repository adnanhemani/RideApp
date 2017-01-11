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

import DatePicker from 'react-native-datepicker';

var REQUEST_URL = 'https://calm-garden-29993.herokuapp.com/index/adminmakenewevent/?';



import {
  Select,
  Option,
  OptionList,
  updatePosition
} from "react-native-dropdown";


class AddEvent extends Component {

    constructor(props, context) {
        super(props, context);
        var date = this.formatDate(new Date());
        this.state = {
            loggedIn: true,
            rando: "a",
            prefLocation: "",
            rte: false,
            rfe: false,
            latest: false,
            eventTime: date,
            expiryTime: date,
          
        };

    }
  
  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour = d.getHours(),
        time = d.getMinutes();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (hour.length < 2) hour = '0' + hour;
    if (time.length < 2) time = '0' + time;

    return [year, month, day].join('-') + " " + [hour, time].join(':');
  }
  
  
  backOneScene () {
    this.props.navigator.pop();
  }

  toQueryString(obj) {
      return obj ? Object.keys(obj).sort().map(function (key) {
          var val = obj[key];

          if (Array.isArray(val)) {
              return val.sort().map(function (val2) {
                  return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
              }).join('&');
          }

          return encodeURIComponent(key) + '=' + encodeURIComponent(val);
      }).join('&') : '';
    }
  

  fetchData() {
    var d = new Date();
    var n = d.getTimezoneOffset();
    var offset = (n/60) * -1;
    console.log(offset);
    this.setState({eventTime: this.state.eventTime.toString() + offset.toString()});

    var params = {"name": this.state.eventName, "event_time": this.state.eventTime.toString() + offset.toString(), 
      "signup_expiry": this.state.expiryTime.toString() + offset.toString(), "group": this.props.group_info.pk, "active": true, "about": this.state.eventMessage};
    fetch(REQUEST_URL + this.toQueryString(params)).then((response) => response.json())
      .then(((responseData) => {
        console.log(responseData);
        this.setState({
          responseFS: responseData
        });
        this.submitted();
      }))
      .done();

      console.log("Here");
      
 
    }
  
  submitted () {
    console.log("submitted form");
    if (this.state.responseFS.error === false) {
      Alert.alert("Submission successful", "Your new ride event was successfully received!",
                 [
                  {text: 'OK', onPress: () => console.log('ok pressed'), style: "cancel"},

                ]);
      }
      else {
      Alert.alert("Failure", "Some error occurred in your request. Possible error might be that you are not following the correct time format. Please try again.",
                 [
                  {text: 'OK', onPress: () => console.log('ok pressed'), style: "cancel"},

                ]);
    }
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
                      title = {{title: "Add Event" , tintColor: 'black',}}
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
                  placeholderTextColor={"rgba(198, 198,204,1)"}
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
                <DatePicker
                  style={{width: 200}}
                  date={this.state.eventTime}
                  mode="datetime"
                  format="YYYY-MM-DD HH:mm"
                  placeholder="select date"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  onDateChange={(date) => {this.setState({eventTime: date})}}
                />
                <Text style={styles.specReqsText}>Event Expiry Time</Text>
                <DatePicker
                  style={{width: 200}}
                  date={this.state.expiryTime}
                  mode="datetime"
                  format="YYYY-MM-DD HH:mm"
                  placeholder="select date"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  onDateChange={(date) => {this.setState({expiryTime: date})}}
                />
                <View style={styles.submitlol}/>
                <TouchableElement
                        style={styles.submit}
                        onPress={() => this.fetchData()}>
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