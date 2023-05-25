import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Button, Alert, ScrollView, TouchableOpacity, TouchableHighlight, AsyncStorage } from 'react-native';
import { TextInput, Text, FAB } from 'react-native-paper';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card, ListItem, Avatar } from 'react-native-elements';
import { SwipeRow, SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AllContactScreen } from './AllContactScreen';


import { contactCallAction, newcontactCallAction } from '../actions/userAction';
import { connect } from 'react-redux';
import * as Notifications from 'expo-notifications';

import { db, createRoom, APIURL } from '../config/firebase';

import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import CryptoJS from "react-native-crypto-js";

const list = [
    {
        name: 'Megha',
        avatar_url: 'https://images.newindianexpress.com/uploads/user/imagelibrary/2020/5/15/w900X450/Disha_Patani.jpg',
        subtitle: 'Vice President',
        status: 1
    },
    {
        name: 'Rahul Patel', avatar_url: 'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',
        subtitle: 'Vice Chairman',
        status: 0
    },
    {
        name: 'Jay Dalwadi',
        avatar_url: 'https://images.newindianexpress.com/uploads/user/imagelibrary/2020/5/15/w900X450/Disha_Patani.jpg',
        subtitle: 'Vice President',
        status: 0
    },
    {
        name: 'Pal',
        avatar_url: 'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',
        subtitle: 'Vice Chairman',
        status: 1
    },
    {
        name: 'Yogita',
        avatar_url: 'https://images.newindianexpress.com/uploads/user/imagelibrary/2020/5/15/w900X450/Disha_Patani.jpg',
        subtitle: 'Vice President',
        status: 0
    },
    {
        name: 'Rahul Patel',
        avatar_url: 'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',
        subtitle: 'Vice Chairman',
        status: 0
    },
    {
        name: 'Darshan ',
        avatar_url: 'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',
        subtitle: 'Vice President',
        status: 1
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
        status: 1
    },
    {
        name: 'Yash',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman',
        status: 0
    }
]

