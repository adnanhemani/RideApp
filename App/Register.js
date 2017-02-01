import NavigationBar from 'react-native-navbar'
'use strict';

import React, { Component } from 'react';
import {
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
} from "react-native"
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
var REQUEST_URL = 'https://calm-garden-29993.herokuapp.com/index/register/?';

class Register extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            loggedIn: true,
            myNumber: '',
            group: 1,
            animating: false,
            riderDriver: "Rider"
        };
    }
  
  submitted () {
    console.log("submitted");
    if (!this.state.riderDriver) {
      Alert.alert("Rider or Driver not selected", "Please choose one option",
               [
                {text: 'OK', onPress: () => console.log("ok pressed"), style: "cancel"},

              ]);
    } else {
      this.fetchData();
    }
  }
  
  toSignIn () {
    console.log("Back to sign in screen");
    this.props.navigator.pop();
  }
  
  onChangedPN(text){
    let numbers = '0123456789';
    if (numbers.indexOf(text[text.length - 1])>-1 || text === '') {
      this.setState({myNumber: text})
    } else {
      alert("Please enter numbers only");
      this.setState({myNumber: text.substring(0, text.length - 1)});
      text = text.substring(0, text.length - 1);
    }
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
    Alert.alert("Processing", "Hang on there!",
               [
                {text: 'OK', onPress: () => console.log("ok pressed"), style: "cancel"},

              ]);
              
    var driverParams = "False";
    var ownCarParams = "False";
    if (this.state.riderDriver === "Rider") {
      driverParams = "False";
      ownCarParams = "False";
    } else if (this.state.riderDriver === "Driver with own car") {
      driverParams = "True";
      ownCarParams = "True";
    } else {
      driverParams = "True";
      ownCarParams = "False";
    }
    var params = {"fname": this.state.fName.toLowerCase(), "lname": this.state.lName.toLowerCase(), "phone_number": this.state.myNumber, "email": this.state.email.toLowerCase(), 
        "driver": driverParams, "own_car": ownCarParams, "g": this.state.group, "pw": this.state.pw}
    fetch(REQUEST_URL + this.toQueryString(params)).then((response) => response.json())
      .then(((responseData) => {  
        console.log(responseData);
        this.setState({  
          responseFS: responseData
        });
        if (this.state.responseFS.success === true) {
          this.successAlert();
        } else {
          this.failAlert();
        }
        this.setState({animating: false});
      }))  
      .done();
         
    }  

    successAlert () {
      Alert.alert("Success!", "",
               [
                {text: 'OK', onPress: () => this.toSignIn(), style: "cancel"},

              ]);
    }

    failAlert() {  
      if (this.state.responseFS.reason === "A user already exists with this username") {
        Alert.alert("Submission failed", "A user already exists with that email. Please contact your group admin if you think this is a mistake.",
                 [
                  {text: 'OK', onPress: () => console.log('ok pressed'), style: "cancel"},

                ]);
        } else {
          Alert.alert("Submission failed", "Some input of yours is incorrect/blank. Please try again.",
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
        handler: () => this.toSignIn(),
      };
        
      return (
                <ScrollView>
                    <NavigationBar
                      title={{ title: "Register", tintColor: 'black', }}
                      style={{ backgroundColor: "white", }}
                      leftButton={backButton}
                      statusBar={{ tintColor: "white", }}
                    />
                    <Text
                      style={styles.fName}>
                      First Name:
                    </Text>
                    <TextInput
                      style={styles.fNameInput}
                      placeholder={'First Name'}
                      placeholderTextColor={"rgba(198,198,204,1)"}
                      returnKeyType="next"
                      onChangeText={(text) => {this.setState({fName: text})}}
                      value={(this.state && this.state.fName) || ''}
                    />
                    <Text
                      style={styles.lName}>
                      Last Name:
                    </Text>
                    <TextInput
                      style={styles.lNameInput}
                      placeholder={'Last Name'}
                      placeholderTextColor={"rgba(198,198,204,1)"}
                      returnKeyType="next"
                      onChangeText={(text) => {this.setState({lName: text})}}
                      value={(this.state && this.state.lName) || ''}
                    />
                    <Text
                      style={styles.phoneNumber}>
                      Phone Number:
                    </Text>
                     <TextInput
                      style={styles.phoneNumberInput}
                      placeholder={'Phone Number'}
                      placeholderTextColor={"rgba(198,198,204,1)"}
                      returnKeyType="next"
                      onChangeText={(text)=> this.onChangedPN(text)}
                      value={(this.state && this.state.myNumber) || ''}
                      keyboardType={'phone-pad'}
                      maxLength = {10}
                    />
                      <Text
                          style={styles.emailText}>
                        Email Address:
                    </Text>
                    <TextInput
                      style={styles.emailTextInput}
                      placeholder={'Email'}
                      placeholderTextColor={"rgba(198,198,204,1)"}
                      returnKeyType="next"
                      onChangeText={(text) => {this.setState({email: text})}}
                      value={(this.state && this.state.email) || ''}
                      keyboardType={'email-address'}
                    />
                    <Text
                      style={styles.riderOrDriver}>
                      Are you a rider or driver?
                    </Text>
  
                    <Picker 
                      style={styles.riderDriverSelector}
                        selectedValue={(this.state && this.state.riderDriver) || "Rider"}
                      onValueChange={(value) => {
                        this.setState({riderDriver: value})
                      }}>
                      <Picker.Item label={'Rider'} value={'Rider'} />
                      <Picker.Item label={'Driver with own car'} value={'Driver with own car'} />
                      <Picker.Item label={'Driver with Zipcar'} value={'Driver with Zipcar'} />
                    </Picker>
                    <Text
                      style={styles.groupText}>
                      What group would you like to join?
                    </Text>
                    <Picker 
                        style={styles.groupsPicker}
                        selectedValue={(this.state && this.state.group) || 1}
                      onValueChange={(value) => {
                        this.setState({group: value})
                      }}>
                      <Picker.Item label={'Cal Ismailis Rideshare'} value={1} />
                    </Picker>
                    <TouchableElement
                        style={styles.submit}
                        onPress={() => this.submitted()}>
                        <View style={styles.submit}>
                          <Text style={styles.submitText}>Submit</Text>
                      </View>
                  </TouchableElement>
                </ScrollView>
        
            );
    }
  
  
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
  fName: {    
    color: 'black',
    fontSize: 16,
    fontWeight: 'normal',
    fontFamily: 'Helvetica Neue',
    marginLeft: 10,
  },
  fNameInput: {
    height: 45, 
    width:  200 ,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.5)",
    marginLeft: 10,    
  },
  lName: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'normal',
    fontFamily: 'Helvetica Neue',
    marginLeft: 10,
    marginTop: 20
  },
  lNameInput: {
    height: 45, 
    width:  200 ,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.5)",
    marginLeft: 10,
  },  
  phoneNumber: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'normal',
    fontFamily: 'Helvetica Neue',
    marginLeft: 10,
    marginTop: 20,
      
  },
  phoneNumberInput: {
    height: 45, 
    width:  200 ,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.5)",
    marginLeft: 10,
      
  },  
  emailText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'normal',
    fontFamily: 'Helvetica Neue',
    marginLeft: 10,
    marginTop: 20,
  },  
  emailTextInput: {
    height: 45, 
    width:  200 ,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.5)",
    marginLeft: 10,
        
  },
  riderOrDriver: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'normal',
    fontFamily: 'Helvetica Neue',
    marginLeft: 10,
    marginTop: 20,    
  },  
  carSelect: {  
    color: 'black',
    fontSize: 16,
    fontWeight: 'normal',
    fontFamily: 'Helvetica Neue',
    marginLeft: 10,
    marginTop: 20,    
  },  
  riderDriverSelector: {
    marginLeft: 10,
          
  },
  carSelector: {
    marginLeft: 10,
    
    
  },
  groupText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'normal',
    fontFamily: 'Helvetica Neue',
    marginLeft: 10,
  },
  groupsPicker: {
    marginLeft: 10,
  },
  submit: {
    marginLeft: 10,
    backgroundColor: "lightgrey",
    justifyContent: "center",
    height: 40,
    marginRight: 10,
  },
  submitText: {
    alignSelf: "center",
    color: 'black',
    fontSize: 16,
    fontWeight: 'normal',
    fontFamily: 'Helvetica Neue',
  },
});
module.exports = Register;        