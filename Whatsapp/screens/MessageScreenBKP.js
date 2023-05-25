import React, { useState, useEffect } from 'react';
import { StyleSheet, View ,Image,Button,Alert,ScrollView,TouchableOpacity, TouchableHighlight,AsyncStorage} from 'react-native';
import {TextInput,Text,FAB} from 'react-native-paper';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';  
import { Card, ListItem,Avatar} from 'react-native-elements';
import { SwipeRow,SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AllContactScreen} from './AllContactScreen';

import {db} from '../config/firebase';
import {contactCallAction} from '../actions/userAction';
import {newcontactCallAction} from '../actions/userAction';
import { connect } from 'react-redux';
import * as Notifications from 'expo-notifications';

import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import CryptoJS from "react-native-crypto-js";

const list = [
  {
    name: 'jay',
    avatar_url: 'https://firebasestorage.googleapis.com/v0/b/demonewfirebase-e5bdf.appspot.com/o/Profile%2FC1dEdtKk5vyzjphIZURd51.png?alt=media&token=86a75dcf-2147-4986-8cff-d260f6f9d826',
    subtitle: 'Vice President',
    status:1
  },
  {
    name: 'Rahul Patel',   
    avatar_url: 'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',
    subtitle: 'Vice Chairman',
    status:0
  },
  {
    name: 'Jay Dalwadi',
    avatar_url: 'https://images.newindianexpress.com/uploads/user/imagelibrary/2020/5/15/w900X450/Disha_Patani.jpg',
    subtitle: 'Vice President',
    status:0
  },
  {
    name: 'Pal',
    avatar_url: 'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',
    subtitle: 'Vice Chairman',
    status:1
  },
  {
    name: 'Yogita',
    avatar_url: 'https://images.newindianexpress.com/uploads/user/imagelibrary/2020/5/15/w900X450/Disha_Patani.jpg',
    subtitle: 'Vice President',
    status:0
  },
  {
    name: 'Rahul Patel',
   avatar_url: 'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',
    subtitle: 'Vice Chairman',
    status:0
  },
  {
    name: 'Darshan ',
    avatar_url: 'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',
    subtitle: 'Vice President',
    status:1
  },
  {
    name: 'Yash',
     avatar_url: 'https://images.newindianexpress.com/uploads/user/imagelibrary/2020/5/15/w900X450/Disha_Patani.jpg',
    subtitle: 'Vice Chairman'
  },
    {
    name: 'Darshan',
    avatar_url: 'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',
    subtitle: 'Vice President',
    status:1
  },
  {
    name: 'Yash',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman',
    status:0
  }
]

