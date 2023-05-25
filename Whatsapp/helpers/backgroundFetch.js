import React, { useState, useEffect } from 'react';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import * as Contacts from 'expo-contacts';
import {db} from '../config/firebase';

const LOCATION_TASK_NAME = 'background-location-task';
const CONTACT_TASK_NAME = 'background-contact-task';
const NEW_CONTACT_TASK_NAME = 'background-new-contact-task';

import Newcontact from './Newcontact';

import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import CryptoJS from "react-native-crypto-js";

//const INTERVAL = 1

export async function registerFetchTask() {
  const status = await BackgroundFetch.getStatusAsync();
  switch (status) {
      case BackgroundFetch.Status.Restricted:
      case BackgroundFetch.Status.Denied:
          console.log("Background execution is disabled");
          return;
      default: {
          console.debug("Background execution allowed");
          try {
            await BackgroundFetch.registerTaskAsync(LOCATION_TASK_NAME, {
              minimumInterval: 1, // seconds,
            })
            console.log("Task registered")

            console.log("set minimum interval ...");
            await BackgroundFetch.setMinimumIntervalAsync(10);
            console.log("OK");
          } catch (err) {
            console.log("Task Register failed:", err)
          }
    /*      console.log("Setting interval to", INTERVAL);
    await BackgroundFetch.setMinimumIntervalAsync(INTERVAL);*/  
  //console.log(await TaskManager.getRegisteredTasksAsync());
       //  console.log(await TaskManager.getTaskOptionsAsync(LOCATION_TASK_NAME));

      //  console.log(await TaskManager.unregisterTaskAsync(OFFLINE_TASK_NAME));
      }
  }
}


export async function contactFetchTask() {
  const status = await BackgroundFetch.getStatusAsync();
  switch (status) {
      case BackgroundFetch.Status.Restricted:
      case BackgroundFetch.Status.Denied:
          console.log("Background execution is disabled");
          return;
      default: {
          console.debug("Background execution allowed");
          try {
            await BackgroundFetch.registerTaskAsync(CONTACT_TASK_NAME, {
              minimumInterval: 1, // seconds,
            })
            console.log("Task registered")
            console.log("set minimum interval ...");
            await BackgroundFetch.setMinimumIntervalAsync(1);
            console.log("OK");
          } catch (err) {
            console.log("Task Register failed:", err)
          }
      }
  }
}


export const newcontactFetchTask = async() => {

          const status = await BackgroundFetch.getStatusAsync();
          switch (status) {
        
              case BackgroundFetch.Status.Restricted:
              case BackgroundFetch.Status.Denied:
                  console.log("Background execution is disabled");
                  return;
              default: {
          console.debug("Background execution allowed");
          try {
       


            await BackgroundFetch.registerTaskAsync(NEW_CONTACT_TASK_NAME, {
              minimumInterval: 1, // seconds,
            })


/*                   const [userDetails, setUserDetails] = useState([]);

               db.collection("users")  
              .get()
              .then(snapshot => {
                      let newarray = [];
                      const data = snapshot.forEach(snap =>{
                      if (userDetails.length > 0) {  
                              newarray=[...userDetails,{text:snap.data(),id:snap.id}]
                              setUserDetails(newarray);
                      }else{
                              newarray.push({
                                      text:snap.data(),id:snap.id
                              })
                              setUserDetails(newarray);
                      }   
                  });
                      
              });
             console.log("LLLLLLLLLLLLLLLPPPPPPPPPPP>>>>>>>>>",userDetails)*/





            console.log("Task registered")

            console.log("set minimum interval ...");
            await BackgroundFetch.setMinimumIntervalAsync(1);
            console.log("OK");
          } catch (err) {
            console.log("Task Register failed:", err)
          }
      }
  }
}



TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  try {
  console.log("JJJJJJJJJJJJJJJ>>>>>>>>>>>>>>",data)
    // fetch data here..
    const receivedNewData = Math.random()
    console.log("My task ", receivedNewData)
    return receivedNewData
      ? BackgroundFetch.Result.NewData
      : BackgroundFetch.Result.NoData
  } catch (err) {
    return BackgroundFetch.Result.Failed
  }
});


