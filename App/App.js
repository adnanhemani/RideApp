'use strict';

import React, { Component } from 'react';
import {StyleSheet, Text, View, TextInput, TouchableHighlight} from 'react-native';
import CookieManager from 'react-native-cookies';
var t = require('tcomb-form-native');

//Import next frames here
import Rides from "./Rides";



//Change this for our backend
const LOGIN_URL = "http://localhost:80/login/";

var Form = t.form.Form;

var user = t.struct({
	username: t.String,
	password: t.String

	}
	);

var options = {};

export default class RideApplLogin extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			loggedIn: false,
			loadedCookie: false
		};
	}

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
	// If we have completed loading the cookie choose to show Login WebView or the LoggedIn component, else just show an empty View.
		if (this.state.loadedCookie) {
			if (this.state.loggedIn) {
				return (
					<Rides/>
				);
			}
			else {
				return (
					<View style={styles.container}>
					<Form ref="form" type={user} options={options} />
					<TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          				<Text style={styles.buttonText}>Save</Text>
        			</TouchableHighlight>
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
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: '#F5FCFF',
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
