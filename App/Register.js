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
} from 'react-native'
import CookieManager from 'react-native-cookies';

class Register extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            loggedIn: true
        };
    }
  
  submitted () {
    console.log("submitted");
  }
  
  toSignIn () {
    console.log("Back to sign in screen");
    this.props.navigator.pop();
  }
  
  render () {
    console.log("render");
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
                      onChangeText={(text) => {this.setState({fName: text})}}
                      onSubmitEditing={() => {this.setState({fName: ''})}}
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
                      onChangeText={(text) => {this.setState({lName: text})}}
                      onSubmitEditing={() => {this.setState({lName: ''})}}
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
                      onChangeText={(text) => {this.setState({phone: text})}}
                      onSubmitEditing={() => {this.setState({phone: ''})}}
                      value={(this.state && this.state.phone) || ''}
                      keyboardType={'phone-pad'}
                    />
                    <Text
                      style={styles.emailText}>
                      Email Address:
                    </Text>
                    <TextInput
                      style={styles.emailTextInput}
                      placeholder={'Email'}
                      placeholderTextColor={"rgba(198,198,204,1)"}
                      onChangeText={(text) => {this.setState({email: text})}}
                      onSubmitEditing={() => {this.setState({email: ''})}}
                      value={(this.state && this.state.email) || ''}
                      keyboardType={'email-address'}
                    />
                    <Text
                      style={styles.riderOrDriver}>
                      Are you a rider or driver?
                    </Text>
                    <Picker 
                      style={styles.riderDriverSelector}
                      selectedValue={(this.state && this.state.riderDriver) || 'rider'}
                      onValueChange={(value) => {
                        this.setState({riderDriver: value})
                      }}>
                      <Picker.Item label={'Rider'} value={'rider'} />
                      <Picker.Item label={'Driver'} value={'driver'} />
                    </Picker>
                    <Text
                      style={styles.carSelect}>
                      If you are a driver, do you own your own car?
                    </Text>
                    <Picker 
                      style={styles.carSelector}
                      selectedValue={(this.state && this.state.carOrNah) || 'Yes'}
                      onValueChange={(value) => {
                        this.setState({carOrNah: value})
                      }}>
                      <Picker.Item label={'Yes'} value={"y"} />
                      <Picker.Item label={'No'} value={"n"} />
                    </Picker>
                    <Text
                      style={styles.groupText}>
                      What group would you like to join?
                    </Text>
                    <Picker 
                      style={styles.groupsPicker}
                      selectedValue={(this.state && this.state.group) || 'a'}
                      onValueChange={(value) => {
                        this.setState({group: value})
                      }}>
                      <Picker.Item label={'Cal Ismailis Rideshare'} value={'Cal Ismailis Rideshare'} />
                    </Picker>
                    <TouchableElement
                        style={styles.submit}
                        onPress={() => this.submitted()}>
                        <View>
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
    top: 0,
  },
  fNameInput: {
    height: 30, 
    width:  200 ,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.5)",
    marginLeft: 10,
    top: 10,
    
  },
  lName: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'normal',
    fontFamily: 'Helvetica Neue',
    marginLeft: 10,
    top: 20,
    
  },
  lNameInput: {
    height: 30, 
    width:  200 ,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.5)",
    marginLeft: 10,
    top: 25,
  },
  phoneNumber: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'normal',
    fontFamily: 'Helvetica Neue',
    marginLeft: 10,
    top: 41,
    
  },
  phoneNumberInput: {
    height: 30, 
    width:  200 ,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.5)",
    marginLeft: 10,
    top: 41,
    
  },
  emailText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'normal',
    fontFamily: 'Helvetica Neue',
    marginLeft: 10,
    top: 57,
  },
  emailTextInput: {
    height: 30, 
    width:  200 ,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.5)",
    marginLeft: 10,
    top: 57,
    
  },
  riderOrDriver: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'normal',
    fontFamily: 'Helvetica Neue',
    marginLeft: 10,
    top: 73,
    
  },
  carSelect: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'normal',
    fontFamily: 'Helvetica Neue',
    marginLeft: 10,
    top: 20,
    
  },
  riderDriverSelector: {
    marginLeft: 10,
    top: 35,
    
  },
  carSelector: {
    marginLeft: 10,
    top: -50,
    
    
  },
  groupText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'normal',
    fontFamily: 'Helvetica Neue',
    marginLeft: 10,
    top: -80,
  },
  groupsPicker: {
    marginLeft: 10,
    top: -130,
  },
  submit: {
    marginLeft: 10,
    backgroundColor: "lightgrey",
    justifyContent: "center",
    height: 40,
    marginRight: 10,
    top: -200,
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