const { to, ReE, ReS } = require('../services/util.service');
const Joi = require('joi'); 
const db = require('../firebase-config');
const functions = require('firebase-functions');
const { Expo } = require("expo-server-sdk");

const createChatroom = async function (req, res) {
    console.log("sssggg");
    msg = await tempcreateChatroom(req, res);
    return ReS(res, { result : msg._id })
}

const tempcreateChatroom = async (req, res, obj) => {
     let userId = req.body.userid;
     const friendId = req.body.friendid;
     let chatExist = false;  
      return new Promise((resolve,reject)=>{
         db.collection('chatrooms')
         .where('users.'+userId,'==', true )
         .where('users.'+friendId,'==',true)
         .get().then(snap=>{
           snap.forEach(val=>{
             chatExist = {
               data:val.data(),
               _id:val.id
             };
           })
           console.log("chatExist",chatExist);
           console.log("userId",userId);
           console.log("friendId",friendId);
           if(!chatExist){
             //room bany ga..
             const obj ={
               createdAt: Date.now(),
               users:{
                 [friendId]:true,
                 [userId] :true
               }
             }
             db.collection('chatrooms').add(obj).then(snap=>{
               resolve({data:obj,_id:snap.id})
             })
           }else{
             resolve(chatExist)
           }
         })
      }) 
}


const sendGallerymessages = async function(req, res) {
      console.log("call gallery api");
      let data = req.body;
      let obj = {};
      console.log("FFFF_url",data.url);
      obj.userId = data.userid;
      obj.timestamp = Date.now();
      obj.message = {"url" : data.url}      
      /*const obj ={
          "url" : data.url,
          "userId": data.userid,
          "timestamp":Date.now(),
      }*/
      msg = await sendMessage(req, res, obj, data);
      return ReS(res, { result : msg.id })
}


const sendCameramessages = async function (req, res) {
      console.log("call camera api");
      let data = req.body;
      let obj = {};
      console.log("FFFF_url",data.url);
      obj.userId = data.userid;
      obj.timestamp = Date.now();
      obj.message = {"url" : data.url}      
      msg = await sendMessage(req, res, obj, data);
      return ReS(res, { result : msg.id })
}


const sendAudiomessages = async function (req, res) {
      console.log("call audio api");
      let data = req.body;
      let obj = {};
      console.log("aaaaaauuuuuddddd_url",data.Audiourl);
      obj.userId = data.userid;
      obj.timestamp = Date.now();
      obj.message = {"Audiourl" : data.Audiourl}      
      msg = await sendMessage(req, res, obj, data);
      return ReS(res, { result : msg.id })
}

const sendVideomessages = async function (req, res) {
      console.log("call video api");
      let data = req.body;
      let obj = {};
     
      console.log("Vvvvviiiiiidddddd_url",data.Videourl);
      obj.userId = data.userid;
      obj.timestamp = Date.now();
      obj.message = {"Videourl" : data.Videourl}      
      msg = await sendMessage(req, res, obj, data);
      return ReS(res, { result : msg.id })
}

const sendDocumentmessages = async function (req, res) {
      console.log("call Document api");
      let data = req.body;
      let obj = {};
      obj.userId = data.userid;
      obj.timestamp = Date.now();
      obj.message = {"documenturl" : data.documenturl}      
      msg = await sendMessage(req, res, obj, data);
      return ReS(res, { result : msg.id })
}

const sendLocationmessages = async function (req, res) {
      console.log("call Location api");
      let data = req.body;
      let obj = {};
      obj.userId = data.userid;
      obj.timestamp = Date.now();
      obj.message = {"location" : data.location}
      msg = await sendMessage(req, res, obj, data);
      return ReS(res, { result : msg.id })
}
  

const sendChatmessage = async function (req, res) {
    let data = req.body;
    const obj ={ 
        "message" : data.message,
        "userId": data.userid,
        "timestamp":Date.now(),
    }
    msg = await sendMessage(req, res, obj, data);
    return ReS(res, { result : msg.id })
}

const sendPushNotification = async (targetExpoPushToken, message) => {
    const expo = new Expo();
    const chunks = expo.chunkPushNotifications([
        { to: targetExpoPushToken, sound: "default", body: message }
    ]);
}

const sendMessage = (req, res, obj, data) => {
    return new Promise((resolve,reject)=>{
        db.collection('chatrooms').doc(data.room_id).collection('messages')
        .add(obj)
        .then((ref) => {
            console.log("data.expoToken >>", data.expoToken);
            console.log("data.message >>", obj.message);
            sendPushNotification(data.expoToken, obj.message)
            if(!ref){
                reject(ref)
            }else{
                resolve(ref)
            }
        })
    });
}


const fetchChatmessages = async  (req, res) => {
    const room_id = req.body.room_id;
    let screams = [];
    return new Promise((resolve,reject)=>{
        db.collection('chatrooms').doc(room_id).collection('messages')
          .orderBy('timestamp')
          .onSnapshot(snap=>{
            let msgs = [];
            snap.forEach(val=>{
              msgs.push({data:val.data(),_id:val.id})
            })
           console.log('msgs>>>',msgs)
            if(!screams){
                reject(msgs)
            }else{
                resolve(msgs)
            }
        })
    })
}

