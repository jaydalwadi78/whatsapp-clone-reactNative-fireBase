import React, { useState } from 'react';
import { StyleSheet, View ,Image,Button,Alert,ScrollView,TouchableOpacity, TouchableHighlight} from 'react-native';
import {TextInput,Text} from 'react-native-paper';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';  
import { Card, ListItem,Avatar} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';


const list = [
  {
    name: 'Megha devloper',
    avatar_url: 'http://192.168.1.20/React_native_whatsapp_new/assets/images1.jpg',
    subtitle: 'Vice President',
    status:'Incoming',
    type:'call',
    onstatus:0
  },
  {
    name: 'Rahul Patel',
    avatar_url: 'http://192.168.1.20/React_native_whatsapp_new/assets/images2.jpg',
    subtitle: 'Vice Chairman',
    status:'Outcoming',
    type:'video',
    onstatus:0
  },
  {
    name: 'Megha developerrrr',
    avatar_url: 'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',
    subtitle: 'Vice President',
    status:'Missed',
    type:'call',
    onstatus:1
  },
  {
    name: 'Varun Dhavan',
    avatar_url: 'http://192.168.1.20/React_native_whatsapp_new/assets/images3.jpeg',
    subtitle: 'Vice Chairman',
    status:'Missed',
    type:'call',
    onstatus:1
  },
  {
    name: 'Disha Patani',
    avatar_url: 'http://192.168.1.20/React_native_whatsapp_new/assets/images5.jpg',
    subtitle: 'Vice President',
    status:'Incoming',
    type:'call',
    onstatus:0
  },
  {
    name: 'Rahul Patel',
    avatar_url: 'http://192.168.1.20/React_native_whatsapp_new/assets/images4.jpeg',
    subtitle: 'Vice Chairman',
    status:'Outcoming',
    type:'video',
    onstatus:0
  },
  {
    name: 'Darshan Stahrvaaaa',
    avatar_url: 'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',
    subtitle: 'Vice President',
    status:'Missed',
    type:'video',
    onstatus:1
  },
  {
    name: 'Yash Thakorrr',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman',
    status:'Outcoming',
    type:'video',
    onstatus:0
  },
   {
    name: 'Darshan Stahrvaaaa',
    avatar_url: 'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',
    subtitle: 'Vice President',    
    status:'Incoming',
    type:'video',
    onstatus:0
  },
  {
    name: 'Yash Thakorrr',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman',
    status:'Missed',
    type:'video',
    onstatus:1
  }
]


const onPresscall =()=>{
    alert("call");
}

const CallScreen = (props) => {

 const navigation = useNavigation();
    console.log("GGGGGGGGGGGGGGGG",props.contact_data)
    console.log("aaaaaa",list.length);
    const [listData, setListData] = useState(
            list.map((ls,i) => ({ 
                key: `${i}`, 
                text: `item #${i}` ,
                name:`${ls.name}`,
                avatar_url:`${ls.avatar_url}`,
                subtitle:`${ls.subtitle}`,
            }))
    );
    return (
        <ScrollView>
        <View style={styles.container}>
            {
                list.map((data,i)=>{
                    return(
                        <TouchableHighlight
                            onPress={onPresscall}
                            key = {i}
                        >
                    <View>
                        <ListItem  bottomDivider>
                            <Avatar rounded  size ={50}  source={{uri: data.avatar_url}} />
                            <ListItem.Content>
                                <ListItem.Title 
                                    style={{
                                        fontWeight: "bold",
                                        color:data.onstatus==0 ? 'black' : 'red'
                                    }}
                                >
                                    {data.name}
                                </ListItem.Title>
                                <ListItem.Subtitle style={{flexDirection: 'row'}}>
                                    <View>
                                        <Icon 
                                            name={data.type=="call" ? "phone" : "video-camera"} 
                                            size={15} 
                                            color='black' 
                                        />
                                    </View>
                                    <View>
                                        <Text style={{marginLeft:8}}>{data.status}</Text>
                                    </View>
                                </ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    </View>
                </TouchableHighlight>            
                )   
            })
        }
        </View>
        </ScrollView>
    );
}

export default CallScreen


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
});