import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  ScrollView,
  ListView,
} from 'react-native'
import NavigationBar from 'react-native-navbar';
var REQUEST_URL = 'https://calm-garden-29993.herokuapp.com/index/groupsinfo/?';


class GroupDetails extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            loggedIn: true,
            loaded: false,
            rando: "a",
          
        };
        this.fetchData();
    }
  
    backOnePage () {
      this.props.navigator.pop();
    }
  
  
    renderRide (ride) {
      return (
      <View>
          <Text style={styles.title}>{ride.title}</Text>
          
        </View>
      );
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
      console.log(this.props.group_info.pk);
      fetch(REQUEST_URL + this.toQueryString({"group": this.props.group_info.pk}))
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        this.setState({
          group_info: responseData,
          loaded: true,
        });
      })
      .done();
      
    }
  
  render () {  
    if (!this.state.loaded) {
          return (<View>  
              <Text>Loading!</Text>
            </View>);
        }
        else if (this.state.loggedIn) {
          console.log(this.props.group_info.fields);
          console.log(this.state);
          console.log(this.state.group_info[0]);
          const backButton = {
            title: "Back",
            handler: () => this.backOnePage(),
          };
          return (
           <ScrollView>
              <NavigationBar
                      style={{ backgroundColor: "white", }}
                      leftButton={backButton}
                      statusBar={{ tintColor: "white", }}
                    />
            
              <Text style={styles.headTitle}>
                Group Name: {this.state.group_info.name}
              </Text>
              <Text style={styles.headerOtherText}>Group Leader: {this.state.group_info.admin}</Text>
              <Text style={styles.headerOtherText}>{this.state.group_info.users} people in this group.</Text>
              </ScrollView>
          );
        } else {
            this.props.navigator.push({id: "LoginPage", name:"Index"})
        }  
      
  }
  
}
var styles = StyleSheet.create({
  headerOtherText : {
    color: 'black',
    fontSize:  15 ,
    fontWeight: 'normal',
    fontFamily: 'Helvetica Neue',
    alignSelf: "center",
    
  },
  headTitle: {
    color: 'black',
    fontSize:  30 ,
    fontWeight: 'normal',
    fontFamily: 'Helvetica Neue',
    alignSelf: "center",
    
  },
  header: {
    marginTop: 20,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    
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
    backgroundColor: '#0000ff',
    paddingBottom: 200,
  },
});

module.exports = GroupDetails;