const userfetchChatmessages = async function (req, res) {
    console.log("hello");
    let msg;
    let userid = req.body.userid;
    msg = await fetchChatmessages(req, res);
    return ReS(res, { result: msg });
}

const fetchall = async function (req, res) {
    db.collection('users').get()
        .then((data) => {
            let screams = [];
            data.forEach((doc) => {
                screams.push(doc.data())
            });
            return ReS(res, { result: screams });
    })
}


const fetchUserData = async function (req, res) {
  let useridd  = req.params.user_id
   db.collection('users').get()
        .then((data) => {
            let screams;

            data.forEach((doc) => {
                if (doc.id === useridd) {
                  console.log("dddddddddd",doc.data());
                  screams = doc.data()
                }
                else{
                  console.log("nathi");
                }
                //screams.push(doc.data())
            });
            return ReS(res, { result: screams });
        })
}

const addUser = async (req, res) => {
    const data = {
        mobile_no: req.body.mobile_no,
        expoToken: (req.body.token) ? req.body.token : null,
        createdAt: Date.now()
    }
    let user;
    user = await addUsertodb(req, res, data)
    return ReS(res, user);
}

const addUsertodb = async function (req, res, data) {
    let id, d, existUser;

    return new Promise(async (resolve, reject) => {
        let abc = await db.collection("users").where("mobile_no", "==", data.mobile_no).get();
        abc.forEach((doc) => {
            d = doc.data()
            id = doc.id
            let y = { result: d, id: id, message: "Users already exist" };
            resolve(y)
                ;
        });
        if(id===undefined)
        {

            try {
                user = await db.collection('users').add(data).then(async (ref) => {
                    id = ref.id
                    const usersRef = db.collection('users').doc(id);
                    const doc = await usersRef.get();
                    if (!doc.exists) {
                        console.log('No such document!');
                    } else {
                        d = doc.data()
                        let y = { result: d, id: id, message: "Add User Successfully" };
                        resolve(y)
                            ;
                    }
                });
            } catch (error) {
                let y = { result: '', message: "please try again" };
                resolve(y)
                    ;
            }
        }
    });
}

const getownstatus = async function (req, res) {
    try{
 
    const ustatusdata = {
        status:req.body.status,
        userId:req.body.uid,
        timestamp:Date.now()
    }

    // Create a document reference
const docRef = db.collection('status').add(ustatusdata).then((ref) => {
    id=ref.id
});
const usersstatusRef = db.collection('status').doc(id);
const doc = await usersstatusRef.get();
 if (!doc.exists) {
     console.log('No such document!');
 } else {
     d= doc.data()
     
     // console.log('Document data:', doc.data());
     return ReS(res, { result: d,id:id,message:"User Status Added  Successfully"});
 }
}catch(error){
    return ReS(res, { result:'',message:"please try again some error occur"});
} 
}



const editUser = async function (req, res) {
    console.log("req", req);
    //req.body.userToken;
    const userToken = req.body.id;
    console.log("userToken>>>>>>>>>>>>>>>", userToken);
    const udata = {
        name: req.body.name
    }
    console.log("udata", udata);

    // Create a document reference
    const docRef = db.collection('users').doc(userToken);

    // Update the timestamp field with the value from the server
    const resdata = await docRef.update(udata);
    console.log("Document successfully updated!", resdata);


    return ReS(res, { message: "Document successfully updated!" });
}


const editUserProfile = async function (req, res) {
    console.log("req", req);
    //req.body.userToken;
    const userToken = req.body.id;
    console.log("userToken>>>>>>>>>>>>>>>", userToken);
    const udata = {
        profile: req.body.profile ? req.body.profile:'https://firebasestorage.googleapis.com/v0/b/mydatabase-97162.appspot.com/o/Profile%2Fdefault.jpg?alt=media&token=7a7a3b35-603d-4c32-85f4-3692a9c8612b',
    }
    console.log("udata", udata);

    // Create a document reference
    const docRef = db.collection('users').doc(userToken);

    // Update the timestamp field with the value from the server
    const resdata = await docRef.update(udata);
    console.log("Document successfully updated!", resdata);

    return ReS(res, { message: "Document successfully updated!" });
}



const userLastMessage = async function (req, res) {
        db.collection('chatrooms').get()
        .then((data) => {
            let screams = [];
            let screamss = [];
            data.forEach((doc) => {
                screams.push(doc.data())
                //console.log(doc.data()); 

                let userdata = doc.data();
                //console.log("wwww",userdata);

                    userdata.forEach((userdataa) => {
                        screamss.push(userdataa. data())
                        //console.log(doc.data()); 
                        console.log("KKKKK",userdata.data());
                    });
           //   console.log("FFF",userdata);
            });
            return ReS(res, { result: screams });
        })

      /*  db.collection('users').get()
        .then((data) => {
            let screams = [];
            data.forEach((doc) => {
                screams.push(doc.data())
                console.log(doc.id);    
            });
            return ReS(res, { result: screams });
        })*/
}


module.exports = {
    createChatroom,
    sendChatmessage,
    fetchChatmessages,
    userfetchChatmessages,
    sendGallerymessages,
    sendCameramessages,
    sendAudiomessages,
    sendVideomessages,
    sendDocumentmessages,
    sendLocationmessages,
    fetchall,
    fetchUserData,
    addUser,
    editUser,
    editUserProfile,
    userLastMessage
}