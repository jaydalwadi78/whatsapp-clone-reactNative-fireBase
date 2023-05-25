/*import * as React from 'react';*/
import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    TextInput,
    Platform,
    StyleSheet,
    ImageBackground,
    Button,
    Alert,
    Image,
    AsyncStorage,
    Modal,
    Pressable,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard

} from 'react-native';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../components/context';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Card, ListItem, Icon ,Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as Permissions from 'expo-permissions';
import firebase,{db,APIURL} from '../config/firebase';
import {
    MID_GREEN,
    BLACK,
    LIGHT_GREEN,
    BAR_ACTIVE_COLOR,
    BAR_INACTIVE_COLOR,
    TINT_GRAY,
  } from '../components/utils/colors';
  import {  Portal, Provider,FAB } from 'react-native-paper';
  import { contactCallAction, newcontactCallAction } from '../actions/userAction';

const UserDetail = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [userDetails, setUserDetails] = useState(props.route.params.userDetails);
    const [userContact, setUserContact] = useState([])
    const navigation = useNavigation();
    const [data, setData] = React.useState({
        text: 'Welcome to WhatsApp',
        name: '',
        isValidname: true,
    });
    const [image, setImage] = useState(null);
    useEffect(() => {

      if (props.contact_data.length > 0 && userDetails.length > 0) {
         let newcontactarray = [];
         userDetails.map((data1, i) => {
             let findindex = props.contact_data.findIndex(
                 element => (element.number) ? element.number == data1.text.mobile_no : ''
             );
             if (findindex >= 0) {
                 if (newcontactarray.length > 0) {
                     let findindex1 = newcontactarray.findIndex(
                         element => element.name == props.contact_data[findindex].name
                     );

                     if (findindex1 >= 0) { }
                     else {
                         props.contact_data[findindex].dbid = data1.id;
                         props.contact_data[findindex].profile_img = data1.text.profile;
                         props.contact_data[findindex].expotoken = data1.text.expoToken;
                         newcontactarray = [...newcontactarray, props.contact_data[findindex]]
                     }
                 } else {
                     props.contact_data[findindex].dbid = data1.id;
                     props.contact_data[findindex].expotoken = data1.text.expoToken;
                     newcontactarray.push(props.contact_data[findindex])
                 }
             }
         });
         setUserContact(newcontactarray);
         props.newcontactCall(newcontactarray);
     } 

     //console.log("userDetails >>>", userDetails);
    }, []);



    const validatefield = () => {

        if (data.name == '') {
            setData({
                ...data,
                isValidname: false,
            })
            return false;
        }
        else {
            setData({
                ...data,
                isValidname: true,
            })
        }

        return true;
    }

    const handleChange = (key, e, validname) => {
        setData({
            ...data,
            [key]: e.nativeEvent.text,
            [validname]: (e.nativeEvent.text.length > 0) ? true : false
        })
    }




    const pickImageFromCamera = async () => {
        let pickerResult = await ImagePicker.launchCameraAsync();
        if (pickerResult.cancelled===false) {
    
          let resizedPhoto = await ImageManipulator.manipulateAsync(
            pickerResult.uri,
            [{ resize: { width: 300 } }],
            { compress: 1, format: ImageManipulator.SaveFormat.PNG, base64: false },
        );
          const response = await fetch(resizedPhoto.uri);
          const blob = await response.blob();
        
          const tempImage = await firebase
          .storage()
          .ref()
         .child('Profile/' +props.newuserdata.id+""+ Math.floor(Math.random() * 100) +'.png')
         .put(blob);
         console.log("image uploaded");
       
        const url = await tempImage.ref.getDownloadURL();
        setImage(url);
        setModalVisible(false);
      //})
        }
    
      }

      const pickImageFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          quality: 1,
        })
     
        if (result.cancelled ===false ) {
              let resizedPhoto = await ImageManipulator.manipulateAsync(
                result.uri,
                [{ resize: { width: 300} }],
                { compress: 1, format: ImageManipulator.SaveFormat.PNG, base64: false }
        );
           console.log("uriiii",resizedPhoto.uri);
      const response = await fetch(resizedPhoto.uri);
      const blob = await response.blob();
      console.log("blob",blob);
      const tempImage = await firebase
      .storage()
      .ref()
     .child('Profile/' +props.newuserdata.id+""+ Math.floor(Math.random() * 100) +'.png')
     .put(blob);
   
    const url = await tempImage.ref.getDownloadURL();
    setImage(url);
    setModalVisible(false);
      
       
      
       // })
    }
    }

    const { singIn } = React.useContext(AuthContext);

    const registerHandle = async (data) => {
       console.log("detaildata",data);
      try{
        let response = await fetch(`${APIURL}editUser/users/${props.newuserdata.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            //props.newuserdata.id
            body: JSON.stringify(data),
            
        })
        .then(response => response.json())
        .then(data11 => {
            singIn(props.newuserdata.mobile_no,props.newuserdata.id,data.profile,data.name);
           
        })
    }catch(error){
        console.error("Error adding document: ", error);
    };
    }
    const imgUrl = image ? { uri: image } : require('../assets/images/default.jpg');
    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
          <Image
        style={styles.image}
        source={require('../assets/images/whatsapp_logo.png')}
      />
      <View style={{ flexDirection: "column", flex: 1, justifyContent: "center" }} >

<Text style={styles.titleText}>{data.text}</Text>
</View>


<View style={{ flexDirection: "row", flex: 1, justifyContent: "center" }} >

<TextInput
    style={styles.textcode}
    autoCapitalize="none"
    onChange={(e) => handleChange('name', e, 'isValidname')}
    value={data.name}
    placeholder=" Enter Name"
/>
</View>
<View style={styles.action}>
{data.isValidname ? null :

    <Text style={styles.errorMsg}>Please Fill Name.</Text>
}
</View>

<View style={{ flexDirection: "row", flex: 1 }} >
<Text style={styles.profile}>
    Profile Pic
</Text>
<View>
<Image
style={styles.logo}
source={imgUrl}
/>
</View>
</View>

<FAB
    style={styles.fab}
    small
    icon="plus"
    onPress={() => setModalVisible(true)}
  />
 <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >

<View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Icon name={'close'}  size={25} color={'white'} />
             
            </Pressable>
            <Text style={styles.modalText} onPress={() => pickImageFromGallery()} >Gallery</Text>
            <Text style={styles.modalText} onPress={() => pickImageFromCamera()}>Camera</Text>
            
          </View>
        </View>

</Modal>



<View style={{ flexDirection: "column", flex: 1, justifyContent: "center" }} >
<TouchableOpacity
    style={styles.button}
    onPress={() => { registerHandle({profile:image,name:data.name,id:props.newuserdata.id}) }}

>
    <Text style={styles.sendtext}>Send</Text>
</TouchableOpacity>
</View>
<View style={{ flexDirection: "column", flex: 1, justifyContent: "center" }} >

<Text style={styles.footerstyle} >Read our Privacy Policy.Tap "agree & continue" to accept the Terms of Service</Text></View>

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
}

const mapStateToProps = (state)=>{
    return {
        newuserdata : state.users.newuser_data,
        contact_data: state.users.contact_data
        
    }
}
const mapDispatchToProps = (dispatch) => {
  return {
      newcontactCall: (newcontact) => { dispatch(newcontactCallAction(newcontact)) },
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(UserDetail);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    image: {
        left:100,
        width:130,
        height:120

    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: 'center',
        marginTop: 70,
        

    },
    button: {
        alignItems: "center",
        backgroundColor: "#25D366",
        padding: 15,
        marginTop: 50,
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 80,
        marginRight: 70,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#25D366'

    },
    profile:{
bottom:10,
left:10
    },
    logo:{
        width: 150,
        height: 150,
        left:20,
        borderRadius: 100
    },
    inner: {
        padding: 25,
        flex: 1,
        justifyContent: "space-around"
      },

    sendtext: {
        color: "#FFFFFF",
    },
    textcode: {
        marginTop:20,
        marginRight: 30,
        marginLeft: 50,
        height: 50,
        borderColor: 'gray',
        borderWidth: 2,
        right:30,
        minWidth: "90%",
    
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
        top: 10,
        paddingStart: 5,
        marginTop: 20,
        fontSize: 18,
        left:30,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor:'#25D366',
        color:'#FFFFFF'
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      buttonClose: {
        backgroundColor: "#E41B17",
        marginTop:6,
        marginLeft:40,
        marginBottom:15,
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }


});