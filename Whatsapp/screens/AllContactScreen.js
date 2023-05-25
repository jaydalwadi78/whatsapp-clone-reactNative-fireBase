import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, Image, Button, Alert, ScrollView, AsyncStorage, TouchableOpacity, FlatList, SafeAreaView, TouchableHighlight, Text } from 'react-native';
import { ListItem, Icon, Avatar } from 'react-native-elements';
import { db, createRoom, APIURL } from '../config/firebase';
import { connect } from 'react-redux';


const AllContactScreen = (props) => {
    const navigation = useNavigation();
    
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

  
    const renderItem = ({ item }) => {
        {
            //let imgUrl = item.profile_img ? { uri: item.profile_img } : require('../assets/images/default.jpg');
            return (

                (item.name != null && item.number) ?
                    <View>
                        <TouchableHighlight
                            onPress={
                                () => startChat(item.id, item.name, item.dbid, item.expotoken,item.profile_img)
                            }
                        >

                            <ListItem bottomDivider>
                                <Image
                                    style={styles.logo}
                                    source={item.profile_img ? { uri: item.profile_img } : require('../assets/images/default.jpg')}
                                />          
                                <ListItem.Content>
                                    <ListItem.Title
                                        style={{
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {item.name}
                                    </ListItem.Title>
                                    <ListItem.Subtitle>
                                        {(item.number) ? item.number[0] : 'No Number'}
                                    </ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
                        </TouchableHighlight>
                    </View>
                    :
                    <></>
            )
        }
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <FlatList
                    data={props.newcontact_data}
                    renderItem={renderItem}
                    keyExtractor={(item) => "item_" + Math.floor((Math.random() * 100000000) + 1) + item.name}
                />
            </View>
        </SafeAreaView>
    );
}

const mapStateToProps = (state) => {
    return {
        newcontact_data: state.users.newcontact_data,
    }
}

export default connect(mapStateToProps, null)(AllContactScreen);

const styles = StyleSheet.create({
    container: {

    },
    backTextWhite: {
        color: '#FFF',
    },
    logo:{
        width: 50,
        height: 50,
        borderRadius: 50
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
    aa: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        borderRadius: 10, // adds the rounded corners
        backgroundColor: '#fff'
    }
});