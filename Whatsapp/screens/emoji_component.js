import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View ,Image,Button,Alert,TouchableOpacity,TouchableHighlight} from 'react-native';
import {TextInput,Text,Card} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ListItem, Avatar,Overlay} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions,Animated,ScrollView } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import EmojiBoard from 'react-native-emoji-board';
import { Ionicons,AntDesign,FontAwesome,Entypo,MaterialCommunityIcons } from '@expo/vector-icons';

    const emoji_component = (props) => {
    const [show, setShow] = useState(false);
    const onClick = (emoji) => {
        console.log(emoji);
    };
 
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <TouchableOpacity onPress={() => setShow(!show)}>        
                <Entypo name="emoji-happy" size={24} color="black" />
            </TouchableOpacity>
            <EmojiBoard showBoard={show} onClick={onClick} />
        </>
    );
};

export default emoji_component

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
 
});