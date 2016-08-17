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

class AddGroup extends Component {

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
                      title={{ title: "Add Group", tintColor: 'black', }}
                      style={{ backgroundColor: "white", }}
                      leftButton={backButton}
                      statusBar={{ tintColor: "white", }}
                    />
                    <Text
                      style={styles.fName}>
                      What group would like like to become a part of?
                    </Text>
                    <Picker 
                      style={styles.riderDriverSelector}
                      selectedValue={(this.state && this.state.riderDriver) || 'rider'}
                      onValueChange={(value) => {
                        this.setState({riderDriver: value})
                      }}>
                      <Picker.Item label={'Cal Ismailis Rideshare'} value={'Cal Ismailis Rideshare'} />
                    </Picker>
                    <TouchableElement
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
    marginTop: 40,
  },
  submitText: {
    alignSelf: "center",
    color: 'black',
    fontSize: 16,
    fontWeight: 'normal',
    fontFamily: 'Helvetica Neue',
  },
});
module.exports = AddGroup;
