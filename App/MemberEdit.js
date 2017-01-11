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
import NavigationBar from 'react-native-navbar';
var REQUEST_URL = 'https://calm-garden-29993.herokuapp.com/index/removefromgroup/?';


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
      this.fetchData();
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
    fetch(REQUEST_URL + this.toQueryString({"group": this.props.group_info.pk, "user": this.props.member_info.pk}))
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        Alert.alert("Success!", "User was removed from your group!",
               [
                {text: 'OK', onPress: () => console.log('ok pressed'), style: "cancel"},

              ]);
        
      })
      .done();
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
