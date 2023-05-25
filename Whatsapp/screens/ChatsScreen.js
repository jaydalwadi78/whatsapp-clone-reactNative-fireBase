import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect,usePermissions } from 'react';
import { StyleSheet, KeyboardAvoidingView,View ,Image,Button,Alert,ScrollView,AsyncStorage,TouchableOpacity,Text,TextInput,Dimensions,ImageBackground,Modal} from 'react-native';

import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';
import { Ionicons,AntDesign,FontAwesome,Entypo,MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as Notifications from 'expo-notifications';
import { Camera } from 'expo-camera';
import { Audio,Video } from 'expo-av';

import PDFReader from 'rn-pdf-reader-js'

import EmojiBoard from 'react-native-emoji-board';
import Emoji from './emoji_component';

import firebase,{ sendMessage ,createRoom ,APIURL} from '../config/firebase';

import { Card, ListItem, Icon ,Avatar, Overlay} from 'react-native-elements';

import ImageZoom from 'react-native-image-pan-zoom';
import ImageModal from 'react-native-image-modal';
import ImageViewer from 'react-native-image-zoom-viewer';
import ImageView from 'react-native-image-view';

import MapView, {
  Marker,
  AnimatedRegion,
} from 'react-native-maps';

import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import CryptoJS from "react-native-crypto-js";

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const db = firebase.firestore();
const {width} = Dimensions.get('window');

const cities = [
    {
        source: {
            uri:
                'https://avatars.mds.yandex.net/get-pdb/49816/d9152cc6-bf48-4e44-b2d5-de73b2e94454/s800',
        },

    },
    {
        source: require('../assets/images5.jpg'),
        width: 1200,
        height: 800,
    },
    {
        source: {
            uri:
                'https://cdn.pixabay.com/photo/2017/08/17/10/47/paris-2650808_960_720.jpg',
        },
        width: 806,
        height: 720,
    },
];


const tabs = [
    { images: cities},
  
];


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

class ChatsScreen extends React.Component {

 constructor(props){
        super(props);
        this.state={
          // messages
          userid:"",
          msgs:[],
          text:'',
          url:'none',
          sound:'',
          setSound:'',
          modalVisible: false , 
          isType:false,
          show:false,
          emoji:'',
          activeTab: 0,
          imageIndex: 0,
          isImageViewVisible: false,
          emojiTxt: '',
          isLoading:true,
        }
       console.log("ggg",props) 
    }

async getAllmessages(){
    let userid = await AsyncStorage.getItem('userToken');
    this.setState({userid:userid})

    let room_id = this.props.route.params.roomid;
    console.log("RRRRRRRRRRRRRR",room_id);
      db.collection('chatrooms').doc(room_id).collection('messages')
      .orderBy('timestamp')
      .onSnapshot(snap=>{
        let msgs = [];
        snap.forEach(val=>{ 
          msgs.push({data:val.data(),_id:val.id})
        })
       console.log('msgs>>>',msgs)
        this.setState({msgs})
    })
}


async sendPushNotification(expoPushToken, msg) {    
    let userName = await AsyncStorage.getItem('userName');      
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: userName,
        body: msg,
        data: { someData: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}


async sendmsg(){
  let userid = await AsyncStorage.getItem('userToken');
  let room_id = this.props.route.params.roomid;
  let name = this.props.route.params.name;
  let expoToken = this.props.route.params.token;


/*  sendMessage(room_id, this.state.text)  
*/
    try { 
            let response = await fetch(`${APIURL}sendchatmessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                      {
                          userid:userid,
                          room_id:room_id,
                          expoToken: expoToken,
                          message:this.state.text                     
                      }
                  ),
            })
            .then(response => response.json())     
            .then(data => {
                console.log("data >>>", data);
                this.sendPushNotification(expoToken, this.state.text )
              console.log("data send responseeeeeeee",data.result)
               console.log("before meg text",this.state.text)
                this.setState({
                  text : '',
                  isType: false,
                  show: false,
                  isLoading:false
                })
                //this.state.text = ''
                console.log("after meg text",this.state.text)
              // this.getAllmessages()
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        } catch (error) {
            console.error(error);
    }
}


/*async getAllmessages(){
    let userid = await AsyncStorage.getItem('userToken');
    let room_id = this.props.route.params.roomid;
    try { 
        let response = await fetch(`${APIURL}userchatmessages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                  {
                      userid:userid,
                      room_id:room_id                       
                  }
              ),
        })
        .then(response => response.json())     
        .then(data => {

         // console.log("data",_id)
            console.log("after meg add",data)
          this.setState({userid:userid})
           this.setState({msgs:data.result})
        })
        .catch((error) => {
            console.error('Error:', error);
        });
      } catch (error) {
          console.error(error);
    }
}*/

async componentDidMount(){
  this.getAllmessages();
}

componentWillUnmount(){  
  this.setState({
    msgs:[],text:''
  })
}

async playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       require('./assets/Hello.mp3')
    );
    this.setstate.setSound(this.sound);
    console.log('Playing Sound');
    await this.sound.playAsync(); 
}


