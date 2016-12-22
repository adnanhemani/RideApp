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

//Change this for our backend
var REQUEST_URL = 'https://calm-garden-29993.herokuapp.com/index/login/?';



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
  

  fetchData() {
    var params = {"email": this.state.email, "password": this.state.pw};
    console.log(params);
    fetch(REQUEST_URL + this.toQueryString(params)).then((response) => response.json())
      .then(((responseData) => {
        console.log(responseData);
        this.setState({
          responseFS: responseData
        });
        this.signin();
      }))
      .done();
    
      console.log("Here");  
        
 
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

                    <Text
                      style={{
                        color: 'black',
                        fontSize: 16,  
                        fontWeight: 'normal',
                        fontFamily: 'Helvetica Neue',
                        marginLeft: 10, 
                        marginTop: 20,                      
                      }}>
                      Email Address:
                    </Text>  
                       
                    <TextInput
                      style={styles.username}
                      placeholder={"Username"}
                      placeholderTextColor={"rgba(198,198,204,1)"}
                      onChangeText={(text) => {this.setState({email: text})}}
                      value={(this.state && this.state.email) || ''}
                    />  
  
                    <Text  
                      style={{
                        color: 'black',
                        fontSize: 16,
                        fontWeight: 'normal',
                        fontFamily: 'Helvetica Neue',
                        marginLeft: 10,  
                        marginTop: 20,                      
                      }}>
                      Password:
                    </Text>  
  
                    <TextInput  
                      style={styles.password}
                      placeholder={"Password"}
                      placeholderTextColor={"rgba(198,198,204,1)"}
                      secureTextEntry={true}
                      onChangeText={(text) => {this.setState({pw: text})}}
                      value={(this.state && this.state.pw) || ''}
                    />
                    
                    <CheckBox 
                      label="Remember me?"
                      checked={this.state.checkboxState}
                      onChange={() => this.changeCheckboxState()} />
                      
                    <TouchableElement
                        
                        onPress={() => this.fetchData()}>
                        <View style={styles.register}>
                            <Text style={styles.buttonText}>Sign In</Text>
                        </View>
                      </TouchableElement>
                      <TouchableElement
                        
                         onPress={this.register.bind(this)}>
                        <View style={styles.register}>
                            <Text style={styles.buttonText}>Register</Text>
                        </View>
                    </TouchableElement>
                    <TouchableElement
                        
                        onPress={() => this.forgot()}>
                        <View style={styles.register}>
                            <Text style={styles.forgotText}>Forgot Username or Password?</Text>
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
