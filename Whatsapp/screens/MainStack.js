import * as React from 'react';
import { StyleSheet, View ,Image,Button,Alert,ScrollView,TouchableOpacity} from 'react-native';
import { NavigationContainer,getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import StoryScreen from './StoryScreen';
import CallScreen from './CallScreen';
import MessageScreen from './MessageScreen';
import SettingScreen from './SettingScreen';

const StoryStack = createStackNavigator();
const CallStack = createStackNavigator();
const MessageStack = createStackNavigator();

export const StoryStackScreen = ({navigation}) => (
    <StoryStack.Navigator
        screenOptions= {{
            headerStyle:{
                backgroundColor: '#E67817'
            },
            headerTintColor:'#fff',
            headerTitleStyle:{
                fontWeight: 'bold'
            }
        }}
    >
    	<StoryStack.Screen 
            name="Story" 
            component={StoryScreen}
            options={{
                title: 'My Story',
            }}
        />
    </StoryStack.Navigator>
)

export const CallStackScreen = ({navigation}) => (
    <CallStack.Navigator
        screenOptions= {{
            headerStyle:{
                backgroundColor: '#E67817'
            },
            headerTintColor:'#fff',
            headerTitleStyle:{
                fontWeight: 'bold'
            }
        }}
    >
    	<CallStack.Screen 
            name="Call" 
            component={CallScreen}
            options={{
               title: 'My Calls',
            }}
        />
    </CallStack.Navigator>
)


export const MessageStackScreen = ({navigation}) => (
    <MessageStack.Navigator
        screenOptions= {{
            headerStyle:{
                backgroundColor: '#E67817'
            },
            headerTintColor:'#fff',
            headerTitleStyle:{
                fontWeight: 'bold'
            }
        }}
    >
    	<MessageStack.Screen 
            name="Chats" 
            component={MessageScreen}
            options={{
                title: 'My Chats',
            }}
        />
    </MessageStack.Navigator>
)