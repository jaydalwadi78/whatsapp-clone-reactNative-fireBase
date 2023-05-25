import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    StyleSheet,
    ImageBackground,
    Keyboard,
    Button,
    Alert,
    Image
} from 'react-native';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { contactCallAction } from '../actions/userAction';
import { newcontactCallAction } from '../actions/userAction';
import { adduserAction } from '../actions/userAction';
import { dbcontact } from '../actions/userAction';
import { connect } from 'react-redux';

import auth from '@react-native-firebase/auth';
import { AuthContext } from '../components/context';
import { db } from '../config/firebase';
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';


import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import CryptoJS from "react-native-crypto-js";
import {
    MID_GREEN,
    BLACK,
    LIGHT_GREEN,
    BAR_ACTIVE_COLOR,
    BAR_INACTIVE_COLOR,
    TINT_GRAY,
} from '../components/utils/colors';

const WelcomeScreen = (props) => {

    const navigation = useNavigation();
    const [contact, setContact] = useState([])
    const [userToken, setuserToken] = useState([])
    const Allcontactfilename = "dbencryptAllcontact_01.db";
    const Newcontactfilename = "dbencryptCommoncontact_01.db";

    const confirmationResult = undefined;
    const [data, setData] = React.useState({
        text: 'Welcome to WhatsApp',
        id: '',
        mno: '',
        value: '+38',
        isValidmno: true,
        confirmResult: null,
        verificationCode: '',
        userId: ''
    });



    const [confirm, setConfirm] = useState(null);

    const attemptInvisibleVerification = false;
    const recaptchaVerifier = React.useRef(null);
    const validatefield = () => {
        if (data.mno == '') {
            setData({
                ...data,
                isValidmno: false,
            })
            return false;
        }
        else {
            setData({
                ...data,
                isValidmno: true,
            })
        }
        return true;
    }

    useEffect(() => {
        (async () => {
            props.newcontactCall();
        })();
    }, [])


    useEffect(() => {
        (async () => {
            registerForPushNotifications()
            /*Notifications.addListener(notification => {
                console.log("notification >>>> ", notification)
            })*/
                
            props.contactCall();
        })();
    }, [])

    const registerForPushNotifications = async () => {
        try {
            const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            if (!permission.granted) return;
            const token = await Notifications.getExpoPushTokenAsync();
            
            setuserToken(token.data);
            console.log("expo token >>>>>> ", token);
            console.log("expo token >>>>>> ", token.data);
        } catch (error) {
            console.log('Error getting a token', error);
        }
    }

    useEffect(() => {

        (async () => {
            props.newcontactCall();
            let fileUri = FileSystem.documentDirectory + Allcontactfilename;
            let fileUrii = FileSystem.documentDirectory + Newcontactfilename;
            let fileExists = await FileSystem.getInfoAsync(fileUri)
            if (fileExists.exists) {
                alert("yes");
                let res = await FileSystem.readAsStringAsync(fileUri)
                let bytes = CryptoJS.AES.decrypt(res, 'secret key 123');
                let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                props.contactCall(decryptedData);
                setContact(decryptedData);
                let ress = await FileSystem.readAsStringAsync(fileUrii)
                let bytess = CryptoJS.AES.decrypt(ress, 'secret key 123');
                let decryptedDataa = JSON.parse(bytess.toString(CryptoJS.enc.Utf8));
                props.newcontactCall(decryptedDataa);
            }
            else {
                alert("nathi");
                const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CONTACTS, Permissions.LOCATION, Permissions.CAMERA, Permissions.AUDIO_RECORDING);
                if (status === "granted") {
                    const { data } = await Contacts.getContactsAsync({
                        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
                    })
                    if (data.length > 0) {
                        data.forEach(function (v) {
                            delete v.contactType,
                                delete v.imageAvailable,
                                delete v.firstName,
                                delete v.id,
                                delete v.lookupKey,
                                delete v.lastName,
                                delete v.middleName;

                            if (v.hasOwnProperty("phoneNumbers")) {
                                let nums = v.phoneNumbers;
                                let numbers = [];
                                let resultArr = [];
                                if (nums.length > 0) {
                                    nums.forEach((num, item) => {
                                        let temp_num = num.number.split(" ").join("");
                                        temp_num = temp_num.substring(temp_num.length - 10)

                                        numbers.push(temp_num);
                                        resultArr = numbers.filter((data, index) => {
                                            return numbers.indexOf(temp_num) === index;
                                        })
                                    })
                                    v.number = resultArr;
                                }
                            }
                            delete v.phoneNumbers;
                        });
                        setContact(data);
                        let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123').toString();
                        let fileUri = FileSystem.documentDirectory + Allcontactfilename;
                        await FileSystem.writeAsStringAsync(fileUri, ciphertext, { encoding: FileSystem.EncodingType.UTF8 });
                        const asset = await MediaLibrary.createAssetAsync(fileUri)
                        await MediaLibrary.createAlbumAsync("AAAAAAAAAAAAAA", asset, false)

                        let ciphertextt = CryptoJS.AES.encrypt(JSON.stringify(props.newcontact_data), 'secret key 123').toString();
                        let fileUrii = FileSystem.documentDirectory + Newcontactfilename;
                        await FileSystem.writeAsStringAsync(fileUrii, ciphertextt, { encoding: FileSystem.EncodingType.UTF8 });
                        const assett = await MediaLibrary.createAssetAsync(fileUrii)
                        await MediaLibrary.createAlbumAsync("AAAAAAAAAAAAAA", assett, false)

                        let res = await FileSystem.readAsStringAsync(fileUri)
                        let bytes = CryptoJS.AES.decrypt(res, 'secret key 123');
                        let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                        props.contactCall(decryptedData);

                        let ress = await FileSystem.readAsStringAsync(fileUrii)
                        let bytess = CryptoJS.AES.decrypt(ress, 'secret key 123');
                        let decryptedDataa = JSON.parse(bytess.toString(CryptoJS.enc.Utf8));
                        props.newcontactCall(decryptedDataa);
                    }
                }
            }
        }
        )();
    }, [])

    /*   validatePhoneNumber = () => {
     var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
     return regexp.test(this.state.phone)
   }*/


    const handleChange = (key, e, validname) => {
        setData({
            ...data,
            [key]: e.nativeEvent.text,
            [validname]: (e.nativeEvent.text.length > 0) ? true : false
        })
    }


    const registerHandle = async (data) => {
        props.Adduser(data);
        navigation.navigate('UserDetail');
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            {Platform.OS === 'ios' && (
                <View
                    // To set the background color in IOS Status Bar also
                    style={{
                        backgroundColor: TINT_GRAY,
                        height: 45,
                    }}>
                    <StatusBar barStyle="light-content" backgroundColor={LIGHT_GREEN} />
                </View>
            )}

            {Platform.OS === 'android' && (
                <StatusBar barStyle="dark-content" backgroundColor={'#075E54'} />
            )}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>

                    <Image
                        style={styles.image}
                        source={require('../assets/images/whatsapp_logo.png')}
                    />
                    <View style={{ flexDirection: "column", flex: 1, justifyContent: "center" }} >
                        <Text style={styles.titleText}>{data.text}</Text>
                    </View>
                    <View style={{ flexDirection: "column", flex: 1, justifyContent: "center" }} >
                        <Text style={styles.fixvalue}>{data.value}</Text>
                        <TextInput
                            style={styles.textmno}
                            autoCapitalize="none"
                            onChange={(e) => handleChange('mno', e, 'isValidmno')}
                            value={data.mno}
                        />
                    </View>
                    <View style={styles.action}>
                        {data.isValidmno ? null :

                            <Text style={styles.errorMsg}>Please Fill Mobile No.</Text>
                        }
                    </View>
                    <View style={{ flexDirection: "column", flex: 1, justifyContent: "center" }} >
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => { registerHandle({ "mobile_no": data.mno, token: userToken }) }}

                        >
                            <Text style={styles.sendtext}>Send</Text>
                        </TouchableOpacity>
                    </View>
                    <View id="recaptcha-container"></View>
                    <View style={{ flexDirection: "column", flex: 1, justifyContent: "center" }} >

                        <Text style={styles.footerstyle} >Read our Privacy Policy.Tap "agree& continue" to accept the Terms of Service</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}




