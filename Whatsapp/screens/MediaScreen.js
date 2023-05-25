import * as React from 'react';
import { StyleSheet, View ,Image,Button,Alert,ScrollView,TouchableOpacity} from 'react-native';
import {TextInput,Text} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Card, ListItem, Icon ,Avatar} from 'react-native-elements';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import ImageScreen from './ImageScreen';
import FilesScreen from './FilesScreen';
import AudioScreen from './AudioScreen';
import LinksScreen from './LinksScreen';  

const Tab = createMaterialTopTabNavigator();

function MediaScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                if (route.name === 'Media') {
                } else if (route.name === 'Files') {
                } else if (route.name === 'Audio') {
                } else if (route.name === 'Links') {
                }
              },
            })}
            tabBarOptions={{
              activeTintColor: '#33cc00',
              inactiveTintColor: 'gray',
              indicatorStyle: {
                  borderBottomWidth: 2,
                  borderBottomColor: '#33cc00'
              },
            }}
    >
        <Tab.Screen name="Image" component={ImageScreen} />
        <Tab.Screen name="Files" component={FilesScreen} />
        <Tab.Screen name="Audio" component={AudioScreen} />
        <Tab.Screen name="Links" component={LinksScreen} />
    </Tab.Navigator>
  );
}


export default MediaScreen