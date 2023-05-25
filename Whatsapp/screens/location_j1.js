import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet,Dimensions,ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, {
    Marker,
    AnimatedRegion,  
  } from 'react-native-maps';
  import { sendMessage } from '../config/firebase'
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Card, ListItem, Icon ,Avatar} from 'react-native-elements';
import { Ionicons,AntDesign,FontAwesome,Entypo,MaterialCommunityIcons,MaterialIcons,FontAwesome5 } from '@expo/vector-icons';



export default class location extends Component {

 constructor(props){
        super(props);
        this.state={          
          location: null,
          errorMessage: null,
          isLoading:true
        }
       console.log("GGG",props) 
    }

  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  //==================================================SHARE LOCATION=========================================================\\
  share_location= async ()=>{
    let location = { latitude: this.state.location.coords.latitude,
      longitude: this.state.location.coords.longitude}

      let room_id = this.props.route.params.room_id;

      sendMessage(room_id,{location})
      this.props.navigation.navigate('Chat')
  }

  //======================================================END================================================================\\



  render() {



    let text = <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color="#075E54" size="large" />
            </View>;
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }
    
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

    return (
        
        this.state.location
        ?
        <View style={{flex: 0.5}}>

        <MapView
          style={{width:"100%",height:300}}        
          initialRegion={{
              latitude: this.state.location.coords.latitude,
              longitude: this.state.location.coords.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,            
          }}
        >
          <Marker           
           coordinate={{
               latitude: this.state.location.coords.latitude,
               longitude: this.state.location.coords.longitude
            }}
          />
        </MapView>
      

        
          <TouchableOpacity style={styles.control} onPress={()=>{this.share_location()}}>            
              <ListItem bottomDivider>   
                  <View style={{backgroundColor:'#128C7E',height:50,width:50,borderRadius:50}}>
                            <MaterialIcons name="location-pin" size={25} color='white' style={{margin:11}}/>
                  </View>                               
                  <ListItem.Content>
                      <ListItem.Title >Share live location</ListItem.Title>                   
                  </ListItem.Content>
                </ListItem>
            </TouchableOpacity>      


            </View>
        :
            <View style={styles.container}>
            <Text style={styles.paragraph}>{text}</Text>            
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});