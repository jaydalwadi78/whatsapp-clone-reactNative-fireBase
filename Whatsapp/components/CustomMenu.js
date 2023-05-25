import React, { useState, useEffect } from 'react';
import { Platform, Dimensions, StatusBar, StyleSheet, Text,Alert, View, AsyncStorage, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ActivityIndicator } from 'react-native-paper';
import { Card, ListItem, Icon, Avatar, Badge, withBadge } from 'react-native-elements';


import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import firebase,{ db, createRoom, APIURL } from '../config/firebase';


export const CustomMenu = (props) => {
    
  const [userName, setuserName] = React.useState();
  const [userProfile, setuserProfile] = React.useState();
  const [userDetails, setuserDetails] = React.useState();
  const [Editusername, setEditusername] = React.useState();
  const [visible, setVisible] = useState(false);
  const [visibleImg, setVisibleImg] = useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);

  const navigation = useNavigation();
  let _menu = null;



 /* useEffect(() => {  
       (async () => {

               let userid = await AsyncStorage.getItem('userToken');

                try{
                  let response = await fetch(`${APIURL}user/${userid}`, {
                      method: 'GET',
                      headers: {
                          'Content-Type': 'application/json',
                      },                    
                  })                 
                  .then(response => response.json())
                  .then(data11 => {  
                   // console.log("WWWWWWYYYYYY",data11.result)
                          setuserDetails(data11.result), 
                          setuserName(data11.result.name),
                          setuserProfile(data11.result.profile)            
                  })
              }catch(error){
                  console.error("Error adding document: ", error);
              };
      }
          )();
       },[])*/


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
 

        <MenuItem onPress={() => hideMenu()}>
         Setting 
        </MenuItem>
 
      </Menu>
    </View>
  );
};
 