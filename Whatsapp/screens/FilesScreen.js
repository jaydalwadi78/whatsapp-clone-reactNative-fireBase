import React, { useState } from 'react';
import { StyleSheet, View ,Image,Button,Alert,ScrollView,TouchableOpacity, TouchableHighlight} from 'react-native';
import {TextInput,Text} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';  
import { Card, ListItem, Icon ,Avatar,SearchBar } from 'react-native-elements';
import Constants from "expo-constants";


const list = [
      {
        date : 'June 2020',
        alldata : [
          {
            name: 'Report 10.06',
            avatar_url: 'data:image/png;base64,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',
            subtitle: 'Vice President',
            datamb:'12.2MB',
            time:'June 2020 at 13:32'
          },
          {
            name: 'Report 10.06(Edit)',
            avatar_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6WcbvjxeSRA6dI9viiFdc1aUCrH4auZKpZw&usqp=CAU',
            subtitle: 'Vice Chairman',
            datamb:'12.8MB'
          }
        ]
      },
      {
        date : 'June 2020',
        alldata : [
          {
            name: 'Report 10.06',
            avatar_url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAflBMVEXi5ef///9QvujK0diwt71Ivejn5uee0ehhwObQ0tfm6eprxOittLtAuufV2dzFzNLw8fJ3y+yv3vPh8vrX7vnJ6fd/ze32/P6L0e9XwenC5vbn9fug2fGT1PDu+Pys3fO4v8Ta3uDA2+eWz+fW4ee54vXQ7Pi90d51w+SMx+K3uE6pAAAHfklEQVR4nO3d62KjKBQAYLXLji1Dm3vURNPubjKd93/BTRNBVEBQSw4M51+nxPB5uAVMJ4pHxGLxEn1/vC7G1K0XkflLbOhuwp+zEI2FC0u+L+EsRFOhNd+X8K85iIZCi8Av4RxEM6FN4E04A9FIaK8PMuF0opHQKrAWTiaaCO2mkAqnEk2EdoFMOJFoILScwkY4jeiEcBLRQGhrtSYQTiE6IpxAdEU4nuiMcDTRHeFYokPCkUSXhOOITglHEd0SjiE6JhxBdE1oTnROaEx0T2hKdFBoSHRRaEZ0UmhEdFNoQnRUaEB0VahPdFaoTXRXqEt0WKhJdFmoR3RaqEV0W6hDdFyoQXRdOEx0XjhIdF84RPRAOED0QagmAhZ+aAuVRMDCSF+oIkIW6gNVRMjCt1mIkIX6Q42KCFkYvZsIZUTQQoPRVE4ELYzeZiDCFkbv04nAhTMQoQunN1TwwpeP958myB4RvPAaH29XpH50iC4Ir4mMPj7etMNF4S2edMNZoTbRXaEu0WGhJtFloR7RaaEW0W2hDtFxoQbRdeEw0XnhINF94RDRA+EA0QehmuiFUEn0Q6gieiJUEH0RyoneCKVEf4QyokdCCdEnoZjolVBI9EsoInomFBB9E/aJ3gl7RP+EXaKHwsh/YeS/MPJfGPkvjPwXRv4LI/+Fkf/CyH9h5L8w8l8Y+S+M/BdG/gs7pCAMQogRhH+w8G8gMYPwcl6J4geM+GfQOCQ8EUkgIJH8GCAOCJckgR5kpyaqhRl8YJKgf5VEpXDtAvCaxf9GC0v06MprBVJ2RaUwfXTd9QJ9jhY+uuq6gYMwCMFHEAYh/AjCIIQfQRiE8CMIg3DOQOi2iWXyCo0yUIRXXL4sV+fzKUuvTJ3yJE8xTtFQ6fmF13duxS01A1UmZFdU7Mr7S4mUm0CI5MftoS5dbTOiKj27kJz2cSf2hyJDCiRCq95rzrm01ojsNp03WCVy49xCcu7WtY4tllWCHIUvWEl6JMEHQemjlDi3MJcAr3HJRVVG+VpSvhLuOJOTuPRaNuzMLERLuVC4h0x2ivKCxJCLrPAei4lWhfGpW2WSGZbfKErnAITxql1l1M7gvjpU7TGnk0VSqC5eCPvidwnXGxrrin9V2aoF32sPR3yb8fOSb4g7vumRkvvNtlymeZ5mBbsn4nOG7xJi/qwt4+rMb5WTZpBZL9l0cp0LuVTxwuaG7Eu6+rnelVX9jxerwiVfM0SWLJHcjUZNSo7t6ZJglhiu6ZEty19rJiH1m2bCocaK8MvIhoimHoQxevMCStgtaZLOUtjpzQnCVSydEi0JuRZ5oBVpUiiYRVBC+SyJbDHRH1EQwVi20LMmTJK48ytmFo6BzTDLhLW5Mju4tCdkizMKYo1Osjqjw1PdrNmlxd0NgDBB7RywRtrtVbQ4bt8RVC/X9oZnzxaFrB/d1x5s9hYvRa4FDq07QscqyQ2BIGQ9697MaDeUdis2z9U/VtIrQxGyseZ0F9aNdisTIrpmvc8XaCDlEITUdO9YpC4pbXWsI96vVQ9Mpt3QrrDis0aFR2mro4Ptznth5o7QrJUmaftaDgjpWHEmvFc+0tCxF99/rMsDHmnY746t2eIgFZ5a7+TAbMFm/Pvvhmf8eoqv2yVdxQGe8WkS4s6qTTbU0IGm/mBLFwDSnD9cyCZw+hmYDiSSsYOl/NhZeRs2U4ufLWgKac7Yp6fejtrtSrj7RnTw3QD99NRshrOybK9bNXk2ILaJUfaJtz2sxwqbrfvm8y5h10r7GWebVOxKzU5lb9ODLNdx9dBdDMQ+J/BDJ3dgsevsi+bsbIJrk426W7zs3Du7wq/DtWWzbcgP9qQ5YymSppUR/qyGm0uarhmfEbf5mNNdLmxTuMvTOnB25g6LqtYuI+auVyzr7VXMn7W1+hy35b0/s+LNPwofzLa8qx+3z586xxbrbbFdt7b1Ow2PtA7WDptiu+GL7wAIu+dDkrNDGr01a947SuVib3VHWFyF/gGY8vDp3N8YzSt5cfFSYO4TUhzLYyM6xCRYWmfhV1bQVlLa0vlhs+/br4Fgor5VmZtJ+NhKDnVJJrwlsuKzC1EZC2Ndyh+UIcm5172KVPGkQtY7GL9InxL4hmcxcLFux2a72iXq502+njZphsnqUiqerbgZ87I41Hdlvy5K1eXnf54Gib6tp6ovfRVKd1mZ7bBueYJynOaDl4fyTNS92rfvDM4coITfEkEYhPAjCIMQfgRhEMKPIPyThabneA+KCd/HF25swQv0e7RQvMMMLsgvBVAtFBw2AAz0+TxeWM3/aXX2QPnT03hhXGGz72FZD0Q+nyYJ4/hSLrEoUhDx+fvX81ShLF6fYcTtr7B+j7D3nxA8Ll69F354L1QBvRAqgT4I1UDnha/KPjhJ6P/fvgxCMBGEQQg/gjAI4UcQBiH8CMIghB/eC19GCxePrrpm+C9cjBbGj666ZnRrbSB0I4mdRmokdCOJ3SeTjYQuJLGbQjOhC0ns19lICJ8oqLKZEDpRVGNDIei+2OuDo4RwV28v4q9PjRBe87iApnx5Wcgq+z/KiCiKPt0tGQAAAABJRU5ErkJggg==',
            subtitle: 'Vice President',
            datamb:'16.4MB'
          },
          {
            name: 'Report 10.06(Edit)',
            avatar_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6WcbvjxeSRA6dI9viiFdc1aUCrH4auZKpZw&usqp=CAU',
            subtitle: 'Vice Chairman',
            datamb:'06.8MB'
          }
        ]
      },
       {
        date : 'June 2020',
        alldata : [
          {
            name: 'Report 10.06',
            avatar_url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAflBMVEXi5ef///9QvujK0diwt71Ivejn5uee0ehhwObQ0tfm6eprxOittLtAuufV2dzFzNLw8fJ3y+yv3vPh8vrX7vnJ6fd/ze32/P6L0e9XwenC5vbn9fug2fGT1PDu+Pys3fO4v8Ta3uDA2+eWz+fW4ee54vXQ7Pi90d51w+SMx+K3uE6pAAAHfklEQVR4nO3d62KjKBQAYLXLji1Dm3vURNPubjKd93/BTRNBVEBQSw4M51+nxPB5uAVMJ4pHxGLxEn1/vC7G1K0XkflLbOhuwp+zEI2FC0u+L+EsRFOhNd+X8K85iIZCi8Av4RxEM6FN4E04A9FIaK8PMuF0opHQKrAWTiaaCO2mkAqnEk2EdoFMOJFoILScwkY4jeiEcBLRQGhrtSYQTiE6IpxAdEU4nuiMcDTRHeFYokPCkUSXhOOITglHEd0SjiE6JhxBdE1oTnROaEx0T2hKdFBoSHRRaEZ0UmhEdFNoQnRUaEB0VahPdFaoTXRXqEt0WKhJdFmoR3RaqEV0W6hDdFyoQXRdOEx0XjhIdF84RPRAOED0QagmAhZ+aAuVRMDCSF+oIkIW6gNVRMjCt1mIkIX6Q42KCFkYvZsIZUTQQoPRVE4ELYzeZiDCFkbv04nAhTMQoQunN1TwwpeP958myB4RvPAaH29XpH50iC4Ir4mMPj7etMNF4S2edMNZoTbRXaEu0WGhJtFloR7RaaEW0W2hDtFxoQbRdeEw0XnhINF94RDRA+EA0QehmuiFUEn0Q6gieiJUEH0RyoneCKVEf4QyokdCCdEnoZjolVBI9EsoInomFBB9E/aJ3gl7RP+EXaKHwsh/YeS/MPJfGPkvjPwXRv4LI/+Fkf/CyH9h5L8w8l8Y+S+M/BdG/gs7pCAMQogRhH+w8G8gMYPwcl6J4geM+GfQOCQ8EUkgIJH8GCAOCJckgR5kpyaqhRl8YJKgf5VEpXDtAvCaxf9GC0v06MprBVJ2RaUwfXTd9QJ9jhY+uuq6gYMwCMFHEAYh/AjCIIQfQRiE8CMIg3DOQOi2iWXyCo0yUIRXXL4sV+fzKUuvTJ3yJE8xTtFQ6fmF13duxS01A1UmZFdU7Mr7S4mUm0CI5MftoS5dbTOiKj27kJz2cSf2hyJDCiRCq95rzrm01ojsNp03WCVy49xCcu7WtY4tllWCHIUvWEl6JMEHQemjlDi3MJcAr3HJRVVG+VpSvhLuOJOTuPRaNuzMLERLuVC4h0x2ivKCxJCLrPAei4lWhfGpW2WSGZbfKErnAITxql1l1M7gvjpU7TGnk0VSqC5eCPvidwnXGxrrin9V2aoF32sPR3yb8fOSb4g7vumRkvvNtlymeZ5mBbsn4nOG7xJi/qwt4+rMb5WTZpBZL9l0cp0LuVTxwuaG7Eu6+rnelVX9jxerwiVfM0SWLJHcjUZNSo7t6ZJglhiu6ZEty19rJiH1m2bCocaK8MvIhoimHoQxevMCStgtaZLOUtjpzQnCVSydEi0JuRZ5oBVpUiiYRVBC+SyJbDHRH1EQwVi20LMmTJK48ytmFo6BzTDLhLW5Mju4tCdkizMKYo1Osjqjw1PdrNmlxd0NgDBB7RywRtrtVbQ4bt8RVC/X9oZnzxaFrB/d1x5s9hYvRa4FDq07QscqyQ2BIGQ9697MaDeUdis2z9U/VtIrQxGyseZ0F9aNdisTIrpmvc8XaCDlEITUdO9YpC4pbXWsI96vVQ9Mpt3QrrDis0aFR2mro4Ptznth5o7QrJUmaftaDgjpWHEmvFc+0tCxF99/rMsDHmnY746t2eIgFZ5a7+TAbMFm/Pvvhmf8eoqv2yVdxQGe8WkS4s6qTTbU0IGm/mBLFwDSnD9cyCZw+hmYDiSSsYOl/NhZeRs2U4ufLWgKac7Yp6fejtrtSrj7RnTw3QD99NRshrOybK9bNXk2ILaJUfaJtz2sxwqbrfvm8y5h10r7GWebVOxKzU5lb9ODLNdx9dBdDMQ+J/BDJ3dgsevsi+bsbIJrk426W7zs3Du7wq/DtWWzbcgP9qQ5YymSppUR/qyGm0uarhmfEbf5mNNdLmxTuMvTOnB25g6LqtYuI+auVyzr7VXMn7W1+hy35b0/s+LNPwofzLa8qx+3z586xxbrbbFdt7b1Ow2PtA7WDptiu+GL7wAIu+dDkrNDGr01a947SuVib3VHWFyF/gGY8vDp3N8YzSt5cfFSYO4TUhzLYyM6xCRYWmfhV1bQVlLa0vlhs+/br4Fgor5VmZtJ+NhKDnVJJrwlsuKzC1EZC2Ndyh+UIcm5172KVPGkQtY7GL9InxL4hmcxcLFux2a72iXq502+njZphsnqUiqerbgZ87I41Hdlvy5K1eXnf54Gib6tp6ovfRVKd1mZ7bBueYJynOaDl4fyTNS92rfvDM4coITfEkEYhPAjCIMQfgRhEMKPIPyThabneA+KCd/HF25swQv0e7RQvMMMLsgvBVAtFBw2AAz0+TxeWM3/aXX2QPnT03hhXGGz72FZD0Q+nyYJ4/hSLrEoUhDx+fvX81ShLF6fYcTtr7B+j7D3nxA8Ll69F354L1QBvRAqgT4I1UDnha/KPjhJ6P/fvgxCMBGEQQg/gjAI4UcQBiH8CMIghB/eC19GCxePrrpm+C9cjBbGj666ZnRrbSB0I4mdRmokdCOJ3SeTjYQuJLGbQjOhC0ns19lICJ8oqLKZEDpRVGNDIei+2OuDo4RwV28v4q9PjRBe87iApnx5Wcgq+z/KiCiKPt0tGQAAAABJRU5ErkJggg==',
            subtitle: 'Vice President',
            datamb:'06.8MB'
          },
          {
            name: 'Report 10.06(Edit)',
            avatar_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6WcbvjxeSRA6dI9viiFdc1aUCrH4auZKpZw&usqp=CAU',
            subtitle: 'Vice Chairman',
            datamb:'10.8MB'
          }
        ]
      },
       {
        date : 'June 2020',
        alldata : [
          {
            name: 'Report 10.06',
            avatar_url: 'data:image/png;base64,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',
            subtitle: 'Vice President'
          },
          {
            name: 'Report 10.06(Edit)',
            avatar_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6WcbvjxeSRA6dI9viiFdc1aUCrH4auZKpZw&usqp=CAU',
            subtitle: 'Vice Chairman'
          }
        ]
      },
]

