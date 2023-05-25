 import React, { useState ,useEffect} from 'react';
import { StyleSheet, View ,Image,Button,Alert,TouchableOpacity,TouchableHighlight,AsyncStorage} from 'react-native';
import {TextInput,Text,Card} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';  
import { ListItem, Avatar,Overlay} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions,Animated,ScrollView } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const ProfileScreen = (props) => {

    console.log("KKKKKKKKKKKKKKKKKKK",props)
    const [isVisible, setImgData] = React.useState(false);

    const {navigate} = useNavigation();
 
      const setVisiblefunc =()=>{
        setImgData(!isVisible);
      }


    useEffect(() => {
           (async () => {
                    let profile_img = await AsyncStorage.getItem('userProfile');
                    console.log("profileeeeee>>>>>>>>>>>>>>>>>>>",profile_img)
                })();
    }, []);


    let dataa = props.route.params.Listdata;
  return(
    <ScrollView>
    <View>
        <TouchableHighlight onPress ={setVisiblefunc}>
            <Image source = {{uri:dataa.profile_img}}
                style = {{ width: 420, height: 300 }}
            />
        </TouchableHighlight>
       
        <View style ={{marginTop:-35,paddingLeft:15,paddingRight:15}}>
            <Card style = {{
                borderTopLeftRadius: 15, 
                borderTopRightRadius: 15, 
                borderBottomLeftRadius: 15, 
                borderBottomRightRadius: 15, 
                marginBottom:10
            }}elevation={5}
            >
                <View style={{padding:5}}> 
                    <Card style={{padding:15}}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{justifyContent:'flex-start'}}>
                                <Text style={{fontSize:20,fontWeight: "bold"}}>{dataa.name}</Text>        
                                <Text>+91765756756</Text>
                            </View>
                            <View style={{justifyContent:'flex-end'}}>
                                <View style={{flexDirection: 'row',marginLeft:70}}>
                                    <View style={{backgroundColor:'#00cc00',height:50,width:50,borderRadius:50,marginLeft:5}}>
                                        <Icon name="comment" size={25} color='white' style={{margin:11}}/>
                                    </View>  
                                    <View style={{backgroundColor:'#00cc00',height:50,width:50,borderRadius:50,marginLeft:5}}>
                                        <Icon name="video-camera" size={25} color='white' style={{margin:11}}/>
                                    </View>  
                                    <View style={{backgroundColor:'#00cc00',height:50,width:50,borderRadius:50,marginLeft:5}}>
                                        <Icon name="phone" size={25} color='white' style={{margin:14}}/>
                                    </View>  
                                </View>  
                            </View>
                        </View>
                    </Card>

                    <View style={{marginTop:20}}>
                    <Card style={{padding:15}}>  
                        <Text style={{fontSize:20,fontWeight: "bold"}}>Status</Text>
                        <Text>Magical Life</Text>
                    </Card>
                    </View>

                    <View style={{marginTop:20}}>
                      <Card>
                          <TouchableHighlight
                               onPress={()=>navigate('Media')}
                               underlayColor={'#AAA'}
                          >
                          <ListItem  bottomDivider>
                          <View style={{backgroundColor:'#00cc00',height:50,width:50,borderRadius:50}}>
                          <Icon  name="image" size={25} color='white' style={{margin:11}}/>
                          </View>   
                             <ListItem.Content>
                                <ListItem.Title style={{fontWeight: "bold"}}>Media</ListItem.Title>
                              </ListItem.Content>  
                              <ListItem.Chevron/>
                           </ListItem>
                          </TouchableHighlight>
                        </Card>
                        <Card>
                            <ListItem  bottomDivider>
                            <View style={{backgroundColor:'#ffd11a',height:50,width:50,borderRadius:50}}>
                            <Icon name="star" size={25} color='white' style={{margin:13}}/>
                            </View>   
                               <ListItem.Content>
                                  <ListItem.Title style={{fontWeight: "bold"}}>Starred Messages</ListItem.Title>
                                </ListItem.Content>  
                                <ListItem.Chevron/>
                             </ListItem>
                        </Card>

                        <Card>
                            <ListItem  bottomDivider>
                            <View style={{backgroundColor:'#009999',height:50,width:50,borderRadius:50}}>
                            <Icon name="search" size={25} color='white' style={{margin:11}}/>
                            </View>   
                            <ListItem.Content>
                                  <ListItem.Title style={{fontWeight: "bold"}}>Chat Search</ListItem.Title>
                                </ListItem.Content>  
                                <ListItem.Chevron/>
                            </ListItem>
                        </Card>
                    </View>
                 
                    <View style={{marginTop:20}}>
                           <Card>
                            <ListItem  bottomDivider>
                            <View style={{backgroundColor:'#77b300',height:50,width:50,borderRadius:50}}>
                            <Icon name="bell-slash-o" size={25} color='white' style={{margin:11}}/>
                            </View>   
                               <ListItem.Content>
                                  <ListItem.Title style={{fontWeight: "bold"}}>Mute</ListItem.Title>
                                </ListItem.Content>  
                                <ListItem.Chevron/>
                             </ListItem>
                        </Card>
                    </View>
                </View>
            </Card>
         </View>
        <Overlay
            isVisible={isVisible} 
            style={styles.fullscreenImage}
            animationInTiming={0} 
        >
            <View  style={styles.fullscreenImage}>
                <ImageZoom cropWidth={Dimensions.get('window').width}
                    cropHeight={Dimensions.get('window').height}
                    imageWidth={400}
                    imageHeight={250}>
                    <Image 
                        style={{width:400, height:250}}
                        source={{uri:dataa.profile_img}}
                    />
                </ImageZoom>
                <TouchableHighlight
                    style={styles.overlayCancel}
                    onPress={setVisiblefunc}
                >
                    <Icon name="close"
                        style={styles.cancelIcon} size={28} 
                    />
                </TouchableHighlight>
            </View>
        </Overlay>
    </View>
</ScrollView>
    );
}

export default ProfileScreen


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    cardboaderr:{
        borderBottomColor: 'lightgray',
        borderWidth: 1,
    },
    overlayCancel: {
        padding: 20,
        position: 'absolute',
        right: 10,
        top: 0,
    },
    fullscreenImage:{
        backgroundColor:'black',
        width:windowWidth,
        height:windowHeight,
        alignItems: "center", 
        justifyContent: "center" 
    },
    cancelIcon: {
        color: 'white',
    },
});