import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, Image, Button, Alert, ScrollView, AsyncStorage, TouchableOpacity, FlatList, SafeAreaView, TouchableHighlight, Text } from 'react-native';
import { ListItem, Icon, Avatar } from 'react-native-elements';
import { db, createRoom, APIURL } from '../config/firebase';
import { connect } from 'react-redux';
import * as BackgroundFetch from 'expo-background-fetch';

const Newcontact = (props) => {
  
const navigation = useNavigation();
    
    useEffect(() => {  
       /* props.newcontact_data;
       console.log("TTTTNNNNN",props.newcontact_data);*/
    const receivedNewData = Math.random()
    console.log("jay task ", receivedNewData)
    },[])

    return (
        <SafeAreaView>
            <View style={styles.container}>
                
            </View>
        </SafeAreaView>
    );
}


/*const mapStateToProps = (state)=>{
    return {
        contact_data: state.users.contact_data,
        newcontact_data:state.users.newcontact_data,
    }
}*/


export default Newcontact;


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