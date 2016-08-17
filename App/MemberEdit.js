import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  ScrollView,
  ListView,
  Alert,
} from 'react-native';
import {
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
} from "react-native";
import CookieManager from 'react-native-cookies';
import NavigationBar from 'react-native-navbar';
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';


class MemberEdit extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            loggedIn: true,
          
        };

    }
  
    backOnePage () {
      this.props.navigator.pop();
    }
    
    phone () {
      console.log("change phone number");
    }
  
    email () {
      console.log("change email address");
    }
  
    rdstatus () {
      console.log("change r/d status");
    }
  
    owncarstatus () {
      console.log("change owns car status");
    }
  
    deleteMember () {
      console.log("delete member");
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
              //console.log(TouchableElement);
              if (Platform.OS === 'android') {
                TouchableElement = TouchableNativeFeedback;
              }
    const backButton = {
            title: "Back",
            handler: () => this.backOnePage(),
          };
    return (
            <ScrollView>
            <NavigationBar
                      title={{ title: "Settings", tintColor: 'black', }}
                      style={{ backgroundColor: "white", }}
                      leftButton = {backButton}
                      statusBar={{ tintColor: "white", }}
                    />
            <TouchableElement
                onPress={() => this.phone()}>
                <View style={styles.submit}>
                    <Text style={styles.submitText}>Change Phone Number</Text>
                </View>
            </TouchableElement>
            <TouchableElement
                onPress={() => this.email()}>
                <View style={styles.submit}>
                    <Text style={styles.submitText}>Change Email Address</Text>
                </View>
            </TouchableElement>
            <TouchableElement
                onPress={() => this.rdstatus()}>
                <View style={styles.submit}>
                    <Text style={styles.submitText}>Change Ride/Driver Status</Text>
                </View>
            </TouchableElement>
            <TouchableElement
                onPress={() => this.owncarstatus()}>
                <View style={styles.submit}>
                    <Text style={styles.submitText}>Change Owns Car Status</Text>
                </View>
            </TouchableElement>
            <TouchableElement
                onPress={() => this.deleteMember()}>
                <View style={styles.submit}>
                    <Text style={styles.submitText}>Delete Member</Text>
                </View>
            </TouchableElement>
            </ScrollView>
    );

    
  }
  
}


var styles = StyleSheet.create({
  submit: {
    marginLeft: 10,
    backgroundColor: "lightgrey",
    justifyContent: "center",
    height: 40,
    marginRight: 10,
    marginTop: 30,

  },
  submitText: {
    color: 'black',
    fontSize:  16 ,
    fontWeight: 'normal',
    fontFamily: 'Helvetica Neue',
    alignSelf: "center",
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff7f50',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#0000ff',
    marginBottom: 50,
    
  },
});

module.exports = MemberEdit;
