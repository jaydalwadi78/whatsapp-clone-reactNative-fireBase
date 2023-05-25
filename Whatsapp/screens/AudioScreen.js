import React, { useState,useEffect,usePermissions } from 'react';
import { StyleSheet, View ,Image,Button,Alert,ScrollView,TouchableOpacity,FlatList,TouchableHighlight,SafeAreaView} from 'react-native';
import {TextInput,Text} from 'react-native-paper';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';  
import { Card, ListItem, Icon ,Avatar} from 'react-native-elements';
import { Audio } from 'expo-av';


const list = [
  {
    name: '1.Mp3',
    avatar_url: 'https://images.newindianexpress.com/uploads/user/imagelibrary/2020/5/15/w900X450/Disha_Patani.jpg',
  },
  {
    name: '2.Mp3',
    avatar_url: 'http://192.168.1.20/whatsapp/assets/images3.jpeg',
  },
  {
    name: '3.Mp3',
    avatar_url: 'http://192.168.1.20/React_native_whatsapp_new/assets/images5.jpg',
  },
  {
    name: '4.Mp3',
    avatar_url: 'http://192.168.1.20/React_native_whatsapp_new/assets/images4.jpeg',
  },
  {
    name: '5.Mp3',
    avatar_url: 'http://192.168.1.20/React_native_whatsapp_new/assets/images6.jpeg',
  },

]


const AudioScreen = () => {
const [sound, setSound] = React.useState(false);

 
 async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       require('./assets/Hello.mp3')

       
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync(); }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);


 async function pauseSound() {
    console.log('Pause Sound');
    await sound.pauseAsync();
  }


   const renderItem = ({ item }) => (
    <View>    
        <View>
            <ListItem bottomDivider>                                  
                    <Avatar rounded size ={50} source={require('../assets/audio.png')} />                                                            
                <ListItem.Content>
                    <ListItem.Title style={{fontWeight: "bold"}}>{item.name}</ListItem.Title>      
                  <TouchableOpacity style={styles.control} onPress={sound ? pauseSound : playSound}>
                    {sound  ? (
                      <Ionicons name='ios-pause' size={48} color='#444' />
                    ) : (
                      <Ionicons name='ios-play-circle' size={48} color='#444' />
                    )}
                  </TouchableOpacity>        
                </ListItem.Content>
            </ListItem>
        </View>   
    </View>
  );
  return(
     <SafeAreaView>
     <View >
            <FlatList
                data={list}
                renderItem={renderItem}
                keyExtractor={(item) => "item_" + Math.floor((Math.random()*100000000) + 1) +item.name}
            />
            </View>
      </SafeAreaView>
  )
}


export default AudioScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});
