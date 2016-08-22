import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  ScrollView,
  ListView,
  Alert,
} from 'react-native'
import CookieManager from 'react-native-cookies';
import NavigationBar from 'react-native-navbar';
var REQUEST_URL = 'https://calm-garden-29993.herokuapp.com/index/groups/?';
var POST_URL = 'https://calm-garden-29993.herokuapp.com/index/removefromgroup/?';


class LeaveGroup extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            loggedIn: true,
            dataSource: new ListView.DataSource({
              rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false,
        };
        this.fetchData();
        this.bindMethods();
    }
  
    bindMethods() {
        if (! this.bindableMethods) {
            return;
        }   

        for (var methodName in this.bindableMethods) {
            this[methodName] = this.bindableMethods[methodName].bind(this);
        }
    }
  
    backOneScene () {
      this.props.navigator.pop();
    }

    componentDidMount () {
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
    fetch(REQUEST_URL + this.toQueryString({"user": 2}))
      .then((response) => response.json())
      .then((responseData) => {
        console.log(JSON.parse(responseData.groups));
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(JSON.parse(responseData.groups)),
          loaded: true,
        });
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
    const backButton = {
        title: "Back",
        handler: () => this.backOneScene(),
      };
    if (!this.state.loaded) {
          return (<View>
              <Text>Loading!</Text>
            </View>);
        }
        else if (this.state.loggedIn) {
          return (
            <ScrollView>
            <NavigationBar
                      title={{ title: "Leave Group", tintColor: 'black', }}
                      style={{ backgroundColor: "white", }}
                      leftButton={backButton}
                      statusBar={{ tintColor: "white", }}
                    />
            <ListView
                
                dataSource = {this.state.dataSource}
                renderRow = {this.renderRide}
                style = {styles.listView}
                  
            />
            </ScrollView>
          );
        } else {
            this.props.navigator.push({id: "LoginPage", name:"Index"})
        }
    
  }
  
}

Object.assign(LeaveGroup.prototype, {
    bindableMethods : {
        renderRide (group) {
          return (
          <View>
              <Text onPress={() => this.wannaLeaveGroup(group)} style={styles.title}>{group.fields.name}</Text>
            </View>
          );
        },
        wannaLeaveGroup(group) {
            Alert.alert("Leaving Group", "Are you sure you want to leave this group?",
               [
                {text: 'OK', onPress: () => this.leaveGroup(group), style: "positive"},
                {text: 'Cancel', onPress: () => console.log('cancel pressed'), style: "cancel"},
          
              ]);
        },
        leaveGroup (group) {
          console.log("leave group requested");
          fetch(POST_URL + this.toQueryString({"user": 2, "group": group.pk}))
          .then((response) => response.json())
          .then((responseData) => {
            console.log(responseData);
            this.setState({
              afterLeaving: responseData,
            });
            this.afterPressing();
          })
          .done();
        },

        afterPressing () {
          if (this.state.afterLeaving.error === false){
            Alert.alert("Success!", "You have left the group!",
                 [
                  {text: 'OK', onPress: () => this.okPressed(), style: "positive"},
            
                ]);
          } else {
            Alert.alert("Failure", "Some error occurred when trying to remove you from the group. Please try again later or contact your group admin.",
                 [
                  {text: 'OK', onPress: () => this.okPressed(), style: "positive"},
            
                ]);
          }
        },

        okPressed () {
          console.log("ok pressed");
          this.props.navigator.push({id: "Tabs", name:"Tabs"});

        }

    }
});

var styles = StyleSheet.create({
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
    backgroundColor: 'powderblue',
    marginBottom: 50,
    
  },
});

module.exports = LeaveGroup;
