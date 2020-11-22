import React, { Component, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Navigation from './navigation/Navigation'
import Glowne from './screens/Glowne';
import {AppLoading} from 'expo'
import * as Font from 'expo-font'
import firebase from "firebase";

const fetchFonts = () => {
  return Font.loadAsync({
    rubikMedium: require('./assets/fonts/Rubik-Medium.ttf'),
    rubikRegular: require('./assets/fonts/Rubik-Regular.ttf'),
    rubikLight: require('./assets/fonts/Rubik-Light.ttf')

  })
}

var config = {
  apiKey: "AIzaSyBrSjfZ8rR-_q-oyPcdQgvbi4yV8Lbg4E0",
  authDomain: "czystych.firebaseapp.com",
  databaseURL: "https://czystych.firebaseio.com",
  projectId: "czystych",
  storageBucket: "czystych.appspot.com",
  messagingSenderId: "213689257019",
  appId: "1:213689257019:web:f1d201bc125e18cd9ee01e"
};
firebase.initializeApp(config);

export default function App() {

  const [dataLoaded, setDataLoaded] = useState(false);

  if(!dataLoaded){
    return <AppLoading
    startAsync={fetchFonts}
    onFinish={() => setDataLoaded(true)}
    onError={(err) => console.log(err) }
    />
  }

  return (
   <Navigation />
  );
}
const styles = StyleSheet.create({
  
});