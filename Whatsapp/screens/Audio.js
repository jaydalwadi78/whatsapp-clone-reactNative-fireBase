import React, { useState,useEffect,usePermissions } from 'react';
import { Text, View, StyleSheet, Button, AsyncStorage, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import firebase, { sendStatus, getAllStatus, db, getCurrentStatus, sendMessage, APIURL } from '../config/firebase';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

export default function Aud(props) {
 const [recording, setRecording] = React.useState();

const Audiofilename = "audio_02.m4a";
 const navigation = useNavigation();
  console.log("JJJJ",props)

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      console.log('Starting recording..');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync(); 
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI(); 
    console.log('Recording stopped and stored at', uri);

    const response = await fetch(uri);
    const blob = await response.blob();

    const tempImage = await firebase
      .storage()
      .ref()
      .child('Chat_Audio/'+ Math.floor((Math.random()*100000000) + 1) +'.m4a')
      .put(blob);
      console.log("Audio uploaded");
      const Audiourl = await tempImage.ref.getDownloadURL();
      console.log("AudioURLLL",JSON.stringify(Audiourl));
      
      let userid = await AsyncStorage.getItem('userToken');
      let room_id = props.route.params.room_id;
      try { 
            let response = await fetch(`${APIURL}sendAudiomessages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                      {
                          userid:userid,
                          room_id:room_id,
                          Audiourl:Audiourl        
                      }
                  ),
            })
            .then(response => response.json())     
            .then(data => {
                console.log("click audio ")
            })
            .catch((error) => {
                console.error('Error:', error);
            });
          } catch (error) {
              console.error(error);
      }
/*

    let room_id = props.route.params.room_id;
    sendMessage(room_id,{Audiourl})*/

  }

  return (
    <View style={styles.container}>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
       <TouchableOpacity style={{width:120,height:50,backgroundColor:'lightgray',margin:5,alignSelf:'center',alignItems:'center',justifyContent:'center'}} onPress={()=>{navigation.navigate('Chat')}}>
            <Text>Back</Text>
        </TouchableOpacity>    
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});


