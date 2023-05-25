import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import firebase, { sendStatus, getAllStatus, db, getCurrentStatus, sendMessage } from '../config/firebase';
import * as ImageManipulator from 'expo-image-manipulator';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

export default function DocumentPicker(props) {
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  //console.log("HHHH>>>>>>>>>",props);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await DocumentPicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);


   const pickDocument = async () =>  {
      let result = await DocumentPicker.getDocumentAsync({});
      alert(result.uri);
      console.log(result);
  }
     
        console.log("DDDDD",result.uri);
    if (!result.cancelled) {
      setImage(url);
    }
      let room_id = props.route.params.room_id;
      sendMessage(room_id,{url})
    // console.log("LLLLLLLLLLLLLMMMMMM",image);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
     <Button title="Document " onPress={pickDocument} style={styles.button1}/>
      <Button title="Back " onPress={()=>navigation.navigate('Chat')}/>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    fixToText: {
    flexDirection: 'row',
   padding:150,
  },
    thumbnail: {
    width: 400,
    height: 650,
    resizeMode: "cover",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#25D366",
    padding: 15,
    marginTop:150,
    paddingTop:15,
    paddingBottom:15,
    marginLeft:80,
    marginRight:70,
    borderRadius:10,
    borderWidth: 1,
    borderColor:'#25D366'
    
  },
    backTextWhite: {
        color: '#FFF',
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
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 50,
        minHeight:'100%'
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
    fab: {
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
            backgroundColor: '#33cc00',
    },
});