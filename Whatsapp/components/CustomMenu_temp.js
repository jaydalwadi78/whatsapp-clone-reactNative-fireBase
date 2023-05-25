import React, { useState, useEffect } from 'react';
import { Platform, Dimensions, StatusBar, StyleSheet, Text,Alert, View, AsyncStorage, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



import { ActivityIndicator } from 'react-native-paper';
import { Card, ListItem, Icon, Avatar, Badge, withBadge } from 'react-native-elements';


import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';



export const CustomMenu = (props) => {

  const navigation = useNavigation();
  let _menu = null;

  const hideMenu = () => {
    _menu.hide();
     navigation.navigate('Setting') 

  };
  return (
    <View style={props.menustyle}>
      <Menu
        ref={(ref) => (_menu = ref)}
        button={
          props.isIcon ? (
            <TouchableOpacity onPress={() => _menu.show()}>
              <Image
                source={{
                  uri:
                    'https://reactnativecode.com/wp-content/uploads/2020/12/menu_icon.png',
                }}
                style={{width: 30, height: 30}}
              />
            </TouchableOpacity>
          ) : (
            <Text onPress={() => _menu.show()} >             
            </Text>
          )
        }>
        <MenuItem onPress={() => {Alert.alert('PopUp Menu Button Clicked...')}}>
          Profile
        </MenuItem>
 
        <MenuItem disabled>Disabled Menu Item 2</MenuItem>
 
        <MenuDivider />

        <MenuItem onPress={() => hideMenu()}>
         Setting
        </MenuItem>
 
      </Menu>
    </View>
  );
};
 