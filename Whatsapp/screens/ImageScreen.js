import * as React from 'react';
import { StyleSheet, View ,Image,Button,Alert,ScrollView,TouchableOpacity,FlatList,SafeAreaView,TouchableHighlight} from 'react-native';
import {TextInput,Text} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';  
import { Card, ListItem, Icon ,Avatar} from 'react-native-elements';


const ImageScreen = () => {
const list = [
  {
    name: 'Megha',
    avatar_url: 'https://images.newindianexpress.com/uploads/user/imagelibrary/2020/5/15/w900X450/Disha_Patani.jpg',
  },
  {
    name: 'Rahul Patel',
    avatar_url: 'https://i.pinimg.com/originals/f9/86/06/f9860648705f13f8daa5f7b3d25c5cc1.png',
  },
  {
    name: 'Jay Dalwadi',
    avatar_url: 'https://images.newindianexpress.com/uploads/user/imagelibrary/2020/5/15/w900X450/Disha_Patani.jpg',
  },
  {
    name: 'Pal',
   avatar_url: 'https://i.pinimg.com/originals/f9/86/06/f9860648705f13f8daa5f7b3d25c5cc1.png',
  },
  {
    name: 'Yogita',
    avatar_url: 'https://images.newindianexpress.com/uploads/user/imagelibrary/2020/5/15/w900X450/Disha_Patani.jpg',
  },
  {
    name: 'Rahul Patel',
    avatar_url: 'https://i.pinimg.com/originals/f9/86/06/f9860648705f13f8daa5f7b3d25c5cc1.png',
  },
  {
    name: 'Darshan ',
    avatar_url: 'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',
  },
  {
    name: 'Yash',
    avatar_url: 'https://i.pinimg.com/originals/f9/86/06/f9860648705f13f8daa5f7b3d25c5cc1.png',
  },
   {
    name: 'Darshan ',
    avatar_url: 'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',
  },
  {
    name: 'Yash',
    avatar_url: 'https://i.pinimg.com/originals/f9/86/06/f9860648705f13f8daa5f7b3d25c5cc1.png',
  }
]

  const renderItem = ({ item }) => ( 
    <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image style={styles.cardImage} source={{uri:item.avatar_url}}/>
        </View>                
    </View>
  );

  return(
    <SafeAreaView>
        <View>
            <FlatList
                data={list}
                renderItem={renderItem}
                numColumns={2}
                keyExtractor={(item) => "item_" + Math.floor((Math.random()*100000000) + 1) +item.name}
            />
        </View>
    </SafeAreaView>

    );
}

export default ImageScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
  },
  list: {
    paddingHorizontal: 10,
  },
  listContainer:{
    alignItems:'center'
  },
  separator: {
    marginTop: 10,
  },
 
  card:{
    marginVertical: 8,
    backgroundColor:"white",
    flexBasis: '45%',
    marginHorizontal: 10,
  },
  cardContent: {
    paddingVertical: 17,
    justifyContent: 'space-between',
  },
  cardImage:{
    flex: 1,
    height: 150,
    width: null,
  },
  imageContainer:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },

  title:{
    fontSize:18,
    flex:1,
    color:"#778899"
  },
  count:{
    fontSize:18,
    flex:1,
    color:"#B0C4DE"
  },
}); 
