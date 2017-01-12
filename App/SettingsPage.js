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
  AsyncStorage,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
} from "react-native";
import NavigationBar from 'react-native-navbar';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';


class SettingsPage extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            loggedIn: true,
        };

    }
  
    googleSignOut() {
      GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
        this.setState({user: null});
      })
      .done();
    }
    
    logout () {
      console.log("log out");
      try {
        AsyncStorage.removeItem("user");
        this.googleSignOut();
      } catch (error) {
        console.log("Error?");
        console.log(error);
      }
      this.props.navigator.push({id: "LoginPage", name: "LoginPage"});
    }
  
    addGroup () {
      console.log("add group");
      this.props.navigator.push({id: "AddGroup", name: "AddGroup", passProps: {user: this.props.user}});
    }
  
    leaveGroup () {
      this.props.navigator.push({id:"LeaveGroup", name: "LeaveGroup", passProps: {user: this.props.user}});
    }
  
    createGroup () {
      console.log("create group");
      //this.props.navigator.push({id:"AddGroup", name: "AddGroup"});
      Alert.alert("Feature not operational", "This feature does not currently work.",
               [
                {text: 'OK', onPress: () => console.log('ok pressed'), style: "cancel"},

              ]);
    }
  
    manageGroup () {
      console.log("group management");
      this.props.navigator.push({id:"GroupMgmt", name:"GroupMgmt", passProps: {user: this.props.user}});
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
    return (
            <ScrollView>
            <NavigationBar
                      title={{ title: "Settings", tintColor: 'black', }}
                      style={{ backgroundColor: "white", }}
                      statusBar={{ tintColor: "white", }}
                    />
            <TouchableElement
                onPress={() => this.logout()}>
                <View style={styles.submit}>
                    <Text style={styles.submitText}>Log Out</Text>
                </View>
            </TouchableElement>
            <TouchableElement
                onPress={() => this.addGroup()}>
                <View style={styles.submit}>
                    <Text style={styles.submitText}>Add Group</Text>
                </View>
            </TouchableElement>
            <TouchableElement
                onPress={() => this.leaveGroup()}>
                <View style={styles.submit}>
                    <Text style={styles.submitText}>Leave Group</Text>
                </View>
            </TouchableElement>
            <TouchableElement
                onPress={() => this.createGroup()}>
                <View style={styles.submit}>
                    <Text style={styles.submitText}>Create Group</Text>
                </View>
            </TouchableElement>
            <TouchableElement
                onPress={() => this.manageGroup()}>
                <View style={styles.submit}>
                    <Text style={styles.submitText}>Group Management</Text>
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

module.exports = SettingsPage;