const mapStateToProps = (state) => {
    return {
        contact_data: state.users.contact_data,
        newcontact_data: state.users.newcontact_data,
        dbcontact_data: state.users.dbcontact_data,
        newuserdata: state.users.newuser_data,

    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        contactCall: (contact) => { dispatch(contactCallAction(contact)) },
        Adduser: (userdata) => { dispatch(adduserAction(userdata)) },
        //  newcontactCall:(newcontact) => {dispatch(newcontactCallAction(newcontact))},
        newcontactCall: (newcontact) => { dispatch(dbcontact(newcontact)) },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    image: {
        left: 100,
        width: 130,
        height: 120

    },
    titleText: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: 'center',
        marginTop: 210,
        marginBottom: 120

    },
    inner: {
        padding: 25,
        flex: 1,
        justifyContent: "space-around"
    },
    button: {
        alignItems: "center",
        backgroundColor: "#25D366",
        padding: 15,
        marginTop: 50,
        paddingTop: 12,
        paddingBottom: 15,
        marginLeft: 80,
        marginRight: 70,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#25D366'

    },
    fixvalue: {
        top: 90,
        left: 20,
    },
    sendtext: {
        color: "#FFFFFF",
    },
    textmno: {
        marginTop: 60,
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
        marginBottom: 20,
        marginLeft: 50,
        marginRight: 30,
        color: '#A9A9A9',
        fontSize: 14,
    },
    action: {
        marginLeft: 60,
        flexDirection: "row",
        top: 50
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },



});