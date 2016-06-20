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


class GroupMgmtOptions extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            loggedIn: true,
          
        };

    }
    
   addEvent () {
     console.log("add event pressed");
   }
  
  groupMemberMgmt () {
    console.log("group member management pressed");
  }
  
  backOneScene () {
      this.props.navigator.pop();
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
      handler: () => this.backOneScene(),
    };
    return (
            <View>
            <NavigationBar
                      title={{ title: "Settings", tintColor: 'black', }}
                      style={{ backgroundColor: "white", }}
                      leftButton={backButton}
                      statusBar={{ tintColor: "white", }}
                    />
            <TouchableElement
                style={styles.submit}
                onPress={() => this.addEvent()}>
                <View>
                    <Text style={styles.submitText}>Add event</Text>
                </View>
            </TouchableElement>
            <TouchableElement
                style={styles.submit}
                onPress={() => this.groupMemberMgmt()}>
                <View>
                    <Text style={styles.submitText}>Manage group members</Text>
                </View>
            </TouchableElement>
            </View>
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

module.exports = GroupMgmtOptions;
