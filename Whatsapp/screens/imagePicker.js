import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import firebase, { sendStatus, getAllStatus, db, getCurrentStatus, sendMessage } from '../config/firebase';
import * as ImageManipulator from 'expo-image-manipulator';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

export default function ImagePickerExample(props) {
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  console.log("HHHH>>>>>>>>>",props);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log("DDDDD",result.uri);

/*
    const tempImage = await firebase
      .storage()
      .ref()
      .child('PHOTO/' +id+'.png');
      tempImage.put(pickerResult.uri,{contentType:'image/png'});
      console.log("image uploaded");
      const imageURL = await tempImage.ref.getDownloadURL();
      console.log("imageURL",JSON.stringify(imageURL));

*/

/*
  let pickerResult = await ImagePicker.launchCameraAsync();
    if (!pickerResult.cancelled) {

      let resizedPhoto = await ImageManipulator.manipulateAsync(
        pickerResult.uri,
        [{ resize: { width: 300 } }],
        { compress: 0, format: ImageManipulator.SaveFormat.PNG, base64: false },
    );
      const response = await fetch(resizedPhoto.uri);
      const blob = await response.blob();

*/
    let resizedPhoto = await ImageManipulator.manipulateAsync(
        result.uri,
        [{ resize: { width: 300 } }],
        { compress: 0, format: ImageManipulator.SaveFormat.PNG, base64: false },
    );
      const response = await fetch(resizedPhoto.uri);
      const blob = await response.blob();

    const tempImage = await firebase
      .storage()
      .ref()
      .child('Chat_Image/'+ Math.floor((Math.random()*100000000) + 1) +'.png')
      .put(blob);
      console.log("image uploaded");
      const url = await tempImage.ref.getDownloadURL();
      console.log("imageURL",JSON.stringify(url));
     
    if (!result.cancelled) {
      setImage(url);
    }
      let room_id = props.route.params.room_id;
      sendMessage(room_id,{url})
    // console.log("LLLLLLLLLLLLLMMMMMM",image);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Back " onPress={()=>navigation.navigate('Chat')}/>
    </View>
  );
}
