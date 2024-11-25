import React from 'react'
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Usuarios from "../screens/Usuarios";
import NuevoPost from "../screens/NuevoPost";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
const Tab = createBottomTabNavigator();

const HomeMenu = () => {

  return (
        <Tab.Navigator screenOptions= {{tabBarShowLabel: false}}> 
            <Tab.Screen name= "Home" component= {Home} options={{tabBarIcon:() => <MaterialCommunityIcons name="home" size={24} color="black"/>}}/>
            <Tab.Screen name= "Usuarios" component= {Usuarios} options={{tabBarIcon:() => <MaterialCommunityIcons name="account-group" size={24} color="black"/>}} /> 
            <Tab.Screen name= "NuevoPost" component= {NuevoPost} options={{tabBarIcon:() => <Octicons name="diff-added" size={24} color="black"/>}}/> 
            <Tab.Screen name= "Profile" component= {Profile} options={{tabBarIcon:() => <Ionicons name="person-circle" size={24} color="black"/>}}/>   
        </Tab.Navigator>
  )
}
export default HomeMenu