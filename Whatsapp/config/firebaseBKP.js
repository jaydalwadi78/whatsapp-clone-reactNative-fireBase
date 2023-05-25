import * as firebase from 'firebase'
import 'firebase/firestore';
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

const firebaseConfig = {   
    apiKey: "AIzaSyDz8svyE6MCKyfu1riT2NeDzyj75qR-wZg",
    authDomain: "mydatabase-97162.firebaseapp.com",
    databaseURL: "https://mydatabase-97162-default-rtdb.firebaseio.com",
    projectId: "mydatabase-97162",
    storageBucket: "mydatabase-97162.appspot.com",
    messagingSenderId: "137558421153",
    appId: "1:137558421153:web:2a38db1fd83c4b826d8ae0",
    measurementId: "G-SWKG0ES433" 
};
  let options = {
    keyPrefix: "Album/",
    bucket: "awesometzumt",
    region: "ap-south-2",
    accessKey: "",
    secretKey: "",
    successActionStatus: 201,
  }

   let firebaseconn = !firebase.apps.length ? 
                    firebase.initializeApp(firebaseConfig) 
                : 
                    firebase.app();

 //firebase.initializeApp(firebaseConfig);
 const auth = firebase.auth();
 const db = firebase.firestore();






 function signin(email,password){
  return auth.signInWithEmailAndPassword(email,password)
 }

 function signup(email,password,name){
   return new Promise((resolve,reject)=>{
     auth.createUserWithEmailAndPassword(email,password).then(user=>{
       db.collection('users').doc(user.user.uid).set({
         email,name,
         createdAt: Date.now()
       })
       .then(()=>{
         resolve({message:'Registerd successfully(-:'})
       })
       .catch((error)=>{
         reject({message:error.message})
       })
     })
     .catch(error=>{
       console.log(error)
       reject({message:error.message})
     })
   })
 }

 function getUsers(){
   return new Promise((resolve,reject)=>{
     db.collection('users').get().then(snap=>{
       let users = []
       snap.forEach(val=>{
         if(val.data().email){

           let dt = val.data()
           users.push({email:dt.email,_id:val.id,name:dt.name})
          }
       })
       resolve(users)
     })
   })
 }


  function getUsers1(){
   return new Promise((resolve,reject)=>{
     db.collection('users').get().then(snap=>{
       let users = []
       snap.forEach(val=>{
         if(val.data().mno){

           let dt = val.data()
           users.push({mno:dt.mno,_id:val.id,name:"abc"})
          }
       })
       resolve(users)
     })
   })
 }

 //room
 async function createRoom(friendId){
  let userid = await AsyncStorage.getItem('userToken')
 console.log("DDDDDFFFFFFFFFFFFF",userid);
   const userId = userid;
   let chatExist = false;

   return new Promise((resolve,reject)=>{
     db.collection('chatrooms')
     .where('users.'+userId,'==', true )
     .where('users.'+friendId,'==',true)
     .get().then(snap=>{

       snap.forEach(val=>{
         chatExist = {
           data:val.data(),
           _id:val.id
         };
       })

       if(!chatExist){
         //room bany ga..
         const obj ={
           createdAt: Date.now(),
           users:{
             [friendId]:true,
             [userId] :true
           }
         }
         db.collection('chatrooms').add(obj).then(snap=>{
           resolve({data:obj,_id:snap.id})
         })
       }else{
         resolve(chatExist)
       }
     })
   })
 }

 async function sendMessage(roomId, message){
  let userid = await AsyncStorage.getItem('userToken')
   console.log('message',message)
   const obj ={
     message,
     userId:userid,
     timestamp:Date.now()
   }
   return db.collection('chatrooms').doc(roomId).collection('messages').add(obj)
 }

 function sendStatus(status){
  let userId = firebase.auth().currentUser.uid
   const status_obj = {
     status,
     userId,
     timestamp:Date.now(),
   }
   return db.collection('status').doc(userId).set(status_obj)
 }
 function getAllStatus(){
   return new Promise((resolve,reject)=>{
     db.collection('status').get().then((snap)=>{
       let status = []
       snap.forEach(val=>{
         console.log('stttt',val.data())
         status.push(val.data())
       })
       resolve(status)
     })
   })
 }

  const getCurrentStatus=async () =>{
    let userid = await AsyncStorage.getItem('userToken');
    const statusref = db.collection('status').doc(userid);
    const doc = await statusref.get();
    if(!doc.exists){
      console.log('no status');
    }
    else
    {
      console.log("doc data",doc.data());
    }

 /*  return new Promise((resolve,reject)=>{
     db.collection('status').get(userid).then((snap)=>{
      console.log("snap",snap);
      console.log("snap data",typeof snap.data());
       /*let status = null;
      resolve(status);*/
     // console.log("snap",snap);
    /* if(snap.data!='undefined')
      {
         let status =[];
         status =snap.data()
         resolve(status)
       }
       else
       {
        console.log("ram");
        reject();
       }
      
     })
   })*/
 }

/* function facebooklogin(token) {
  const credential = firebase.auth.FacebookAuthProvider.credential(token);

  // Sign in with credential from the Facebook user.
  return firebase.auth().signInWithCredential(credential);
}
function signout(){
   return auth.signOut()
}
*/
 export {
   signup,
   getUsers1,
   createRoom,
   sendMessage,
   options,
   signin,
   
  // facebooklogin,
  // signout,
   getCurrentStatus,
   sendStatus,
   getAllStatus,
   firebaseConfig,db

 }
 export default firebase;
