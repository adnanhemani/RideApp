import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  ScrollView,
  ListView,
} from 'react-native';
import CookieManager from 'react-native-cookies';
import NavigationBar from 'react-native-navbar';
var REQUEST_URL = 'https://calm-garden-29993.herokuapp.com/index/admingroups/?';


class GroupMgmt extends Component {

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

    componentDidMount () {
      this.fetchData();
    }
  
    backOneScene () {
      this.props.navigator.pop();
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
    fetch(REQUEST_URL + this.toQueryString({"user": 1}))
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
    if (!this.state.loaded) {
          return (<View>
              <Text>Loading!</Text>
            </View>);
        }
        else if (this.state.loggedIn) {
          const backButton = {
            title: "Back",
            handler: () => this.backOneScene(),
          };
          return (
            <ScrollView>
            <NavigationBar
                      title={{ title: "Group Management", tintColor: 'black', }}
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

Object.assign(GroupMgmt.prototype, {
    bindableMethods : {
        renderRide (group) {
          return (
          <View>
              <Text onPress={() => this.groupPressed(group)} style={styles.title}>{group.fields.name}</Text>
            </View>
          );
        },
        groupPressed(group) {
            this.props.navigator.push({id:"GroupMgmtOptions", name: "GroupMgmtOptions", passProps: {group_info: group}});
        },
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

module.exports = GroupMgmt;
