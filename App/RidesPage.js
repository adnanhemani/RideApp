import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  ScrollView,
  ListView,
  RefreshControl,
} from 'react-native'
import NavigationBar from 'react-native-navbar';
var REQUEST_URL = 'https://calm-garden-29993.herokuapp.com/index/ridesessions/?';


class RidesPage extends Component {

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
    fetch(REQUEST_URL + this.toQueryString({"user": this.props.user}))
      .then((response) => response.json())
      .then((responseData) => {
        var ds;
        try {
            ds = this.state.dataSource.cloneWithRows(JSON.parse(responseData.groups));
          } catch (err) {
            ds = null;
          }
        this.setState({
          dataSource: ds,
          loaded: true,
        });
      })
      .done();
      this.setState({refreshing: false});
    }

    _onRefresh() {
      this.setState({refreshing: true});
      this.fetchData();
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
          return (
            <View>
            <NavigationBar
                      title={{ title: "Active Rides Sessions", tintColor: 'black', }}
                      style={{ backgroundColor: "#e9eaed", }}
                      statusBar={{ tintColor: "white", }}
                    />
            <ListView
                
                dataSource = {this.state.dataSource}
                renderRow = {this.renderRide}
                style = {styles.listView}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh.bind(this)}
                  />
                }
                  
            />
            </View>
          );
        } else {
            this.props.navigator.push({id: "LoginPage", name:"Index"})
        }
    
  }
  
}

Object.assign(RidesPage.prototype, {
    bindableMethods : {
        renderRide (ride) {
          return (
          <View style={styles.row}>
              <Text onPress={() => this.rideSeek(ride)} style={styles.title}>{ride.fields.name}</Text>
            </View>
          );
        },
        rideSeek(ride) {
          
            this.props.navigator.push({id:"RideSeek", name: "RideSeek", passProps: {ride_info: ride, user: this.props.user}});
        },
        rideResults () {
          this.props.navigator.push({id:"RideResults", name:"RideResults"});
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
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
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
    paddingTop: 0,
    paddingBottom: 550,
  },
});

module.exports = RidesPage;
