import React, { useState, useEffect } from 'react';
import { Platform, Dimensions, StatusBar, StyleSheet, Text,Alert, View, AsyncStorage, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer, getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from './screens/MainScreen';
import ProfileScreen from './screens/ProfileScreen';
import MediaScreen from './screens/MediaScreen';
import AllContactScreen from './screens/AllContactScreen';
import { Ionicons,AntDesign,FontAwesome,Entypo,MaterialCommunityIcons } from '@expo/vector-icons';

import ChatsScreen from './screens/ChatsScreen';
import StoryScreen from './screens/StoryScreen';
import CallScreen from './screens/CallScreen';
import MessageScreen from './screens/MessageScreen';
import SettingScreen from './screens/SettingScreen';
import ProfileEditScreen from './screens/ProfileEditScreen';

import { registerFetchTask, contactFetchTask, newcontactFetchTask } from './helpers/backgroundFetch';

import Camera from './screens/Camera';
import Audio from './screens/Audio';
import VideoRecoding from './screens/VideoRecoding';
import location from './screens/location';
import ImagePicker from './screens/imagePicker';

import ContactstatusScreen from './screens/ContactstatusScreen';
import StatusCameraScreen from './screens/StatusCameraScreen';

import WelcomeScreen from './screens/WelcomeScreen';
import UserDetail from './screens/UserDetail';

import { ActivityIndicator } from 'react-native-paper';
import { Card, ListItem, Icon, Avatar, Badge, withBadge } from 'react-native-elements';
import { AuthContext } from './components/context';
import firebase from 'firebase';
import auth from '@react-native-firebase/auth';

import { db, createRoom, APIURL } from './config/firebase';

import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import { CustomMenu } from './components/CustomMenu';
import * as RootNavigation from './components/RootNavigation';



import { Provider } from 'react-redux';
import store from './store/store';
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;





const Stack = createStackNavigator();
function getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Chats';
    switch (routeName) {
        case 'Story':
            return 'My Story';
        case 'Call':
            return 'My call';
        case 'Chats':
            return 'My Messages';
        case 'Setting':
            return 'My Settings';
    }
}




