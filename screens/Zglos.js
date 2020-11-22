import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Zglos extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex:1, backgroundColor: 'white'}}>
        <Text> zglos </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    
});