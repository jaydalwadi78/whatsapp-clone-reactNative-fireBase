import * as React from 'react';
import { StyleSheet, View ,Image,Button,Alert,ScrollView,TouchableOpacity} from 'react-native';
import {TextInput,Text} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';  
import { Card, ListItem, Icon ,Avatar} from 'react-native-elements';


const LinksScreen = () => {
  return(
    <View>
        <Card>
            <Text style={{fontSize:30}}>Links Screen</Text>
        </Card>

        <Card>
            <Text style={{fontSize:30}}>Links Screen</Text>
        </Card>

    </View>

    );
}


export default LinksScreen