async pickImage(){
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      allowsMultipleSelection :(true),
    });
   // console.log("DDDDD",result.uri);
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
      console.log("imageURLGGGGGGGGGGG",JSON.stringify(url));
         
    let userid = await AsyncStorage.getItem('userToken');
    let room_id = this.props.route.params.roomid;
        try { 
            let response = await fetch(`${APIURL}sendgallerymessages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                      {
                          userid:userid,
                          room_id:room_id,
                          url:url        
                      }
                  ),
            })
            .then(response => response.json())     
            .then(data => {
                console.log("click gggllleerrryyy ")
            })
            .catch((error) => {
                console.error('Error:', error);
            });
          } catch (error) {
              console.error(error);
      }

/*    if (!result.cancelled) {
      setImage(url);
    }*/
     // let room_id = this.props.route.params.roomid;
    //  sendMessage(room_id,{url})
  }

  async pickImageFromCamera(){
    let pickerResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
     console.log("pickerResult",pickerResult);
     if (pickerResult.cancelled===false ) {       
            this.setState({ localUri: pickerResult.uri });
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

    let userid = await AsyncStorage.getItem('userToken');
    let room_id = this.props.route.params.roomid;
        try { 
            let response = await fetch(`${APIURL}sendCameramessages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                      {
                          userid:userid,
                          room_id:room_id,
                          url:url        
                      }
                  ),
            })
            .then(response => response.json())     
            .then(data => {
                console.log("click cameraaaaa ")
            })
            .catch((error) => {
                console.error('Error:', error);
            });
          } catch (error) {
              console.error(error);
      }
     /* let room_id = this.props.route.params.roomid;
      sendMessage(room_id,{url})*/
}

  async pickDocument(){

    let result = await DocumentPicker.getDocumentAsync({});
    console.log("DDDDDDDDDDDDDDDDSSSSSSSSSSSSS>>>>>>>>",result.uri);
    const response = await fetch(result.uri);
    const blob = await response.blob();

    const tempImage = await firebase
      .storage()
      .ref()
      .child('Chat_Document/'+ Math.floor((Math.random()*100000000) + 1) )
      .put(blob);
      console.log("Document uploaded");
      const documenturl = await tempImage.ref.getDownloadURL();

    let userid = await AsyncStorage.getItem('userToken');
    let room_id = this.props.route.params.roomid;
        try { 
            let response = await fetch(`${APIURL}sendDocumentmessages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                      {
                          userid:userid,
                          room_id:room_id,
                          documenturl:documenturl        
                      }
                  ),
            })
            .then(response => response.json())     
            .then(data => {
                console.log("click Documentttt ")
            })
            .catch((error) => {
                console.error('Error:', error);
            });
          } catch (error) {
              console.error(error);
      }  

    /*  let room_id = this.props.route.params.roomid;
      sendMessage(room_id,{documenturl})*/
  }


/*  sendNotificationImmediately = async () => {
    let notificationId =  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Pal",
      body: 'Hello pal...How are youu',
      data: { data: 'goes here' },
        },
        trigger: { seconds: 3 },
      });
      console.log(notificationId);
 };
*/
  
  handleChange = (msg) => {
    let typ = (msg.length > 0) ? true : false;
    this.setState({text:msg})
    this.setState({isType:typ})
  }


   onClick = (e) => {
    //console.log("emoji >>>", emoji);    
     // this.setState({text:emoji.code})     
       //this.setState({...this.state.text, text:emoji.code})
        //console.log(emoji);
           let emoji = e.code;
            this.setState({
              text: this.state.text + emoji
            });
    };

  
renderVideoMessage = (data) =>{
    //  console.log("ggggggg",data);
  }
  onClose = () => this.setState({ modalVisible: false});


    render() {
      let { hasCameraPermission,msgs } = this.state;
      let name = this.props.route.params.name;
      let room_id = this.props.route.params.roomid;
      let image = this.props.route.params.imgdata;

      const {isImageViewVisible, activeTab, imageIndex} = this.state;
      const images = tabs[activeTab].images || [];

      if(!hasCameraPermission){
        return (
          <KeyboardAvoidingView style={styles.container} >                    
            <ImageBackground
                     style={{flex: 1}}
                     source={require('../assets/chat_background.png')}
                  >
              <ScrollView
                ref={ref => this.ScrollView = ref}
                onContentSizeChange={(contentWidth,contentHeight)=>{
                  this.ScrollView.scrollToEnd({animated:true})
                }}                
              >
          

                 {/* <View style={{flex:1,flexDirection:'column',justifyContent:'flex-end',}}> */}

               {msgs.map((message,key)=>{
                 const mediaStyle = message.data.userId === this.state.userid?
                 styles.style0:styles.style1
                 const messageStyle = message.data.userId === this.state.userid?
                 styles.text1:styles.text

                  var timestemp = new Date(message.data.timestamp);
                  var date = timestemp.getDate();
               // console.log("DDDDDDDDTTTTTTTTTTTT",date)


                  var t = new Date(message.data.timestamp);
                  var hours = t.getHours();
                  var minutes = t.getMinutes();
                  var newformat = t.getHours() >= 12 ? 'PM' : 'AM';  

                  hours = hours % 12;  

                  // To display "0" as "12" 
                  hours = hours ? hours : 12;  
                  minutes = minutes < 10 ? '0' + minutes : minutes; 
                  var formatted = 
                      (t.toString().split(' ')[0]) 
                      + ', ' +('0' + t.getDate()).slice(-2) 
                      + '/' + ('0' + (t.getMonth() + 1) ).slice(-2)
                      + '/' + (t.getFullYear())
                      + ' - ' + ('0' + t.getHours()).slice(-2)
                      + ':' + ('0' + t.getMinutes()).slice(-2)
                      + ' ' + newformat;

                  var Msgformatted = 
                      (t.toString().split(' ')[0]) 
                      + ' - ' + ('0' + t.getHours()).slice(-2)
                      + ':' + ('0' + t.getMinutes()).slice(-2)
                      + ' ' + newformat;    

                   var DateMsgformatted = 
                      (t.toString().split(' ')[0]) 
                      + ', ' +('0' + t.getDate()).slice(-2) 
                      + '/' + ('0' + (t.getMonth() + 1) ).slice(-2)
                      + '/' + (t.getFullYear());




                    console.log("DDDDDDDDTTTTTTTTTTTT",Msgformatted)
                    console.log("RRRRRRRRRRRTTTTTTTTTTTT",DateMsgformatted)


                 console.log('mmmm',message.data.message)
                  console.log("JJJJJJJJJJJJJJJ>>>>>>>>>",message.data.message.url)


                  if(message.data.message.location){
                    return<MapView
                    style={mediaStyle}
                    key={key}
                    initialRegion={{
                      latitude: message.data.message.location.latitude,
                      longitude: message.data.message.location.longitude,
                      latitudeDelta: LATITUDE_DELTA,
                      longitudeDelta: LONGITUDE_DELTA,
                    }}
                    >
                      <Marker                       
                       coordinate={{
                         latitude: message.data.message.location.latitude,
                         longitude: message.data.message.location.longitude
                        }}
                      />            
                    </MapView>
                  }

                  if(message.data.message.Videourl){
                   return <Video
                   key={key}
                   source={{ uri: message.data.message.Videourl}}
                   rate={1.0}
                   volume={1.0}
                   isMuted={false}
                   resizeMode="cover"
                   shouldPlay
                   isLooping
                   style={mediaStyle}
                   />
                  }

                  if(message.data.message.Audiourl){
                   return <View key={key} style={mediaStyle}>
                             <ListItem bottomDivider>                                  
                                      <Avatar rounded size ={50} source={require('../assets/audio.png')} />                                                            
                                  <ListItem.Content>    
                                   <ListItem.Title 
                                    style={{
                                        fontWeight: "bold",
                                    }}
                                  > 
                                     Audio File                                
                                  </ListItem.Title>   
                                  <TouchableOpacity >                                      
                                        <Ionicons name='ios-play-circle' size={48} color='#444' />                                     
                                    </TouchableOpacity>                                    
                                  </ListItem.Content>
                              </ListItem>
                          </View>
                  }

                  if(message.data.message.documenturl){
                   return <View key={key} style={mediaStyle}> 
                     <PDFReader
                        source={{
                          uri: 'http://gahp.net/wp-content/uploads/2017/09/sample.pdf',
                        }}
                      />
                   </View>
                  }


               if (this.isLoading) {
                      return (
                          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                              <ActivityIndicator color="#E67817" size="large" />
                          </View>
                      )
                  }

                 if(message.data.message.url){                 
                   return <View>
                                <View>                               
                                    <TouchableOpacity                       
                                        onPress={() => {
                                            this.setState({                                            
                                                isImageViewVisible: true,
                                            });
                                        }}
                                    >
                                        <Image
                                            key={key} style={mediaStyle}
                                            source={{uri:message.data.message.url}}
                                            resizeMode="cover"
                                        />
                                    </TouchableOpacity>                
                            </View>
            
                          <ImageView
                              key={key}
                              glideAlways
                              images={images}
                              imageIndex={imageIndex}
                              isVisible={isImageViewVisible}                            
                              onClose={() => this.setState({isImageViewVisible: false})}
                              onImageChange={index => {
                                  console.log(index);
                              }}
                          />
                      </View>                                     
                 }

                 if(!message.data.message.url && !message.data.message.Videourl && !message.data.message.location ){                   
                   return <View key={key} style={messageStyle}><Text >{message.data.message} </Text><Text style={{fontSize:10}}> {Msgformatted}</Text></View>
                  }
                })}              
               </ScrollView>

                 <View style={{display:'flex',flexDirection:"row"}}>                
                  <TouchableOpacity onPress={()=>this.props.navigation.navigate('VideoRecoding',{room_id:room_id})} style={styles.icons}><Text><FontAwesome  name="video-camera" size={26}  /></Text></TouchableOpacity> 
                  <TouchableOpacity onPress={()=>this.pickImageFromCamera()} style={styles.icons}><Text><AntDesign  name="camera" size={26}  /></Text></TouchableOpacity> 
                  <TouchableOpacity onPress={()=>this.props.navigation.navigate('Audio',{room_id:room_id})} style={styles.icons}><Text><FontAwesome  name="microphone" size={26}  /></Text></TouchableOpacity> 
            
                 
          
                  <EmojiBoard emojiSize={28} numCols={5} showBoard={this.state.show} onClick={this.onClick} />
            
                  <TouchableOpacity onPress={()=>this.props.navigation.navigate('Location',{room_id:room_id})} style={styles.icons}><Text> <Entypo  name="location-pin" size={26}  /></Text></TouchableOpacity> 
                  <TouchableOpacity onPress={()=>this.pickImage()} style={styles.icons}><Text><AntDesign  name="picture" size={26}  /></Text></TouchableOpacity>                 
                  <TouchableOpacity onPress={()=>this.pickDocument()} style={styles.icons}><Text><AntDesign  name="addfile" size={26}  /></Text></TouchableOpacity>                                     
                </View>


               <View style={{display:'flex',flexDirection:'row',marginBottom:3,marginLeft:7}}>
                  
                  <TouchableOpacity style={styles.icons,styles.inputemoji}  onPress={() => this.setState({show: true})}>                      
                      <Entypo name="emoji-happy" size={24} color="black" />
                  </TouchableOpacity>

                  <TextInput 
                  style={styles.input}
                  placeholder='Type massege here.. '
                  onChangeText={(t)=> this.handleChange(t)}
                  value={this.state.text}
                  />
                  
                   <TouchableOpacity onPress={()=>{this.sendmsg(this.state.text)}}  style={styles.button}>                   
                    { 
                      (this.state.isType) ?
                        <MaterialCommunityIcons name="send" size={24} color="white" />
                        :
                    <FontAwesome name="microphone" size={24} color="white" />
                    }
                  </TouchableOpacity>
                </View> 

                </ImageBackground>                 
                </KeyboardAvoidingView>
                
                );
              }else{
                return(
                  !this.state.photo?
                <View style={{ flex: 1 }}>
                <Camera style={{ flex: 1 }} type={this.state.type}
                 ref={ref => {
                  this.camera = ref;
                }}
                >

                  <TouchableOpacity
                      style={{
                        flex: 0.3,
                        alignSelf: 'flex-end',
                        alignItems: 'flex-end',
                        marginTop:30,
                        marginRight:10,
                      }}
                      onPress={() => {
                        this.setState({
                          hasCameraPermission:null
                        });
                      }}>
                  
                      <AntDesign name='closecircleo' size={32} style={{ marginBottom: 10, color: 'red' }}/>
                    </TouchableOpacity>
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: 'transparent',
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        flex:0.2,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                        alignSelf: 'flex-end',
                        justifyContent:'flex-end'
                      }}>

                        {
                          this.state.vid
                          ?                          
                          <Video
                            source={{ uri: this.state.vid.uri }}
                            rate={1.0}
                            volume={1.0}
                            isMuted={false}
                            resizeMode="cover"
                            shouldPlay
                            isLooping
                            style={{ width: 300, height: 300 }}
                          />

:
                  <Image
                  style={styles.image}
                  source={{uri: this.state.photo ? this.state.photo.uri :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3ag28ODXXYsmpNSwDenT5ayiQkjtRzNyfhpMoeQc_DX4u3KqV1A"}}
                  />
                  }
                   </View>
                   {
                     this.state.video
                     ?
                     <View>
                     <Button                     
                      title="Send"
                      onPress={()=>{this.sendVideo()}}
                     />
                   
                     <TouchableOpacity
                     style={{
                       flex: 0.65,
                       alignSelf: 'flex-end',
                        alignItems: 'center',
                      }}
                      onPress={() => {this.video()}}>
                      <Entypo name='circle' size={45} style={{ marginBottom: 10, color: 'white' }}/> 
                    </TouchableOpacity>
                      </View>
:
                    <TouchableOpacity
                      style={{
                        flex: 0.65,
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                      }}
                      onPress={() => {this.snap()}}>
                      <Entypo name='circle' size={45} style={{ marginBottom: 10, color: 'white' }}/> 
                    </TouchableOpacity>
                    }
                    <TouchableOpacity
                      style={{
                        flex: 0.15,
                        alignSelf: 'flex-end',
                        alignItems: 'flex-end',
                        marginRight:10,
                      }}
                      onPress={() => {
                        this.setState({
                          type:
                            this.state.type === Camera.Constants.Type.back
                              ? Camera.Constants.Type.front
                              : Camera.Constants.Type.back,
                        });
                      }}>
                      <Ionicons name='ios-reverse-camera' size={38} style={{  marginBottom: 10, color: 'white' }}/> 
                    </TouchableOpacity>
                  </View>
                </Camera>
              </View>
              :
                <></>             
              )
          }
}
}

export default ChatsScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header:{
    display:'flex',
    flexDirection:'row',
    height:50,
    backgroundColor:'lightgray',
    justifyContent:'center',
    marginTop:5
  },
  image:{
    height:35,
    width:35,
    marginRight:25,
    margin:7,
    borderRadius:25,
},
  heading:{
    fontSize:25,
    marginBottom:30,
  }
  ,input:{
    width:'75 %',
    height:44,
    padding:8,
    backgroundColor:'#eeeeee',
    fontSize:18,
    borderRadius: 25,
    backgroundColor:'#ffffff',
  },
  inputemoji:{
    width:'10 %',
    height:44,
    padding:8,
    backgroundColor:'#eeeeee',
    fontSize:18,
    borderRadius: 25,
    backgroundColor:'#ffffff',
  },
  button:{
    width:46,
    height:46,
    backgroundColor:'#ffffff',
    fontSize:20, 
    borderRadius: 50,
    backgroundColor:'#128C7E',
    marginLeft:5,
    alignItems:"center",
    justifyContent:'center',

  },
  msgs:{
    display:'flex',
    justifyContent:'flex-end',
    minHeight:510,
  },
  icons:{
    marginRight:10,
    margin:10,
  },
  text:{
    maxWidth:200,
    backgroundColor:'#f2f2f2',
    left:0,color:'black',
    padding:5,
    borderTopRightRadius:10,
    borderBottomRightRadius:10,
    borderBottomLeftRadius:10,
    paddingRight:10,
    paddingLeft:10,
    alignSelf:'flex-start',
    marginTop:4,
    marginLeft:15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.28,
    shadowRadius: 4.00,
    elevation: 8,
  },
  text1:{
    maxWidth:200,
    backgroundColor:'#DCF8C6',
    left:0,color:'black',
    padding:5, 
    borderTopLeftRadius:10,
    borderBottomRightRadius:10,
    borderBottomLeftRadius:10,
    paddingRight:10,
    paddingLeft:10,
    alignSelf:'flex-end',
    marginTop:4,
    marginRight:15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.58,
    shadowRadius: 4.00,
    elevation: 8,
  },
  style0:{
    width: 270, 
    height: 180,
    alignSelf:'flex-end',
    marginTop:7,
    marginRight:8,
  },
  style1:{
    width: 270, 
    height: 180,
    alignSelf:'flex-start',
    marginTop:5
  },
  albumCover: {
    width: 250,
    height: 250
  },
  trackInfo: {
    padding: 40,
    backgroundColor: '#fff'
  },
  trackInfoText: {
    textAlign: 'center',
    flexWrap: 'wrap',
    color: '#550088'
  },
  largeText: {
    fontSize: 22
  },
  smallText: {
    fontSize: 16
  },
  control: {
    margin: 20
  },
  controls: {
    flexDirection: 'row'
  },
  tabs: {
        flexDirection: 'row',
  },
  tab: {
        flex: 1,
        height: 30,
        alignItems: 'center',
        justifyContent: 'flex-end',
  },
  tabTitle: {
        color: '#EEE',
  },
  tabTitleActive: {
        fontWeight: '700',
        color: '#FFF',
  },
  footer: {
        width,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        paddingHorizontal: 10,
        paddingVertical: 5,
  },
  footerButton: {
        flexDirection: 'row',
        marginLeft: 15,
  },
  footerText: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
  },
});