const MessageScreen = (props) => {
  
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState([])
  const [contact, setContact] = useState([])
  const [userContact,setUserContact] = useState([])
  const Allcontactfilename =  "dbencryptAllcontact_01.db";
  const Newcontactfilename =  "dbencryptAllcontact_01.db";


// console.log("JJJJJ",props)
const [ loading, setLoading ] = useState(true);
const ref = db.collection('users');

 useEffect(() => {  
   (async () => {

  console.log("My useEffect >>>>>>>>")
    db.collection("users")  
              .get()
              .then(snapshot => {
                      let newarray = [];
                      const data = snapshot.forEach(snap =>{
                      if (userDetails.length > 0) {  
                              newarray=[...userDetails,{text:snap.data(),id:snap.id}]
                              setUserDetails(newarray);
                      }else{
                              newarray.push({
                                      text:snap.data(),id:snap.id
                              })
                              setUserDetails(newarray);
                      }   
                  });
                      
              });
              console.log("WWWWWWWWQQQ",userDetails)
    }
      )();
   },[])


 useEffect(() => {  
     const subscription = Notifications.addNotificationReceivedListener(notification => {
         console.log(notification);
     });

     const subscription2 = Notifications.addNotificationResponseReceivedListener(response => {
         console.log("notification response >>>", response);
     });
    // return () => subscription.remove();
       // console.log("HHHHHHHHHHHHHHHHHH")  
       (async () => {
            let fileUri  =  FileSystem.documentDirectory + Allcontactfilename;
            let fileUrii =  FileSystem.documentDirectory + Newcontactfilename;
            let fileExists = await FileSystem.getInfoAsync(fileUri)
              if(fileExists.exists) {              
               alert("yes");              
                let res = await FileSystem.readAsStringAsync(fileUri)          
                let bytes  = CryptoJS.AES.decrypt(res, 'secret key 123');
                let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
           //  console.log("decryptedDataCCCCCCCCCCCCCCCCCCC",decryptedData)
                props.contactCall(decryptedData);
                setContact(decryptedData); 
                
                let ress = await FileSystem.readAsStringAsync(fileUrii)
                let bytess  = CryptoJS.AES.decrypt(ress, 'secret key 123');
                let decryptedDataa = JSON.parse(bytess.toString(CryptoJS.enc.Utf8));
            //   console.log("decryptedDataDDDDDDDDDDDDDDDDDDDDDD",decryptedDataa)
                props.newcontactCall(decryptedDataa);

             //console.log("QQQQQQQQQQQQQQQWWWWWWWWWWWWWW",props.newcontact_data)
              } 
              else{               
                alert("nathi");
                const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL,Permissions.CONTACTS);
                if (status === "granted") { 
                     const { data } = await Contacts.getContactsAsync({ 
                      fields: [Contacts.Fields.Name,Contacts.Fields.PhoneNumbers],
                    })
                      if(data.length > 0) {
                        data.forEach(function(v){ 
                            delete v.contactType , 
                            delete v.imageAvailable, 
                            delete v.firstName, 
                            delete v.id, 
                            delete v.lookupKey, 
                            delete v.lastName, 
                            delete v.middleName 
                           
                          if (v.hasOwnProperty("phoneNumbers")) {
                            let nums = v.phoneNumbers;
                            let numbers = [];
                            if(nums.length > 0){
                              nums.forEach((num) =>{
                                let temp_num = num.number.split(" ").join("");

                               console.log("GGGJJJJJJ",temp_num);
                                //temp_num.slice(-10)
                             //   temp_num.substr(0,4)
                            //    console.log(temp_num.slice(2,4));  
                             //   temp_num.substr(temp_num.length-2)

                                if(temp_num.slice(0,1)=='+'){
                                     temp_num = temp_num.substring(3)
                                   //  temp_num.indexOf(-1)
                                     temp_num.filter((data,index)=>{
                                          return temp_num.indexOf(data) === index;
                                        })
                                      numbers.push(temp_num);  
                                }                    
                                  //console.log("SSSSSSSSSSVVVVVVV",temp_num)

                               // temp_num.substr(temp_num.length - 10  )                            
                                //                             
                              })
                              v.number = numbers;
                            }
                          }
                          delete v.phoneNumbers;
                        }); 
                        setContact(data);                      
                    //    console.log("TTTTTTTTUVVVVVVVVVV",data);
                        let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123').toString();
                        let fileUri = FileSystem.documentDirectory + Allcontactfilename;
                        await FileSystem.writeAsStringAsync(fileUri, ciphertext, { encoding: FileSystem.EncodingType.UTF8 });
                        const asset = await MediaLibrary.createAssetAsync(fileUri)
                        await MediaLibrary.createAlbumAsync("AAAAAAAAAAAAAA", asset, false)

                        let ciphertextt = CryptoJS.AES.encrypt(JSON.stringify(props.newcontact_data), 'secret key 123').toString();
                        let fileUrii = FileSystem.documentDirectory + Newcontactfilename;
                        await FileSystem.writeAsStringAsync(fileUrii, ciphertextt, { encoding: FileSystem.EncodingType.UTF8 });
                        const assett = await MediaLibrary.createAssetAsync(fileUrii)
                        await MediaLibrary.createAlbumAsync("AAAAAAAAAAAAAA", assett, false)

                        let res = await FileSystem.readAsStringAsync(fileUri)
                        let bytes  = CryptoJS.AES.decrypt(res, 'secret key 123');
                        let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));                      
                        props.contactCall(decryptedData);

                        let ress = await FileSystem.readAsStringAsync(fileUrii)
                        let bytess  = CryptoJS.AES.decrypt(ress, 'secret key 123');
                        let decryptedDataa = JSON.parse(bytess.toString(CryptoJS.enc.Utf8));
                        props.newcontactCall(decryptedDataa);
                      }
                }      
            }          

              db.collection("users")  
              .get()
              .then(snapshot => {
                      let newarray = [];
                      const data = snapshot.forEach(snap =>{
                      if (userDetails.length > 0) {  
                              newarray=[...userDetails,{text:snap.data(),id:snap.id}]
                              setUserDetails(newarray);
                      }else{
                              newarray.push({
                                      text:snap.data(),id:snap.id
                              })
                              setUserDetails(newarray);
                      }   
                  });
                      
              });

       // console.log("GGGGGGGGGGGGGGGGGG",userDetails)
       //console.log("GGGGGGGGGGGGGGGGGGKKKKKKKKKKKK",userDetails)

     let userid = await AsyncStorage.getItem('mno');
     console.log("QQQQQQQQaaaaa>>>>>>>>>>",userid);
             if(props.contact_data.length > 0 && userDetails.length > 0){
                let newcontactarray = []; 
                userDetails.map((data1,i)=>{  
                    let findindex= props.contact_data.findIndex(
                        element => (element.number) ? element.number == data1.text.mobile_no : '' 
                );
                 // console.log("SSSSS",findindex)
                  //console.log("props.contact_data>>>>",props.contact_data)
                if(findindex >= 0) {
                        if(newcontactarray.length >  0 )
                        {   
                            //newcontactarray=[...newcontactarray,props.contact_data[findindex]]                      
                            let findindex1= newcontactarray.findIndex(
                                    element => element.name ==props.contact_data[findindex].name
                            );

                            if (findindex1 >= 0) {}
                            else{
                                props.contact_data[findindex].dbid = data1.id;
                                props.contact_data[findindex].profile_img = data1.text.profile;
                                props.contact_data[findindex].expotoken = data1.text.expoToken;
                                newcontactarray=[...newcontactarray,props.contact_data[findindex]]
                               //  console.log("SSSSSSSSSSSGGGGGGGGGG",newcontactarray)
                            }
                        } else{
                                props.contact_data[findindex].dbid = data1.id;
                                props.contact_data[findindex].expotoken = data1.text.expoToken;
                                newcontactarray.push(props.contact_data[findindex]) 
                            }                
                        }
                 });                
           // console.log("newcontactarray---------------------",newcontactarray);
            setUserContact(newcontactarray);
            props.newcontactCall(newcontactarray);
        }
 }
    )();
 },[])

  //  console.log("aaaaaa",list.length);
    const [listData, setListData] = useState(
            list.map((ls,i) => ({ 
                key: `${i}`, 
                text: `item #${i}` ,
                name:`${ls.name}`,
                avatar_url:`${ls.avatar_url}`,
                subtitle:`${ls.subtitle}`,
                status:`${ls.status}`
            }))
    );

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        setListData(newData);
    };

    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    const renderItem = (data) => (
        <TouchableHighlight
            onPress={
                ()=>navigation.navigate('Chat',{name:data.item.name,imgdata:data.item.avatar_url})
            }
            underlayColor={'#AAA'}
        >
            <View>
                <ListItem  bottomDivider>
                    {
                        (data.item.status == 1) ? 
                            <View style={{
                                borderStyle:'solid',
                                borderWidth:2,
                                borderColor:'green',
                                borderRadius:50
                            }}>
                                <Avatar 
                                    rounded  
                                    size ={50}  
                                    source={{uri: data.item.avatar_url}} 
                                    onPress={
                                        ()=>navigation.navigate('Profile',{Listdata:data.item})
                                    }
                                    containerStyle={{padding:2}}
                                />
                            </View>
                        :
                            <View style={{
                                borderStyle:'solid',
                                borderWidth:2,
                                borderColor:'white',
                                borderRadius:50
                            }}>
                                <Avatar 
                                    rounded  
                                    size ={50}  
                                    source={{uri: data.item.avatar_url}} 
                                    onPress={
                                        ()=>navigation.navigate('Profile',{Listdata:data.item})
                                    }
                                    containerStyle={{padding:2}}
                                />
                            </View>
                        }
                    <ListItem.Content>
                        <ListItem.Title style={{fontWeight: "bold"}}>{data.item.name}</ListItem.Title>
                        <ListItem.Subtitle>{data.item.subtitle}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </View>
        </TouchableHighlight>                
    );


    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={() => closeRow(rowMap, data.item.key)}
            >
                <Icon name="map-pin" size={30} color='white' />
                <Text style={styles.backTextWhite}>Pin</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => deleteRow(rowMap, data.item.key)}
            >   
                <Icon name="ellipsis-h" size={30} color='white' />
                <Text style={styles.backTextWhite}>More</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeftt]}
                onPress={() => deleteRow(rowMap, data.item.key)}
            >
                <Icon name="comment" size={30} color='white' />
                <Text style={styles.backTextWhite}>Unread</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLefttt]}
                onPress={() => deleteRow(rowMap, data.item.key)}
            >
                <Text>13:09</Text>
                <Text style={{color:"#33cc00"}}>(2)</Text>
            </TouchableOpacity>
        </View>
    );

    return ( 
        <View style={styles.container}>
            <SwipeListView
                data={listData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-400}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowDidOpen={onRowDidOpen}
            />
            <FAB
                style={styles.fab}
                medium
                icon="message"
                onPress={() => navigation.navigate('AllContact')}
            />  
        </View>
    );
}


const mapStateToProps = (state)=>{
    return {
        contact_data: state.users.contact_data,
        newcontact_data:state.users.newcontact_data,
    }
}


const mapDispatchToProps = (dispatch)=>{ 
    return{
        contactCall:(contact) => {dispatch(contactCallAction(contact))},
        newcontactCall:(newcontact) => {dispatch(newcontactCallAction(newcontact))},
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(MessageScreen);



const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
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