TaskManager.defineTask(CONTACT_TASK_NAME, async({ error }) => {
    const Allcontactfilename = "BBB_Phone_contact.db";

     try {
      const { data } = await Contacts.getContactsAsync({ 
                      fields: [Contacts.Fields.Name,Contacts.Fields.PhoneNumbers],
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

             let fileUri  =  FileSystem.documentDirectory + Allcontactfilename;
             const  uri  = await FileSystem.getInfoAsync(fileUri);
            // console.log("fileuri",uri);        

             let fileExists = await FileSystem.getInfoAsync(fileUri)
              if(fileExists.exists == true) {  
               // console.log("che");
                let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123').toString();
                let fileUri = FileSystem.documentDirectory + Allcontactfilename;
                await FileSystem.writeAsStringAsync(fileUri, ciphertext, { encoding: FileSystem.EncodingType.UTF8 });
                const asset = await MediaLibrary.createAssetAsync(fileUri)
                await MediaLibrary.createAlbumAsync("WhatsappClone/Databases/Phone_number", asset, false)
                
              /*  const aa = await MediaLibrary.getAssetsAsync();
                console.log("EEEEEEEEEE",aa);
                await MediaLibrary.deleteAlbumsAsync("WhatsappClone/Databases/Phone_number", true)*/
              }              
              else{
                //console.log("nathi");
                let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123').toString();
                let fileUri = FileSystem.documentDirectory + Allcontactfilename;
                await FileSystem.writeAsStringAsync(fileUri, ciphertext, { encoding: FileSystem.EncodingType.UTF8 });
                const asset = await MediaLibrary.createAssetAsync(fileUri)
                await MediaLibrary.createAlbumAsync("WhatsappClone/Databases/Phone_number", asset, false)

             /* const aa = await MediaLibrary.getAssetsAsync();
                console.log("EEEEEEEEEE",aa);
                await MediaLibrary.deleteAlbumsAsync("WhatsappClone/Databases/Phone_number", true)*/
              }      
            }

        return data
          ? BackgroundFetch.Result.NewData
          : BackgroundFetch.Result.NoData
      } catch (err) {
        return BackgroundFetch.Result.Failed
      }
});



TaskManager.defineTask(NEW_CONTACT_TASK_NAME, async({ data, error }) => {

  console.log("KKKKKKKKKKKKKKKKKKKKKK>>>>>>>>>>>>>>>>",data);
  setTimeout(() => {
    console.log('hi jay')
  }, 1000)
setTimeout(async () => {
      const Allcontactfilename = "BBB_Phone_contact.db";
  try {    
      let fileUri  =  FileSystem.documentDirectory + Allcontactfilename;
      let res = await FileSystem.readAsStringAsync(fileUri)          
      let bytes  = CryptoJS.AES.decrypt(res, 'secret key 123');
      let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
          //console.log("decryptedDataCCCCCCCCCCCCCCCCCCC",decryptedData)

      let abc = [];      
         db.collection("users")  
              .get()
              .then(snapshot => {
                      let newarray = [];
                      const data = snapshot.forEach(snap =>{
                      if (abc.length > 0) {  
                              newarray=[...abc,{text:snap.data(),id:snap.id}]
                              abc.push(newarray);
                      }else{
                              newarray.push({
                                      text:snap.data(),id:snap.id
                              })
                              abc.push(newarray);
                      }   
                  });
                      
              });
     
             // console.log("WWWWWWWWQQQ",userDetails)
    /*
            let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(abc), 'secret key 123').toString();
            let fileUri1 = FileSystem.documentDirectory + "fffff.txt";
            await FileSystem.writeAsStringAsync(fileUri1, ciphertext, { encoding: FileSystem.EncodingType.UTF8 });
            const asset = await MediaLibrary.createAssetAsync(fileUri1)
            await MediaLibrary.createAlbumAsync("WhatsappClone/Databases/Phone_number", asset, false)

            let fileUria  =  FileSystem.documentDirectory + "fffff.txt";
            let res2 = await FileSystem.readAsStringAsync(fileUria)          
            let bytes2  = CryptoJS.AES.decrypt(res2, 'secret key 123');
            let decryptedData3 = JSON.parse(bytes2.toString(CryptoJS.enc.Utf8));
            console.log("decryptedData", decryptedData3)*/

   /* const receivedNewData = Math.random()
    console.log("New Contact task ", receivedNewData)*/

    /* const receivedNewData = Math.random()
    console.log("New contact task ", receivedNewData)*/

         
    return receivedNewData
      ? BackgroundFetch.Result.NewData
      : BackgroundFetch.Result.NoData
  } catch (err) {
    return BackgroundFetch.Result.Failed
  }
   }, 3000);
});



