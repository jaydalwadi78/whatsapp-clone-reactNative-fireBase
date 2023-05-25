import React, { useState,useEffect } from 'react';
import { 
    Text, 
    View,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,
    StatusBar,
    TextInput,
    Platform,
    StyleSheet,
    ImageBackground,
    Button,
    Alert,
    Image,
    AsyncStorage,
   FlatList,
  SafeAreaView,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { connect } from 'react-redux';
import Constants from 'expo-constants';
import { Ionicons,AntDesign,FontAwesome,Entypo,MaterialIcons,Feather} from '@expo/vector-icons';
import { Card, ListItem, Icon ,Avatar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { getstatus} from '../actions/userAction';
import firebase, { sendStatus, getAllStatus, db, getCurrentStatus } from '../config/firebase';



const StatusScreen = (props) => {
    const navigation = useNavigation();
    const [data, setData] = React.useState({});
    const [image, setImage] = useState(null);
    const [uid, setId] = useState();

    const [contact, setContact ] = useState([]);
    const [newuserDetails,setNewUser] = useState([]);
    const [fid,setFid] = useState([]);

  useEffect(() => {
    (async () => {
      let usero = await AsyncStorage.getItem('userToken');
      setId(usero);

    })();
  }, [uid])

  useEffect(() => {
    props.contactstatus(uid);
  }, []); 
  //console.log("props", props.statusdata); 
//console.log("uid",uid);
  return (
    <View style={styles.container}>
      {
        (props.statusdata.length > 0) ?
          props.statusdata.map((data1, i) => {
          //  console.log("data1",data1);
             return (
              <View>
                <TouchableHighlight onPress={
                  () => navigation.navigate('Statuscamera', {
                    id: data1.id,
                     status: data1.text.status 
                  })
                }>
                  <ListItem bottomDivider>
                    {(data1.text.status != null && data1.text.status) ? 
                    <Avatar rounded source={{ uri: data1.text.status }} /> :
                     <></>}
                    <ListItem.Content>
                      <ListItem.Title button >
                        {  
                          (data1.id == uid ) ?
                            <Text> My Status </Text>
                            : <Text>{data1.id}</Text>
                        }</ListItem.Title>
                      <ListItem.Subtitle>
                        {(data1.id == uid) ?
                          <Text>Tap to add status update</Text>
                          : <Text>111111111111</Text>
                        }
                      </ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>

                </TouchableHighlight>
              </View>
            )
          })
          :
          <></>
      }       
    </View>
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


export default connect(mapStateToProps, mapDispatchToProps)(StatusScreen)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
   
  });