export default function App(props) {

    const navigation = props.navigation
    const initialLoginState = {
        isLoading: true,
        userToken: null
    };

    const [userDetails, setUserDetails] = useState([])
    const [userstate, setState] = useState(null);
    setStateFn = setState;
    const [contactstate, setcontactState] = useState(null);
    setcontactStateFn = setcontactState;

    const loginReducer = (prevState, action) => {
        switch (action.type) {
            case 'RETRIVE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false
                };
            case 'LOGIN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false
                };
        }
    };


   
    useEffect(() => {
        (async () => {
            let users = await db.collection("users").get()

            let newarray = [];
            users.docs.forEach(snap => {
                if (userDetails.length > 0) {
                    newarray = [...userDetails, { text: snap.data(), id: snap.id }]
                    setUserDetails(newarray);
                } else {
                    newarray.push({
                        text: snap.data(), id: snap.id
                    })
                    setUserDetails(newarray);
                }
            });
        })();
    }, []);


    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

    const authContext = React.useMemo(() => ({
        singIn: async (mno, userid, profile, name) => {
        /*     console.warn("Mobile num >> ",mno)
            console.warn("userid >> ",userid) */
            let usertoken;
            usertoken = null;
            if (mno != '' && userid != '' && profile != '' && name != '') {
                mno = AsyncStorage.setItem('mno', mno);
                usertoken = AsyncStorage.setItem('userToken', userid);
                profile = AsyncStorage.setItem('userProfile', profile);
                name = AsyncStorage.setItem('userName', name);
                usertoken = userid;
                dispatch({ type: 'LOGIN', token: usertoken })
            }
        },
    }), []);


    useEffect(() => {
          (async () => {
        registerFetchTask();
        contactFetchTask();
        newcontactFetchTask();
          })();
    }, []);

    useEffect(() => {
        setTimeout(async () => {
            let userTok;
            userTok = null;
            try {
                userTok = await AsyncStorage.getItem('userToken')
            } catch (e) {
                console.log(e)
            }
            dispatch({ type: 'RETRIVE_TOKEN', token: userTok })
        }, 3000);

    }, []);
    if (loginState.isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color="#E67817" size="large" />
            </View>
        )
    }


    chatprofile = () =>{
        alert("ok");
                
    }

    return (
        <Provider store={store}>
            <AuthContext.Provider value={authContext}>
                <StatusBar
                    translucent={true}
                    backgroundColor={'transparent'}
                    barStyle="light-content"
                    {...props} />
                <NavigationContainer>
                    <Stack.Navigator headerMode="screen">
                        {loginState.userToken !== null ? 
                             userDetails.length > 0 ? 
                            (
                            <>
                                <Stack.Screen name="Thirds"
                                    component={MainScreen}                        
                                    options={({  route }) => ({                                   
                                    headerStyle: {
                                          backgroundColor: '#075E54'
                                    },
                                    headerTitle: getHeaderTitle(route),
                                    headerTintColor: '#fff',
                                    headerRight: () => (
                                        <CustomMenu
                                          menutext="Menu"
                                          menustyle={{marginRight: 14}}
                                          textStyle={{color: 'white'}}                                                                    
                                          isIcon={true}
                                        />
                                      )                                   
                                  })}
                                    initialParams={{ 'userDetails': userDetails }}

                                />
                                <Stack.Screen name="Profile" component={ProfileScreen} 
                                 options={({  route }) => ({                                   
                                    headerStyle: {
                                          backgroundColor: '#075E54'
                                    },
                                    headerTitle: 
                                      <View>
                                        <Text style={{fontWeight:'bold',color:'white',fontSize:20}}>Profile </Text>
                                      </View>,
                                    headerTintColor: '#fff',
                                    headerRight: () => (
                                        <CustomMenu
                                          menutext="Menu"
                                          menustyle={{marginRight: 14}}
                                          textStyle={{color: 'white'}}                                                                    
                                          isIcon={true}
                                        />
                                      )
                                   
                                  })}
                                />
                                <Stack.Screen name="Media" component={MediaScreen} />
                                <Stack.Screen name="AllContact" component={AllContactScreen} 
                                 options={({  route }) => ({
                                    headerTitle: 
                                      <View>
                                        <Text style={{fontWeight:'bold',color:'white',fontSize:20}}>Select contact </Text>
                                        <Text style={{color:'white'}}>{route.params}  contacts</Text>
                                      </View>,
                                    headerStyle: {
                                          backgroundColor: '#075E54'
                                    },
                                    headerTintColor: '#fff',
                                  })}

                                />

                                <Stack.Screen name="Chat" component={ChatsScreen}  
                                options={({  route }) => ({
                                    headerTitle: 
                                      <View>                                       
                                        <Text style={{fontWeight:'bold',color:'white',fontSize:15,marginLeft:5}}>{route.params.name}</Text>
                                        <Text style={{color:'lightgray',marginLeft:5}}>Last seen 8 hours ago</Text>
                                      </View>,
                                    headerStyle: {
                                          backgroundColor: '#075E54'
                                    },
                                    headerTintColor: '#fff',
                                    headerRight: () => (                                                            
                                        <TouchableOpacity onPress={() => chatprofile()}>                                
                                            <View style={{marginRight:30}}>                                    
                                                <Image
                                                    style={styles.logo}
                                                    source={route.params.imgdata ? { uri: route.params.imgdata } : require('./assets/images/default.jpg')}                                               
                                                /> 
                                            </View>
                                        </TouchableOpacity>
                                                                                                   
                                    )
                                  })}
                                />

                                <Stack.Screen name="Story" component={StoryScreen}/>
                                <Stack.Screen name="Chats" component={MessageScreen}/>
                                <Stack.Screen name="Call" component={CallScreen} />
                                <Stack.Screen name="Setting" component={SettingScreen}
                                 options={({  route }) => ({ 
                                  headerTitle: 
                                      <View>
                                        <Text style={{fontWeight:'bold',color:'white',fontSize:20}}>Settings </Text>                                  
                                      </View>,                                  
                                    headerStyle: {
                                          backgroundColor: '#075E54'
                                    },
                                    headerTintColor: '#fff',                                                                       
                                  })}
                                />
                                <Stack.Screen name="select contact" component={ContactstatusScreen} />
                                <Stack.Screen name="Statuscamera" component={StatusCameraScreen} />

                                <Stack.Screen name="Camera" component={Camera} />
                                <Stack.Screen name="Audio" component={Audio} />
                                <Stack.Screen name="VideoRecoding" component={VideoRecoding} />
                                <Stack.Screen name="Location" component={location}
                                 options={({  route }) => ({ 
                                  headerTitle: 
                                      <View>
                                        <Text style={{fontWeight:'bold',color:'white',fontSize:20}}>Send location  </Text>                                  
                                      </View>,                                  
                                    headerStyle: {
                                          backgroundColor: '#075E54'
                                    },
                                    headerTintColor: '#fff',                                                                       
                                  })}
                                />
                                <Stack.Screen name="ImagePicker" component={ImagePicker} />
                                <Stack.Screen name="ProfileEditScreen" component={ProfileEditScreen} 
                                options={({  route }) => ({ 
                                  headerTitle: 
                                      <View>
                                        <Text style={{fontWeight:'bold',color:'white',fontSize:20}}>Profile </Text>                                  
                                      </View>,                                  
                                    headerStyle: {
                                          backgroundColor: '#075E54'
                                    },
                                    headerTintColor: '#fff',                                                                       
                                  })}
                                />
                            </>
                        )
                        :
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <ActivityIndicator color="#E67817" size="large" />
                                </View>
                            :
                            <>

                                <Stack.Screen
                                    name="Welcome"
                                    component={WelcomeScreen}
                                    options={{ title: 'Welcome to WhatsApp' }}
                                />
                                <Stack.Screen
                                    name="UserDetail"
                                    component={UserDetail}
                                    options={{ title: 'Welcome to WhatsApp' }}
                                />

                            </>
                        }
                    </Stack.Navigator>
                </NavigationContainer>
            </AuthContext.Provider>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo:{
    width: 40,
    height: 40,
    borderRadius: 40
    },
});
