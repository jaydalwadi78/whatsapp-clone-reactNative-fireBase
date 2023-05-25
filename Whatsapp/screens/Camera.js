import React, { useState,useEffect } from 'react';
import { StyleSheet, View ,Image,Button,Alert,ScrollView,TouchableOpacity,Text, TouchableHighlight,} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
/*import Icon from '@material-ui/core/Icon';*/
import { IconButton, Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import firebase, { sendStatus, getAllStatus, db, getCurrentStatus, sendMessage } from '../config/firebase';
import ContactstatusScreen from './ContactstatusScreen';
import * as ImageManipulator from 'expo-image-manipulator';
import * as MediaLibrary from 'expo-media-library';

const Camera = (props) => {
  const navigation = useNavigation();

     let {files, setFiles} = props;

 const [selectedImage, setSelectedImage] = React.useState(null);
/* const [galleryImage, setGalleryImage] = React.useState(null);*/
      useEffect(() => {          
         // pickImageFromCamera();
          //pickImageFromGallery();    
  }, []);

    const pickImageFromCamera = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    //console.log("pickerResult",pickerResult);
    if (pickerResult.cancelled===false ) {
        setSelectedImage({ localUri: pickerResult.uri });
    }

    let resizedPhoto = await ImageManipulator.manipulateAsync(
        pickerResult.uri,
        [{ resize: { width: 300 } }],
        { compress: 0, format: ImageManipulator.SaveFormat.PNG, base64: false },
    );
      const response = await fetch(resizedPhoto.uri);
      const blob = await response.blob();

    const tempImage = await firebase
      .storage()
      .ref()
      .child('Chat_Camera_Image/'+ Math.floor((Math.random()*100000000) + 1) +'.png')
      .put(blob);
      console.log("image uploaded");
      const url = await tempImage.ref.getDownloadURL();
      console.log("imageURL",JSON.stringify(url));

      let room_id = props.route.params.room_id;
      sendMessage(room_id,{url})
}


//console.log("selectedImage",selectedImage);
if (selectedImage !== null) {
    return (
      <View style={styles.container}>    
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}        
        />

        <Button
          onPress={() => navigation.navigate("Chat")}
          title="Send"
          color="#841584"
        />
      </View>
    );
  }

  return(
  <View style={styles.container}>
  <View style={styles.fixToText}>
   <Button title="Camera" onPress={pickImageFromCamera} style={styles.button1}/>
</View>     
    </View>
  )

  

}

export default Camera


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    fixToText: {
    flexDirection: 'row',
   padding:150,
  },
    thumbnail: {
    width: 400,
    height: 650,
    resizeMode: "cover",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#25D366",
    padding: 15,
    marginTop:150,
    paddingTop:15,
    paddingBottom:15,
    marginLeft:80,
    marginRight:70,
    borderRadius:10,
    borderWidth: 1,
    borderColor:'#25D366'
    
  },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 50,
        minHeight:'100%'
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 100,
    },
      backRightBtnLefttt: {
        backgroundColor: 'white',
        right: 300,
    },
    backRightBtnLeftt: {
        backgroundColor: '#33cc00',
        right: 200,
        borderLeftColor: 'lightgrey',
        borderLeftWidth: 1,
    },
    backRightBtnLeft: {
        backgroundColor: '#33cc00',
        right: 100,
        borderLeftColor: 'lightgrey',
        borderLeftWidth: 1,
    },
    backRightBtnRight: {
        backgroundColor: '#33cc00',
        right: 0,
        borderLeftColor: 'lightgrey',
        borderLeftWidth: 1,
    },
    fab: {
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
            backgroundColor: '#33cc00',
    },
});