import React, { useState,useEffect } from 'react';
import { StyleSheet, View ,Image,Button,Alert,ScrollView,TouchableOpacity,Text, TouchableHighlight,} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

/*import Icon from '@material-ui/core/Icon';*/
import { IconButton, Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
/*import Story from './StoryScreen';*/
import ContactstatusScreen from './ContactstatusScreen';

import * as MediaLibrary from 'expo-media-library';

const CameraScreen = ({navigation},props) => {
     let {files, setFiles} = props;

 const [selectedImage, setSelectedImage] = React.useState(null);
/* const [galleryImage, setGalleryImage] = React.useState(null);*/
      useEffect(() => {
          
         // pickImageFromCamera();
          //pickImageFromGallery();    
  }, []);
  /*const c = async() =>{ 
          let yy =[];
          let ll =[];

/*let uu = MediaLibrary.CameraRollPermissionResponse();
console.log("uu",uu);
      let rr = await MediaLibrary.getAlbumsAsync("images");

      let ii = await MediaLibrary.getAssetsAsync("301");
      console.log("rr",rr);
      console.log("ii",ii);
      console.log("ii",ii.assets[0].filename);
      if(yy.length>0){;
          yy.push(await MediaLibrary.getAssetsAsync("301"));
          console.log(">>>>>>>>>>>>>",yy.totalCount);
         /* ll.push({uri:yy.assets.uri});*/
      /*}
      else
      {
          yy = [...yy,await MediaLibrary.getAssetsAsync("301")];
          /*ll = [...ll,{uri:yy.assets.uri}];*/
     // }
      //let yy =await MediaLibrary.getAssetInfoAsync("1006");
  //console.log("c",JSON.stringify(rr));
  //console.log("cy",yy);
// console.log("uri",yy.assets[0].uri);
 /* console.log("ll",JSON.stringify(ll));*/
 // }*/
    const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    console.log('result',result);
     if (result.cancelled===false ) {
            setSelectedImage({ localUri: result.uri });
    }
}

    const pickImageFromCamera = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    //console.log("pickerResult",pickerResult);
    if (pickerResult.cancelled===false ) {
            setSelectedImage({ localUri: pickerResult.uri });
    }
}

console.log("selectedImage",selectedImage);
if (selectedImage !== null) {
    return (
      <View style={styles.container}>    
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}        
        />

        <Button
          onPress={() => navigation.navigate("select contact",{"localUri":selectedImage.localUri})}
          title="Send"
          color="#841584"
        />
      </View>
    );
  }

  return(
  <View style={styles.container}>
  <View style={styles.fixToText}>
   <Button title="Gallery" onPress={pickImageFromGallery} style={{width:20,height:10, color:"#fff"}} />
   <Button title="Camera" onPress={pickImageFromCamera} style={styles.button1}/>
</View>     
    </View>
  )

  

}

export default CameraScreen


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