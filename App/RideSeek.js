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

var REQUEST_URL = 'https://calm-garden-29993.herokuapp.com/index/requestride/?';




class RideSeek extends Component {

  constructor(props, context) {
      super(props, context);
      this.state = {
          loggedIn: true,
          rando: "a",
          prefLocation: 0,
          rte: false,
          rfe: false,
          latest: false,
          time: "",
          seats: 0,
          responseFS: "",
      };

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
    var specreqs = this.state.rte.toString()[0] + this.state.rfe.toString()[0] + this.state.latest.toString()[0];
    if (this.state.time === "" || this.state.seats === 0) {
      var params = {"user": this.props.user, "driver_leaving_time": "None", "driver_spaces": 0, "special_requests": specreqs, "event_id": this.props.ride_info.pk, "pref_location": this.state.prefLocation};
    }
    else {
      var params = {"user": this.props.user, "driver_leaving_time": this.state.time, "driver_spaces": parseInt(this.state.seats), "pref_location": this.state.prefLocation, "special_requests": specreqs, "event_id": this.props.ride_info.pk};
    }
    console.log(params);
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
    if (this.state.responseFS.error === false) {
    Alert.alert("Submission successful", "Your ride request was successfully received!",
               [
                {text: 'OK', onPress: () => console.log('ok pressed'), style: "cancel"},

              ]);
    }
    else {
      console.log("Error!");
      Alert.alert("Submission failed", "Your ride request wasn't recieved. Please try again. If you cannot send your ride request multiple times, please contact your group administrator. Error occurred: ".concat(this.state.responseFS.reason),
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
        
      var eventTime = new Date(); 
      eventTime = JSON.stringify(this.props.ride_info.fields.event_time);
      eventTime = new Date(JSON.parse(eventTime));
  
      var expiryTime = new Date();  
      expiryTime = JSON.stringify(this.props.ride_info.fields.signup_expiry_time);
      expiryTime = new Date(JSON.parse(expiryTime));
      return (
              <ScrollView style={styles.container}>
              <NavigationBar
                      style={{ backgroundColor: "white", }}
                      leftButton={backButton}
                      statusBar={{ tintColor: "white", }}
                    />  
                <View style={styles.topContainer}>
                <Text style={styles.headTitle}>
                  Event Name: {this.props.ride_info.fields.name}
                </Text>
                <Text style={styles.headerOtherText}>Event Time: {eventTime.toString()}</Text>
                <Text style={styles.headerOtherText}>Event Signup Expiry: {expiryTime.toString()}</Text>
                </View>
                <Text style={styles.selectLocationText}>Preferred Locations</Text>

                <Picker 
                      style={styles.picker}
                      selectedValue={(this.state && this.state.prefLocation) || 0}
                      onValueChange={(value) => {
                        this.setState({prefLocation: value})
                      }}>
                      <Picker.Item label={"None"} value={0} />
                      <Picker.Item label={'Telegraph and Parker'} value={1} />
                      <Picker.Item label={'2718 College Ave'} value={2} />
                    </Picker>

                <Text style={styles.specReqsText}>If you plan on driving, what time will you be leaving?</Text>
                <DatePicker
                  style={{width: 200}}
                  date={this.state.time}
                  mode="time"
                  format="HH:mm"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  minuteInterval={5}
                  onDateChange={(time) => {this.setState({time: time});}}
                />
                <Text style={styles.specReqsText}>If you plan on driving, how many open spaces will be in your car?</Text>
                <TextInput
                  style={{
                    height: 45, 
                    width: 100,
                    borderWidth: 1,
                    borderColor: "rgba(0,0,0,0.5)",
                    marginLeft: 10,
                  }}
                  placeholder={'Open Spaces'}
                  placeholderTextColor={"rgba(198,198,204,1)"}
                  onChangeText={(text) => {this.setState({seats: text})}}
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
                        onPress={() => this.fetchData()}>
                        <View style={styles.submit}>
                            <Text style={styles.submitText}>Submit</Text>
                        </View>
                    </TouchableElement>
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
  riderDriverSelector: {
    marginLeft: 10,
        
  },

  picker: {
    marginLeft: 10,
  }
});
module.exports = RideSeek;