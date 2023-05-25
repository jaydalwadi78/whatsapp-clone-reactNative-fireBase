import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View ,Image,Button,Alert,ScrollView,TouchableOpacity,FlatList,SafeAreaView,TouchableHighlight,Text} from 'react-native';
import { ListItem, Icon, Avatar } from 'react-native-elements';

import { connect } from 'react-redux';

import { getstatus} from '../actions/userAction';

const list = [
  {
    name: 'Megha',
    avatar_url: 'https://images.newindianexpress.com/uploads/user/imagelibrary/2020/5/15/w900X450/Disha_Patani.jpg',
    subtitle: 'Vice President',
    time: '3 minutes ago',
    status:1
  },
  {
    name: 'Rahul Patel',
    avatar_url: 'http://192.168.1.20/whatsapp/assets/images3.jpeg',
    time: '10 minutes ago',
    status:0
  },
  {
    name: 'Jay Dalwadi',
    avatar_url: 'http://192.168.1.20/React_native_whatsapp_new/assets/images5.jpg',
    time: '30 minutes ago',
    status:0
  },
  {
    name: 'Pal',
    avatar_url: 'http://192.168.1.20/React_native_whatsapp_new/assets/images4.jpeg',
    status:1
  },
  {
    name: 'Yogita',
    avatar_url: 'http://192.168.1.20/React_native_whatsapp_new/assets/images6.jpeg',
    status:0
  },

]


const StoryScreen = (props) => {
const navigation = useNavigation();

const startcChat = async() =>{   
    alert("View Story");
}
   const renderItem = ({ item }) => (
    <View>    
        <TouchableHighlight
            onPress={
                ()=>startcChat()
            }
            underlayColor={'#AAA'}
        >
            <View>
                <ListItem  bottomDivider>
                    {                       
                            <View style={{
                                borderStyle:'solid',
                                borderWidth:2,
                                borderColor:'green',
                                borderRadius:50
                            }}>
                                <Avatar rounded size ={50} source={require('../assets/story.png')} />
                            </View>                      
                    }
                    <ListItem.Content>
                        <ListItem.Title style={{fontWeight: "bold"}}>{item.name}</ListItem.Title>
                        <ListItem.Subtitle>{item.time}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </View>
        </TouchableHighlight>       
    </View>
  );
  return(
     <SafeAreaView>
     <View >
            <FlatList
                data={list}
                renderItem={renderItem}
                keyExtractor={(item) => "item_" + Math.floor((Math.random()*100000000) + 1) +item.name}
            />
            </View>
      </SafeAreaView>
  )
}


const mapStateToProps = (state) => {
  return {
    statusdata: state.users.status_data
   //console.log("lllllllllllll", contact_data)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    contactstatus: (uid) => { dispatch(getstatus(uid)); },
    
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(StoryScreen)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
});
