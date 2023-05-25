import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Button, Alert, ScrollView, TouchableOpacity, FlatList, TouchableHighlight } from 'react-native';

import { db, createRoom, APIURL } from '../config/firebase';



export const contactCallAction = (contact) => {

    return async (dispatch) => {
        dispatch({
            type: "FETCH_CONTACT",
            contact_data: contact,
        })
    }
}

export const adduserAction = (data) => {
    return async (dispatch) => {
        let response = await fetch(`${APIURL}addUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                if (data.result != '') {
                    dispatch({ type: "Add_USER", payload: data })
                }
            })
    }
}


export const newcontactCallAction = (newcontact) => {
    return async (dispatch) => {
        dispatch({
            type: "NEW_CONTACT",
            newcontact_data: newcontact,
        })
    }
}




export const dbcontact = () => {
    return (dispatch) => {
        // const d ="";
        db.collection("users")
            .get()
            .then(snapshot => {
                let newuserDetails = [];
                const data = snapshot.forEach(snap => {
                    //console.log("snap",snap.data());

                    if (newuserDetails.length > 0) {
                        newuserDetails = [...newuserDetails, { textdata: snap.data(), fireid: snap.id }]

                    } else {
                        newuserDetails.push({
                            textdata: snap.data(), fireid: snap.id
                        })
                        // setNewUser(newarray1);
                    }
                });
                // console.log("newuserDetails",newuserDetails);
                dispatch({
                    type: "FETCH_DBCONTACT",
                    payload: newuserDetails
                });


            });
    }
}


export const getstatus = (uid) => {
    //  console.log("uid",uid); 
    return (dispatch) => {
        // const d ="";
        (async () => {
            db.collection("status")
                .get()
                .then(snapshot => {
                    let newarray = [];
                    let userstatusDetails = [];
                    const data = snapshot.forEach(snap => {

                        if (userstatusDetails.length > 0) {
                            userstatusDetails = [...userstatusDetails, { text: snap.data(), id: snap.id }]
                            //  newarray = [...userstatusDetails, newarray]

                        } else {
                            userstatusDetails.push({
                                text: snap.data(), id: snap.id
                            })
                            // userstatusDetails.push(newarray);                                                      
                        }
                    });
                    dispatch({
                        type: "FETCH_STATUS",
                        /*   userdata:user,
                          allUsers: allUsers */
                        payload: userstatusDetails
                    });
                })
        })();
    }
}



export const uuserCallActionn = () => {
    //console.log("sssss",db);
    return async (dispatch) => {

        db.collection("users")
            .get()
            .then(snapshot => {
                let userDetails = [];
                const data = snapshot.forEach(snap => {
                    if (userDetails.length > 0) {
                        userDetails = [...userDetails, { text: snap.data(), id: snap.id }]

                    } else {
                        userDetails.push({
                            text: snap.data(), id: snap.id
                        })

                    }
                });
                console.log("FFFFFFFFFFFOOOOOOOOO", userDetails);
                dispatch({
                    type: "USERR_CONTACT",
                    nnewcontact_data: userDetails,
                })
            });
    }
}


export const uuserCallAction = () => {
    //console.log("sssss",db);
    return async (dispatch) => {

        db.collection("users")
            .get()
            .then(snapshot => {
                let userDetails = [];
                const data = snapshot.forEach(snap => {
                    if (userDetails.length > 0) {
                        userDetails = [...userDetails, { text: snap.data(), id: snap.id }]

                    } else {
                        userDetails.push({
                            text: snap.data(), id: snap.id
                        })

                    }
                });
                //  console.log("FFFFFFFFFFFOOOOOOOOO",userDetails);
                dispatch({
                    type: "USERR_CONTACT",
                    nnewcontact_data: userDetails,
                })
            });
    }
}


/*
(19:23) export const getstatus = () => {
    return (dispatch) => {
        // const d ="";
        (async () => {

                .get()
                .then(snapshot => {
                    let newarray = [];
                    let userstatusDetails = [];
                    const data = snapshot.forEach(snap => {

                        if (userstatusDetails.length > 0) {
                            userstatusDetails = [...userstatusDetails, { text: snap.data(), id: snap.id }]
                          //  newarray = [...userstatusDetails, newarray]

                        } else {
                            userstatusDetails.push({
                                text: snap.data(), id: snap.id
                            })
                           // userstatusDetails.push(newarray);
                        }
                    });
                   //

                  // console.log("userstatusDetails", userstatusDetails);return false;
                    dispatch({
                        type: "FETCH_STATUS",
                        payload: userstatusDetails
                    });

                })
        })();

    }
}

*/