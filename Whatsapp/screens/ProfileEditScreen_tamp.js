import React, { useState,useEffect,usePermissions } from 'react';
import { StyleSheet, View ,Image,Button,Alert,ScrollView,AsyncStorage,TouchableOpacity,FlatList,TouchableHighlight,SafeAreaView} from 'react-native';
import {TextInput,Text} from 'react-native-paper';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 
import { Card, ListItem, Icon ,Avatar} from 'react-native-elements';
import { Audio } from 'expo-av';
import { Ionicons,AntDesign,FontAwesome,Entypo,MaterialCommunityIcons,MaterialIcons,FontAwesome5 } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import firebase,{ db, createRoom, APIURL } from '../config/firebase';
import * as ImagePicker from 'expo-image-picker';
import RBSheet from "react-native-raw-bottom-sheet";
import * as ImageManipulator from 'expo-image-manipulator';

const ProfileEditScreen = (props) => {
      const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [userName, setuserName] = React.useState();
    const [userProfile, setuserProfile] = React.useState();
    const [mno, setmno] = React.useState();
    const [userDetails, setuserDetails] = React.useState();

    const [Editusername, setEditusername] = React.useState();
    const [visible, setVisible] = useState(false);
    const [visibleImg, setVisibleImg] = useState(false);
    const [selectedImage, setSelectedImage] = React.useState(null);

    const navigation = useNavigation();

     useEffect(() => {  
       (async () => {

/*              let mno = await AsyncStorage.getItem('mno');

              setmno(mno); */
        
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
                    console.log("WWWWWWYYYYYY",data11.result)
                          setuserDetails(data11.result), 
                          setuserName(data11.result.name),
                          setuserProfile(data11.result.profile)            
                  })
              }catch(error){
                  console.error("Error adding document: ", error);
              };
      }
          )();



       },[])
 
    // console.log("YYYYYYYYY>>>>>>>>>>",userName);


    


  const showDialogImg = () => {
    setVisibleImg(true);
  };

  const handleCancelImg = () => {
    setVisibleImg(false);
  };


  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSave = async(data) => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    console.log("TTTTTTTTTTTTT>>>>>>>>>>>>>",data);
     let userid = await AsyncStorage.getItem('userToken');
        try{
          let response = await fetch(`${APIURL}editUser/users/${userid}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(
                    {
                        id: userid,
                        name:data
                    }
                ),
          })
          .then(response => response.json())
          .then(data11 => {                
          })
      }catch(error){
          console.error("Error adding document: ", error);
      };

    setVisible(false);
  };



 const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    console.log('result>>>>>>>>>>>>>>>>>>>',result);
     if (result.cancelled===false ) {
            setSelectedImage({ localUri: result.uri });
    }
}




 const pickImageFromCamera = async () => {
        let userid = await AsyncStorage.getItem('userToken');
        let pickerResult = await ImagePicker.launchCameraAsync();
        if (pickerResult.cancelled===false) {
    
          let resizedPhoto = await ImageManipulator.manipulateAsync(
            pickerResult.uri,
            [{ resize: { width: 300 } }],
            { compress: 1, format: ImageManipulator.SaveFormat.PNG, base64: false },
        );
          const response = await fetch(resizedPhoto.uri);
          const blob = await response.blob();
        
          const tempImage = await firebase
          .storage()
          .ref()
          .child('Profile/' +userid+""+ Math.floor(Math.random() * 100) +'.png')
          .put(blob);
          console.log("image uploaded");       
          const url = await tempImage.ref.getDownloadURL();
        try{
          let response = await fetch(`${APIURL}editUserProfile/users/${userid}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(
                    {
                        id: userid,
                        profile:url
                    }
                ),
          })
          .then(response => response.json())
          .then(data11 => {                
          })
      }catch(error){
          console.error("Error adding document: ", error);
      };
        setuserProfile(url);
        setVisibleImg(false);
      //})
        }
      }


  const onPress =()=>{
        alert("ok")
      }
  return(
     <SafeAreaView>
     <View>
            <View>
              <View>
                  <TouchableOpacity style={styles.control} onPress={showDialogImg} >  
                    <Image
                        style={styles.logo}
                        source= {userProfile ? { uri: userProfile } : require('../assets/images/default.jpg')}
                    /> 

                  </TouchableOpacity>   
              </View>
            </View>

          <View>
            <TouchableOpacity style={styles.control} onPress={showDialog} >                                      
              <ListItem>  
                   <FontAwesome name="user" size={24} color="#128C7E" />                                               
                   <ListItem.Content>
                    <ListItem.Subtitle>
                                   Name
                      </ListItem.Subtitle>   
                    <ListItem.Title>{userName}</ListItem.Title>     
                              <ListItem.Subtitle>
                                  This is not your username or pin. This name will be Visible to your WhatsApp contacts. 
                      </ListItem.Subtitle>   
                    </ListItem.Content>
              </ListItem>                     
            </TouchableOpacity>        


            <TouchableOpacity style={styles.control} onPress={() => onPress()}>  
            <ListItem>                                  
                 <FontAwesome name="user" size={24} color="#128C7E" />                                               
                 <ListItem.Content>
                  <ListItem.Subtitle>
                               About
                    </ListItem.Subtitle>   
                  <ListItem.Title>Busy</ListItem.Title>             
               </ListItem.Content>
              </ListItem>
            </TouchableOpacity>        

            <TouchableOpacity style={styles.control} onPress={() => RBSheet.open()}> 
             <ListItem>                                             
                 <FontAwesome name="phone" size={24} color="#128C7E" />                                              
                 <ListItem.Content>
                  <ListItem.Subtitle>
                               Phone
                    </ListItem.Subtitle>   
                  <ListItem.Title>{mno}</ListItem.Title>               
              </ListItem.Content>
            </ListItem>
            </TouchableOpacity>        

            <Dialog.Container visible={visible}>
              <Dialog.Title>Enter your name</Dialog.Title>
              <Dialog.Input onChangeText={value => setuserName(value)}>   
               {userName}                   
              </Dialog.Input>
              <Dialog.Button label="Cancel" onPress={handleCancel} />
              <Dialog.Button label="Save"  onPress={() => handleSave(userName)}/>
            </Dialog.Container>


            <Dialog.Container visible={visibleImg}>
              <Dialog.Title>Enter Image</Dialog.Title>
              <Dialog.Button label="Image "  onPress={pickImageFromGallery} />
              <Dialog.Button label="Camera" onPress={pickImageFromCamera}/>
              <Dialog.Button label="Cancel" onPress={handleCancelImg} />
            </Dialog.Container>



            <RBSheet
              height={300}
              duration={250}
              customStyles={{
                container: {
                  justifyContent: "center",
                  alignItems: "center"
                }
              }}
            >
            
            </RBSheet>




          </View>
        </View> 
      </SafeAreaView>
  )
}


export default ProfileEditScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },

    logo:{
        marginTop:19,
        width: 160,
        height: 160,
        left:110,
        borderRadius: 100,
        marginBottom:20,
    },
});
