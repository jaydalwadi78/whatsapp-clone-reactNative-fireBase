import * as React from 'react';
import { StyleSheet, View ,Image,Button,Alert,ScrollView,TouchableOpacity} from 'react-native';
import {TextInput,Text} from 'react-native-paper';
import { NavigationContainer,getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';  
import { Card, ListItem,Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import StoryScreen from './StoryScreen';
import CallScreen from './CallScreen';
import MessageScreen from './MessageScreen';
import SettingScreen from './SettingScreen';
import CameraScreen from './CameraScreen';
import StatusScreen from './StatusScreen';

const AuthContext = React.createContext();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainScreen() {
  return (
    <Tab.Navigator initialRouteName="Chats"
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Story') {
                  iconName = 'spinner';
                } else if (route.name === 'Call') {
                  iconName = 'phone';
                }  else if (route.name === 'Camera') {
                  iconName = 'camera';
                } else if (route.name === 'Chats') {
                  iconName = 'comment';
                } else if (route.name === 'Setting') {
                  iconName = 'cog';
                }
                // You can return any component that you like here!
                return <Icon name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: '#33cc00',
              inactiveTintColor: 'gray',
            }}
      >
      <Tab.Screen name='Camera' component={CameraScreen} />
      <Tab.Screen name='Story' component={StoryScreen} options={{ title: 'Story' }} />
      <Tab.Screen name='Chats'  component={MessageScreen}  />
      <Tab.Screen name='Call' component={CallScreen} options={{ title: 'Call' }} />
      <Tab.Screen name='Setting' component={SettingScreen} />
      <Tab.Screen name='Status' component={StatusScreen} />
    </Tab.Navigator>
  )
}
export default MainScreen;

const styles = StyleSheet.create({
    logo: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#fff'
    },
    input: {
    width: 350,
    height: 40,
    padding: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: 'grey',
    borderStyle: 'solid',
    borderRadius: 3
  },
  picker:{ 
    paddingTop:10,
    width:'80%',
    marginLeft:33,
  },

});

