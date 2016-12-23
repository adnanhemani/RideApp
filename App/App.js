import NavigationBar from 'react-native-navbar';
var CheckBox = require('react-native-checkbox');
'use strict';

import {Platform, TouchableHighlight,
  TouchableNativeFeedback } from "react-native";
import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TextInput,
  Navigator,
  Alert,
} from 'react-native';
import CookieManager from 'react-native-cookies';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';


//Change this for our backend
var REQUEST_URL = 'https://calm-garden-29993.herokuapp.com/index/userid/?';



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
      if (this.state.responseFS.logged_in === true) {
        var user = this.state.responseFS.user;
        if (this.state.checkboxState) {
          console.log("logged in with remembering");
          AsyncStorage.setItem("user", user.toString());
          this.props.navigator.push({id: "Tabs", name: "Tabs", passProps: {"user": user}});

        } else {
          console.log("logged in w/o remembering");
          this.props.navigator.push({id: "Tabs", name: "Tabs", passProps: {"user": user}});
        }

      } else {
        console.log("Error!");
        Alert.alert("Submission failed", this.state.responseFS.reason,
                 [
                  {text: 'OK', onPress: () => console.log('ok pressed'), style: "cancel"},

                ]);
      }  
    };
  
    changeCheckboxState () {
      this.setState({checkboxState: !this.state.checkboxState});
    };
    
    register () {
      console.log("register screen");
      this.props.navigator.push({id: "Register", name: "Register"})
    };
  
    forgot () {
      console.log("forgot");
    };

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
  

  fetchData(auth_email) {
    var params = {"email": auth_email};
    console.log(params);
    fetch(REQUEST_URL + this.toQueryString(params)).then((response) => response.json())
      .then(((responseData) => {
        console.log(responseData);
        this.setState({
          responseFS: responseData
        });
        //this.signin();
        this.signInpt2();
        console.log("Here");
      }))
      .done();
    
      console.log("Here");
      console.log(this.state);
      return true;
 
    }

	componentWillMount () {
  
		try {  
      AsyncStorage.getItem("user").then((value) => {
        if (value !== null){
          console.log(value);
          this.props.navigator.push({id: "Tabs", name: "Tabs", passProps: {"user": value}});
        } else {
          console.log("no remembered user data found");
        }  
      }).done();  
    } catch (error) {
      console.log("Error?");
    }
	}
  
    componentDidMount() {
      this._setupGoogleSignin();
    }
  
    async _setupGoogleSignin() {
      try {
        await GoogleSignin.hasPlayServices({ autoResolve: true });
        await GoogleSignin.configure({
          iosClientId: '1071146405706-6v346jkhkinr8o74g266tdf457dlurs9.apps.googleusercontent.com',
        });

        const user = await GoogleSignin.currentUserAsync();
        console.log(user);
        this.setState({user});
      }
      catch(err) {
        console.log("Google signin error", err.code, err.message);
      }
    }
  
    signIn() {
      GoogleSignin.signIn()
      .then((user) => {
        this.fetchData(user.email);
        console.log(user);
      })
      .catch((err) => {
        console.log("something went wrong while logging in");
        console.log(err);
      })
      .done();
    }
  
    signInpt2() {
        console.log(this.state);
        if (this.state.responseFS.logged_in === true) {
           if (this.state.checkboxState) {
            console.log("logged in with remembering");
            AsyncStorage.setItem("user", this.state.responseFS.user_id.toString());
            this.props.navigator.push({id: "Tabs", name: "Tabs", passProps: {"user": this.state.responseFS.user_id.toString()}});
             return true;
          } else {
            console.log("logged in w/o remembering");
            this.props.navigator.push({id: "Tabs", name: "Tabs", passProps: {"user": this.state.responseFS.user_id.toString()}});
            return true;
          }
        } else {
          console.log("email not found");
          this.props.navigator.push({id:"Register", name: "Register"});
          GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
            this.setState({user: null});
          })
          .done();
          return false;
        }
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
        var TouchableElement = TouchableHighlight;
        //console.log(Touchable Element);
        if (Platform.OS ===   'android') {
            TouchableElement = TouchableNativeFeedback;
        }  
				return (
					<View style={styles.container}>
                    
                    <NavigationBar
                               title={{ title: 'Sign In', tintColor: 'black', }}
                               style={{ backgroundColor: "white", }}
                               statusBar={{ tintColor: "white", }}
                             />

                    <TouchableElement onPress={() => this.signIn()}>
                        <View style={styles.register}>
                            <Text style={styles.buttonText}>Sign in with Google</Text>
                        </View>
                    </TouchableElement>
                    
                      <TouchableElement
                        
                          onPress={this.register.bind(this)}>
                        <View style={styles.register}>
                            <Text style={styles.buttonText}>Register</Text>
                        </View>
                    </TouchableElement>                    
        			</View>
				);

	}


}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
  username: {  
    height: 60, 
    width: 300,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.5)",
    marginLeft: 10,
    marginRight: 10,
      
  },  
  password: {
    height: 60,  
    width: 300,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.5)",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    
  },
  signin: {
    marginLeft: 10,
    backgroundColor: "lightgrey",
    justifyContent: "center",
    height: 40,
    marginRight: 10,
    marginTop: 20,
  },
  register: {
    marginLeft: 10,
    backgroundColor: "lightgrey",
    justifyContent: "center",
    height: 40,
    marginRight: 10,
    marginTop: 40,
  },
  forgot: {
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
});

module.exports = RideApplLogin;