const onPresscall =()=>{
    alert("File");
}


const FilesScreen = () => {
  console.log("aaaaaa",list.length);
  
  return(
    <ScrollView>
    <View style={styles.container}>
        <SearchBar 
            placeholder="Search.."
            lightTheme
            containerStyle={{backgroundColor: '#fff'}}
            round />
 
        <View style={styles.container}>
            {
                list.map((data,i)=>{
                    return(
                      <View key={i}> 
                       <Text style={{margin:10,fontSize:15,color:'gray',fontWeight:'bold'}}>{data.date}</Text>
                    <View>
                      {(data.alldata.length > 0) ? 
                           data.alldata.map((data1,j)=>{
                              return(
                    <TouchableHighlight
                            onPress={onPresscall}
                            key = {j}
                    >
                            <ListItem  bottomDivider>
                            <Avatar  size ={40}  source={{uri: data1.avatar_url}} />
                            <ListItem.Content>
                              <ListItem.Title 
                                  style={{
                                      fontWeight: "bold",
                                  }}
                              >
                              {data1.name}
                              </ListItem.Title>
                              <ListItem.Subtitle style={{flexDirection: 'row'}}>
                              <Text style={{color:'gray',fontWeight:'bold'}}>{data1.datamb}</Text>
                              </ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    </TouchableHighlight>   
                              );
                           })
                      :
                          ''
                      }
                        
                    </View> 
                </View>        
                )   
            })
        }
        </View>
    </View>
        </ScrollView>


    );
}


export default FilesScreen

const styles = StyleSheet.create({
    
    txtdate:{
      left:7,
      top:9,
      color:"#939393",
      fontSize:15
    },
    container_file: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16
  },
   contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  container:{
    backgroundColor:"#fff"
   }
  });
  
