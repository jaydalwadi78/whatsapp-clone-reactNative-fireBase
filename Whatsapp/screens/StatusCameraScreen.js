/*import * as React from 'react';*/
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  TextInput,
  Platform,
  StyleSheet,
  ImageBackground,
  Button,
  Alert,
  Image,
  AsyncStorage
} from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import { Ionicons, AntDesign, FontAwesome, Entypo, MaterialIcons, Feather } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../components/context';
import firebase, { sendStatus, getAllStatus, db, getCurrentStatus } from '../config/firebase';
import { Card, ListItem, Icon, Avatar } from 'react-native-elements';
const tag = '[CAMERA]';


const StatusCameraScreen = ({ navigation, route }) => {
  //console.log("route",route);
  //console.warn("navigation", route.params.id);
  let id = route.params.id;
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [data, setData] = React.useState({});
  const [image, setImage] = useState(route.params.status);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
   const [selectedImage, setSelectedImage] = React.useState(null);
  let camera: Camera;


  useEffect(() => {
    (async () => {
      const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      setHasPermission(status)
    })();
  }, []);


   const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    console.log('result',result);
     if (result.cancelled===false ) {
            setSelectedImage({ localUri: result.uri });
    }
}

    const pickImageFromCamera = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    console.log("pickerResult",pickerResult);
    if (pickerResult.cancelled===false ) {
            setSelectedImage({ localUri: pickerResult.uri });
/*            firebase
  .storage(Status)
  .ref("abc")
  .putFile(pickerResult.uri)
  .then((snapshot) => {
    //You can check the image is now uploaded in the storage bucket
    console.log(`image has been successfully uploaded.`);
  })
  .catch((e) => console.log('uploading image error => ', e));
*/
 const tempImage = await firebase
      .storage()
      .ref()
      .child('Status/' +id+'.png');
      tempImage.put(pickerResult.uri,{contentType:'image/png'});
      console.log("image uploaded");
      const imageURL = await tempImage.ref.getDownloadURL();
      console.log("imageURL",JSON.stringify(imageURL));
      /*const createdAt = db.Timestamp.now().toMillis();*/


  /*const tempImage =firebase
  .storage()
  .ref(id +pickerResult.type)
  .putFile(pickerResult.uri)
  .then((snapshot) => {
    //You can check the image is now uploaded in the storage bucket
    console.log(`${imageName} has been successfully uploaded.`);
  })*/

/*let ref = firebase.storage().ref().child('Status/ '+id +'.png');
await ref.put(pickerResult.uri).on('state_changed',()=>{},()=>{},()=>ref.getDownloadURL().then(url=>{
       // sendStatus(url);
        console.log('status',url)
        console.log("upload successfully")
    }).catch(e=>{
        console.log('Status_error',e.message)
    })*/

/*let ref = firebase.storage().ref().child('Status/22222.png');

await ref.put(pickerResult.uri).then(snapshot=>{

        console.log('successfully uploaded');
    }).catch(e=>{
        console.log('not successfully uploaded')
    })
 */
    }
}



  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
    
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}        
        />
        <Button
          onPress={() => navigation.navigate("Story",{"localUri":selectedImage.localUri})}
          title="Send"
          color="#841584"
        />
      </View>
    );
  }

  return (

    <View style={styles.container}>
      {
        (image !== 'null') ?

          <Image source={{ uri: image }}
            style={{ width: '90%', height: 700, }}
          />
          :
         
  <View style={styles.fixToText}>
   <Button title="Gallery" onPress={pickImageFromGallery} style={{width:20,height:10, color:"#fff"}} />
   <Button title="Camera" onPress={pickImageFromCamera} style={styles.button1}/>
</View>
}
    </View>
  )
}



export default StatusCameraScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  thumbnail: {
    width: 400,
    height: 650,
    resizeMode: "cover",
  },

});