const MessageScreen = (props) => {
    const navigation = useNavigation();
    const [userDetails, setUserDetails] = useState(props.route.params.userDetails)
    const [contact, setContact] = useState([])
    const [isFill, setisFill] = useState(0)
    const [isContacts, setisContacts] = useState(false)
    const [userContact, setUserContact] = useState([])
    const Allcontactfilename = "dbencryptAllcontact_01.db";
    const Newcontactfilename = "dbencryptAllcontact_01.db";

    const [loading, setLoading] = useState(true);
    const ref = db.collection('users');


    useEffect(() => {
        if (isContacts){
            setisFill(1)
        }else{
            (async () => {
                let fileUri = FileSystem.documentDirectory + Allcontactfilename;
                let fileUrii = FileSystem.documentDirectory + Newcontactfilename;
                let fileExists = await FileSystem.getInfoAsync(fileUri)
                if (fileExists.exists) {
                    alert("yes");
                    let res = await FileSystem.readAsStringAsync(fileUri)
                    let bytes = CryptoJS.AES.decrypt(res, 'secret key 123');
                    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                    setContact(decryptedData);
                    setisContacts(true);
                }
                else {
                    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CONTACTS, Permissions.LOCATION, Permissions.CAMERA, Permissions.AUDIO_RECORDING);
                    if (status === "granted") {
                        const { data } = await Contacts.getContactsAsync({
                            fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
                        })
                        if (data.length > 0) {
                            data.forEach(function (v) {
                                delete v.contactType,
                                    delete v.imageAvailable,
                                    delete v.firstName,
                                    delete v.id,
                                    delete v.lookupKey,
                                    delete v.lastName,
                                    delete v.middleName;

                                if (v.hasOwnProperty("phoneNumbers")) {
                                    let nums = v.phoneNumbers;
                                    let numbers = [];
                                    let resultArr = [];
                                    if (nums.length > 0) {
                                        nums.forEach((num, item) => {
                                            let temp_num = num.number.split(" ").join("");
                                            temp_num = temp_num.substring(temp_num.length - 10)

                                            numbers.push(temp_num);
                                            resultArr = numbers.filter((data, index) => {
                                                return numbers.indexOf(temp_num) === index;
                                            })
                                        })
                                        v.number = resultArr;
                                    }
                                }
                                delete v.phoneNumbers;
                            });
                            setContact(data);
                            setisContacts(true);
                        }
                    }
                }
            })();
        }
    }, [isContacts])


    useEffect(() => {
        (async() =>{
         console.log("TTTTTTTTTTT>>>>>>>>>>>>>",props.newcontact_data)
            let userid = await AsyncStorage.getItem('mno');
            if (contact.length > 0 && userDetails.length > 0) {
                let newcontactarray = [];
                userDetails.map((data1, i) => {
                    if (userid == data1.text.mobile_no){
                        return;
                    }
                    let findindex = contact.findIndex(
                        element => (element.number) ? element.number == data1.text.mobile_no : ''
                    );
                    if (findindex >= 0) {
                        if (newcontactarray.length > 0) {
                            let findindex1 = newcontactarray.findIndex(
                                element => element.name == contact[findindex].name
                            );

                            if (findindex1 >= 0) { }
                            else {
                                contact[findindex].dbid = data1.id;
                                contact[findindex].profile_img = data1.text.profile;
                                contact[findindex].expotoken = data1.text.expoToken;
                                newcontactarray = [...newcontactarray, contact[findindex]]
                            }
                        } else {
                            contact[findindex].dbid = data1.id;
                            contact[findindex].expotoken = data1.text.expoToken;
                            newcontactarray.push(contact[findindex])
                        }
                    }
                });
                setUserContact(newcontactarray);
                props.newcontactCall(newcontactarray);
            }
        })()        
    }, [isFill]);

    const [listData, setListData] = useState(
       props.newcontact_data.map((ls, i) => ({
            key: `${i}`,
            text: `item #${i}`,
            name: `${ls.name}`,
            avatar_url: `${ls.profile_img}`,
            subtitle: `${ls.subtitle}`,
            status: `${ls.status}`
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




    const startChat = async (id, name, mainid, token, profile_img) => {
        let userid = await AsyncStorage.getItem('userToken');
        const friendid = mainid;
        try {
            let response = await fetch(`${APIURL}createchatroom`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        userid: userid,
                        friendid: friendid
                    }
                ),
            })
                .then(response => response.json())
                .then(data => {
                    navigation.navigate('Chat', {
                        id: "1584",
                        name: name,
                        imgdata: profile_img,
                        mainid: mainid,
                        token: token,
                        roomid: data.result,
                    })
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } catch (error) {
            console.error(error);
        }
    }




    const renderItem = (data) => (
          

         <TouchableHighlight
                            onPress={
                                () => startChat(data.item.id, data.item.name, data.item.dbid, data.item.expotoken,data.item.profile_img)
                            }
                        >
            <View>
                <ListItem bottomDivider>
                    {
                        (data.item.status == 1) ?
                            <View style={{
                                borderStyle: 'solid',
                                borderWidth: 2,
                                borderColor: 'green',
                                borderRadius: 50
                            }}>
                                <Avatar
                                    rounded
                                    size={50}
                                    source={{ uri: data.item.avatar_url }}
                                    onPress={
                                        () => navigation.navigate('Profile', { Listdata: data.item })
                                    }
                                    containerStyle={{ padding: 2 }}
                                />
                            </View>
                            :
                            <View style={{
                                borderStyle: 'solid',
                                borderWidth: 2,
                                borderColor: 'white',
                                borderRadius: 50
                            }}>
                                <Avatar
                                    rounded
                                    size={50}
                                    source={{ uri: data.item.avatar_url }}
                                    onPress={
                                        () => navigation.navigate('Profile', { Listdata: data.item })
                                    }
                                    containerStyle={{ padding: 2 }}
                                />
                            </View>
                    }
                    <ListItem.Content>
                        <ListItem.Title style={{ fontWeight: "bold" }}>{data.item.name}</ListItem.Title>
                        <ListItem.Subtitle>{data.item.name}</ListItem.Subtitle>
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
                <Text style={{ color: "#33cc00" }}>(2)</Text>
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


const mapStateToProps = (state) => {
    return {
        contact_data: state.users.contact_data,
        newcontact_data: state.users.newcontact_data,
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        contactCall: (contact) => { dispatch(contactCallAction(contact)) },
        newcontactCall: (newcontact) => { dispatch(newcontactCallAction(newcontact)) },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MessageScreen);



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
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 50,
        minHeight: '100%'
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