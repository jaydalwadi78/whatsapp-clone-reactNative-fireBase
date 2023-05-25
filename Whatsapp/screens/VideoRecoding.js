import React, { Component } from "react";
import { View, Text, TouchableOpacity, Alert,AsyncStorage } from "react-native";
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera';
import { Audio,Video } from 'expo-av';
import firebase, { sendStatus, getAllStatus, db, getCurrentStatus, sendMessage, APIURL } from '../config/firebase';


class VideoRecoding extends Component {
  constructor(props){
        super(props);
        this.state={
          showCamera: false,
          video: null,
          picture: null,
          recording: false
        }
       console.log("RRR",props)
    }


 _saveVideo = async () => {
  
    const { video } = this.state;
    console.log("Video urllll >>>>>>>>>>>>>>>>>>>>>>>>>",video.uri)
    const asset = await MediaLibrary.createAssetAsync(video.uri);


    const response = await fetch(video.uri);
    const blob = await response.blob();

    const tempImage = await firebase
      .storage()
      .ref()
      .child('Chat_Video/'+ Math.floor((Math.random()*100000000) + 1) +'.mp4')
      .put(blob);
      console.log("Video uploaded");
      const Videourl = await tempImage.ref.getDownloadURL();
      console.log("VideourlLLLLLL",JSON.stringify(Videourl));

      let userid = await AsyncStorage.getItem('userToken');
      let room_id = this.props.route.params.room_id;
      try { 
            let response = await fetch(`${APIURL}sendvideomessages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                      {
                          userid:userid,
                          room_id:room_id,
                          Videourl:Videourl        
                      }
                  ),
            })
            .then(response => response.json())     
            .then(data => {
                console.log("click video ")
            })
            .catch((error) => {
                console.error('Error:', error);
            });
          } catch (error) {
              console.error(error);
      }

    if (asset) {
      this.setState({ video: null });
      this.props.navigation.navigate('Audio');
    }

  };

  _StopRecord = async () => {
    this.setState({ recording: false }, () => {
      this.cam.stopRecording();
    });
  };

  _StartRecord = async () => {
    if (this.cam) {
      this.setState({ recording: true }, async () => {
        const video = await this.cam.recordAsync();
        this.setState({ video });
      });
    }
  };

  toogleRecord = () => {
    const { recording } = this.state;

    if (recording) {
      this._StopRecord();
    } else {
      this._StartRecord();
    }
  };


  _showCamera = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status === "granted") {
      this.setState({ showCamera: true });
    }
  };

  render() {
    const { recording, video } = this.state;
    const { showCamera } = this.state;
    return (
       <Camera
        ref={cam => (this.cam = cam)}
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          flex: 1,
          width: "100%"
        }}
      >
        {video && (
          <TouchableOpacity
       //     onPress={this._saveVideo}
            onPress={()=>this._saveVideo()}
            style={{
              padding: 20,
              width: "100%",
              backgroundColor: "#fff"
            }}
          >
            <Text style={{ textAlign: "center" }}>Send</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={this.toogleRecord}
          style={{
            padding: 20,
            width: "100%",
            backgroundColor: recording ? "#ef4f84" : "#4fef97"
          }}
        >
          <Text style={{ textAlign: "center" }}>
            {recording ? "Stop" : "Record"}
          </Text>
        </TouchableOpacity>
      </Camera>
    );
  }
}

export default VideoRecoding;