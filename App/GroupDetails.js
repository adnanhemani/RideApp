import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  ScrollView,
  ListView,
} from 'react-native'
import CookieManager from 'react-native-cookies';
import NavigationBar from 'react-native-navbar';
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';


class GroupDetails extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            loggedIn: true,
            dataSource: new ListView.DataSource({
              rowHasChanged: (row1, row2) => row1 !== row2,
            }),
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
    if (!this.state.loaded) {
          return (<View>
              <Text>Loading!</Text>
            </View>);
        }
        else if (this.state.loggedIn) {
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
                Group Name: {this.state.rando}
              </Text>
              <Text style={styles.headerOtherText}>Group Leader: {this.state.rando}</Text>
              <Text style={styles.headerOtherText}>{this.state.rando} people in this group.</Text>
                <ListView
                
                  dataSource = {this.state.dataSource}
                  renderRow = {this.renderRide}
                  style = {styles.listView}
                  renderHeader = {this.header}
                  
                  />
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
