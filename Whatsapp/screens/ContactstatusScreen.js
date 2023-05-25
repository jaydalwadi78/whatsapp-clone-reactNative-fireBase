import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
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
    ScrollView 
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../components/context';
import { db } from '../config/firebase';
import { userReducer } from '../reducers/userReducer';
import { connect } from 'react-redux';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import HrWithText from "../components/hrWithText";
import { Card, ListItem, Icon ,Avatar } from 'react-native-elements';

const ContactstatusScreen = (props) => {
    const [uid, setId] = useState();

    useEffect(() => {
    (async () => {
      let usero = await AsyncStorage.getItem('userToken');
      setId(usero);
    })();
  }, [uid])

    //console.log('route', route);
   /*  const images = require('../assets/default.jpg'); */
  // console.log("route",route.params.localUri);
  const navigation = useNavigation();
  //console.log("contact_data",props.contact_data);
 // console.log("newcontact_data",props.newcontact_data);
   
    const [data, setData] = React.useState({
        text: 'Welcome to WhatsApp',
        name: '',
        isValidname: true,
    });
    
    return (
        <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>                
        <HrWithText text={`Other contacts`} />
           {
        (props.newcontact_data.length > 0) ?
          props.newcontact_data.map((data1, i) => {
            console.log("data1",data1);
             return (
              <View>
                <TouchableHighlight onPress={
                  () => navigation.navigate('Statuscamera', {
                    /*id: data1.id,
                     status: data1.text.status */
                  })
                }>
                  <ListItem bottomDivider>
                    {(data1.length > 0) ? 
                    <Avatar rounded source={{ uri:'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' }} /> :
                     <></>}
                    <ListItem.Content>
                      <ListItem.Title button >
                        <Text>{data1.name}</Text>                    
                        </ListItem.Title>                      
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
        </ScrollView>
    )
}

  
const mapStateToProps = (state) => {
  
console.log("state",state);
  return {
    contact_data: state.users.contact_data,
    newcontact_data:state.users.newcontact_data,
  }
}
export default connect(mapStateToProps, null)(ContactstatusScreen)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    image: {
        flex: 1,
        
        marginTop:20

    },
    titleText: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: 'center',
        marginTop: 610,
        padding: 80,

    },
    button: {
        alignItems: "center",
        backgroundColor: "#25D366",
        padding: 15,
        marginTop: 150,
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 80,
        marginRight: 70,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#25D366'

    },
    profile:{
marginBottom:6,
left:10
    },

    sendtext: {
        color: "#FFFFFF",
    },
    textcode: {
        marginTop: 240,
        marginRight: 30,
        marginLeft: 60,
        height: 50,
        borderColor: 'gray',
        borderWidth: 2
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    footerstyle: {
        marginBottom: 40,
        marginLeft: 50,
        marginRight: 30,
        color: '#A9A9A9',
        fontSize: 15,
    },
    action: {
        marginLeft: 60,
        flexDirection: "row",
        top: 80
    },
    smstext: {
        top: 100,
        textAlign: "center",
        paddingStart: 9,
        marginTop: 30,
        fontSize: 18
    },


});