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
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';


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
  
    fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
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
        renderRide (ride) {
          return (
          <View>
              <Text onPress={() => this.wannaLeaveGroup()} style={styles.title}>{ride.title}</Text>
            </View>
          );
        },
        wannaLeaveGroup() {
            Alert.alert("Leaving Group", "Are you sure you want to leave this group?",
               [
                {text: 'OK', onPress: () => this.leaveGroup(), style: "positive"},
                {text: 'Cancel', onPress: () => console.log('cancel pressed'), style: "cancel"},
          
              ]);
        },
        leaveGroup () {
          console.log("leave group requested");
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
    backgroundColor: '#0000ff',
    marginBottom: 50,
    
  },
});

module.exports = LeaveGroup;
