import React, { useState,useEffect,usePermissions } from 'react';
import { StyleSheet, View ,Image,Button,Alert,ScrollView,AsyncStorage,Share,TouchableOpacity,ActivityIndicator,FlatList,TouchableHighlight,SafeAreaView} from 'react-native';
import {TextInput,Text} from 'react-native-paper';
import { NavigationContainer, useNavigation, useFocusEffect  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Card, ListItem, Icon ,Avatar} from 'react-native-elements';
import { Audio } from 'expo-av';
import { Ionicons,AntDesign,FontAwesome,Entypo,MaterialCommunityIcons,MaterialIcons,FontAwesome5 } from '@expo/vector-icons';
import firebase,{ db, createRoom, APIURL } from '../config/firebase';

const SettingScreen = (props) => {

    const [sound, setSound] = React.useState(false);
    const [userName, setuserName] = React.useState();
    const [userProfile, setuserProfile] = React.useState();
    const [userMobileno, setMobileno] = React.useState();
    const [isLoading, setisLoading] = React.useState(true);

    const [userDetails, setuserDetails] = React.useState();

    const [Editusername, setEditusername] = React.useState();
    const [visible, setVisible] = useState(false);
    const [visibleImg, setVisibleImg] = useState(false);
    const [selectedImage, setSelectedImage] = React.useState(null);

const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      (async () => {


  console.log("UUUUUUUUUUUUUUUUUUUU",userDetails);

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
                      setuserProfile(data11.result.profile),
                      setisLoading(false)            
              })
          }catch(error){
              console.error("Error adding document: ", error);
          };
        }
      )();
    }, [])
  );


 async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       require('./assets/Hello.mp3')      
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync(); 
  }

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




  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Hey,  WhatsApp Messagers is fast, simple and secure app that i use that to message and call the people I care about',
      }); 
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }

  const renderItem = ({ item }) => (

    <View>    
        <View>
            <ListItem bottomDivider>                                  
                  <Entypo name="key" size={24} color="green" />                                                      
                  <ListItem.Content>
                    <ListItem.Title style={{fontWeight: "bold"}}>{item.name}</ListItem.Title>      
                  <TouchableOpacity style={styles.control} onPress={sound ? pauseSound : playSound}>            
                  </TouchableOpacity>        
                </ListItem.Content>
            </ListItem>
        </View>   
    </View>
  );


 if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color="#075E54" size="large" />
            </View>
        )
    }


  return(



     <SafeAreaView>
      <View>    
        <View>
              
             <View>
                <TouchableHighlight onPress={ ()=>navigation.navigate('ProfileEditScreen', {
                        userDetails: userDetails,
                    })}>
                  <ListItem bottomDivider>                                  
                          <Image
                              style={styles.logo}
                              source= {userProfile ? { uri: userProfile } : require('../assets/images/default.jpg')}
                          />
                         <ListItem.Content>
                          <ListItem.Title style={{fontSize:20}}>{userDetails.name ? userDetails.name : 'Waiting ... '}</ListItem.Title>      
                         <ListItem.Subtitle>
                                       Busy
                        </ListItem.Subtitle>       
                      </ListItem.Content>
                  </ListItem>
                </TouchableHighlight>
             </View>

            <ListItem>                                  
                    <Entypo name="key" size={24} color="#128C7E" />                                                      
                    <ListItem.Content>
                    <ListItem.Title>Account</ListItem.Title>     
                    <ListItem.Subtitle>
                                    Privacy, security,change number
                      </ListItem.Subtitle>   
                  <TouchableOpacity style={styles.control} onPress={sound ? pauseSound : playSound}>            
                  </TouchableOpacity>        
                </ListItem.Content>
            </ListItem>

            <ListItem>                                  
                  <Ionicons name="chatbox-sharp" size={24} color="#128C7E" />                                                     
                   <ListItem.Content>
                    <ListItem.Title>Chats</ListItem.Title>      
                      <ListItem.Subtitle>
                                   Theme,wallpapers, chat history
                      </ListItem.Subtitle>  
                  <TouchableOpacity style={styles.control} onPress={sound ? pauseSound : playSound}>            
                  </TouchableOpacity>        
                </ListItem.Content>
            </ListItem>


            <ListItem>                                  
                    <Ionicons name="notifications" size={24} color="#128C7E" />                                       
                   <ListItem.Content>
                    <ListItem.Title>Notifications</ListItem.Title>   
                        <ListItem.Subtitle>
                                    Message, group & call tones
                      </ListItem.Subtitle>     
                  <TouchableOpacity style={styles.control} onPress={sound ? pauseSound : playSound}>            
                  </TouchableOpacity>        
                </ListItem.Content>
            </ListItem>


             <ListItem>                                  
                  <MaterialIcons name="data-usage" size={24} color="#128C7E" />                                                   
                   <ListItem.Content>
                    <ListItem.Title>Storage and data</ListItem.Title>
                      <ListItem.Subtitle>
                                    Network usage, auto download
                      </ListItem.Subtitle>        
                  <TouchableOpacity style={styles.control} onPress={sound ? pauseSound : playSound}>            
                  </TouchableOpacity>        
                </ListItem.Content>
            </ListItem>

            <TouchableOpacity style={styles.control} onPress={sound ? pauseSound : playSound}> 
             <ListItem bottomDivider>                                  
                  <Ionicons name="help-circle-outline" size={24} color="#128C7E" />                                                  
                   <ListItem.Content>
                    <ListItem.Title>Help</ListItem.Title>  
                      <ListItem.Subtitle>
                                    Help center, contact us, privacy policy
                      </ListItem.Subtitle>      
                </ListItem.Content>
            </ListItem>
             </TouchableOpacity>        

            <TouchableOpacity  onPress={onShare}> 
                <ListItem bottomDivider>                    
                     <FontAwesome5 name="user-friends" size={15} color="#128C7E" />                                                 
                       <ListItem.Content>                        
                        <ListItem.Title>Invite a friend</ListItem.Title>                                
                    </ListItem.Content>
                </ListItem>
            </TouchableOpacity>        

        </View>   
    </View>
      </SafeAreaView>
  )
}


export default SettingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
      logo:{
        width: 70,
        height: 70,
        borderRadius: 70
    },
});
