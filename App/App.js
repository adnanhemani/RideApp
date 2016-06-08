import NavigationBar from 'react-native-navbar';
var CheckBox = require('react-native-checkbox');
'use strict';

import {Platform, TouchableHighlight,
  TouchableNativeFeedback } from "react-native";
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Navigator,
} from 'react-native';
import CookieManager from 'react-native-cookies';
var Button = require('react-native-button');







//Change this for our backend
const LOGIN_URL = "http://localhost:80/login/";

var options = {};

class RideApplLogin extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			loggedIn: false,
			loadedCookie: false,
            checkboxState: true,
		};
	}
  
    signin () {
      console.log("signed in");
      this.props.navigator.push({id: "Rides", name: "Rides"})
    };
  
    changeCheckboxState () {
      console.log(!this.state.checkboxState);
      this.setState({checkboxState: !this.state.checkboxState});
    };
    
    register () {
      console.log("register screen");
      this.props.navigator.push({id: "Register", name: "Register"})
    };
  
    forgot () {
      console.log("forgot");
    };

	componentWillMount () {
		CookieManager.get(LOGIN_URL, (cookie) => {
			let isAuthenticated;
			// If it differs, change `cookie.remember_me` to whatever the name for your persistent cookie is!!!
			if (cookie && cookie.indexOf('remember_me') != -1) {
				isAuthenticated = true;
			}
			else {
				//CHANG THIS BACK
				isAuthenticated = false;
			}

			this.setState({
				loggedIn: isAuthenticated,
				loadedCookie: true
			});
		});
	}
  
    render () {
      return (
      <Navigator
          renderScene={this.renderScene.bind(this)}
          navigator = {navigator}
         />
      );
    }
  
  

	renderScene (route, navigator) {
	// If we have completed loading the cookie choose to show Login WebView or the LoggedIn component, else just show an empty View.
		if (this.state.loadedCookie) {
			if (this.state.loggedIn) {
				return (
					<Rides/>
				);
			}
			else {
              var TouchableElement = TouchableHighlight;
              //console.log(TouchableElement);
              if (Platform.OS === 'android') {
                TouchableElement = TouchableNativeFeedback;
              }
				return (
					<View style={styles.container}>
                    
                    <NavigationBar
                               title={{ title: 'Sign In', tintColor: 'black', }}
                               style={{ backgroundColor: "white", }}
                               statusBar={{ tintColor: "white", }}
                             />
                     
                    <TextInput
                      style={styles.username}
                      placeholder={"Username"}
                      placeholderTextColor={"rgba(198,198,204,1)"}
                      onChangeText={(text) => {this.setState({username})}}
                      onSubmitEditing={() => {this.setState({username: ''})}}
                      value={(this.state && this.state.username) || ''}
                    />
                    <TextInput
                      style={styles.password}
                      placeholder={"Password"}
                      placeholderTextColor={"rgba(198,198,204,1)"}
                      onChangeText={(text) => {this.setState({pw})}}
                      onSubmitEditing={() => {this.setState({pw: ''})}}
                      value={(this.state && this.state.pw) || ''}
                    />
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 16,
                        fontWeight: 'normal',
                        fontFamily: 'Helvetica Neue',
                        marginLeft: 10,
                        top: 0,
                       
                      }}>
                      Username:
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 16,
                        fontWeight: 'normal',
                        fontFamily: 'Helvetica Neue',
                        marginLeft: 10,
                        top: 80,
                        
                      }}>
                      Password:
                    </Text>
                    <TouchableElement
                        style={styles.signin}
                        onPress={() => this.signin()}>
                        <View>
                            <Text style={styles.buttonText}>Sign In</Text>
                        </View>
                    </TouchableElement>
                    <TouchableElement
                        style={styles.register}
                        onPress={this.register.bind(this)}>
                        <View>
                            <Text style={styles.buttonText}>Register</Text>
                        </View>
                    </TouchableElement>
                    <TouchableElement
                        style={styles.forgot}
                        onPress={() => this.forgot()}>
                        <View>
                            <Text style={styles.forgotText}>Forgot Username or Password?</Text>
                        </View>
                    </TouchableElement>
                    <CheckBox 
                      label="Remember me?"
                      checked={this.state.checkboxState}
                      onChange={() => this.changeCheckboxState()} />
        			</View>
				);
			}
		} else {
			return (
			<View></View>
			);
		}
	}


}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
  username: {
    height: 30, 
    width: 300,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.5)",
    top: 80,
    marginLeft: 10,
    marginRight: 10,
    
  },
  password: {
    height: 30, 
    width: 300,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.5)",
    top: 150,
    marginLeft: 10,
    marginRight: 10,
    
  },
  signin: {
    top: 180,
    marginLeft: 10,
    backgroundColor: "lightgrey",
    justifyContent: "center",
    height: 40,
    marginRight: 10,
  },
  register: {
    top: 230,
    marginLeft: 10,
    backgroundColor: "lightgrey",
    justifyContent: "center",
    height: 40,
    marginRight: 10,
  },
  forgot: {
    top: 300,
    marginLeft: 10,
    backgroundColor: "lightgrey",
    justifyContent: "center",
    height: 40,
    width: 100,
    marginRight: 10,
  },
  buttonText: {
    alignSelf: "center",
  },
  forgotText: {
    alignSelf: "center",
    fontSize: 11,
  },
  buttonCont: {
    padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'white', top: 200,
  },
  rightContainer: {
	flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  welcome: {
	textAlign: 'center',
	color: '#333333',
	marginBottom: 5,
  },
});

module.exports = RideApplLogin;
