import Glowne from '../screens/Glowne';
import Harmonogramy from '../screens/Harmonogramy';
import Zglos from '../screens/Harmonogramy';
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Button, Image, StyleSheet, Text, View } from 'react-native';


const Navigation =  createMaterialBottomTabNavigator(
    {
      ZglosScreen: { screen: Zglos,
        navigationOptions:{title: '  ', tabBarIcon: ({focused}) =><Ionicons name="ios-apps" size={32} color={focused ? '#FFF' : '#DACE91'}/>}  },
      GlowneScreen: { screen: Glowne,
        navigationOptions:{title: '', tabBarIcon: ({focused}) =><Ionicons name="ios-camera" size={32} color={focused ? '#FFF' : '#DACE91'}/>}  },
      HarmonogramyScreen:{ screen: Harmonogramy,
       navigationOptions:{title: '   ', tabBarIcon: ({focused}) =><Ionicons name="ios-search" size={32} color={focused ? '#FFF' : '#DACE91'}/>} },
    
    },
    {
      initialRouteName: 'GlowneScreen',
      activeColor: '#f5f5f5',
      inactiveColor: 'white',
      barStyle: { backgroundColor: '#2fd756' },
    }
  );

  export default createAppContainer(Navigation);
