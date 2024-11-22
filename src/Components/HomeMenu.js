import React from 'react'
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Usuarios from "../screens/Usuarios";
import NuevoPost from "../screens/NuevoPost";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

const HomeMenu = () => {
  return (
        <Tab.Navigator>
            <Tab.Screen name= "Home" component= {Home} options={{headerShown: false}}/>
            {/* Descomentar cuando vayamos haciendo cada screen <Tab.Screen name= "Profile" component= {Profile} options={{headerShown: false}}/>
            <Tab.Screen name= "Usuarios" component= {Usuarios} options={{headerShown: false}}/ > */}
            <Tab.Screen name= "NuevoPost" component= {NuevoPost} options={{headerShown: false}}/> 
        </Tab.Navigator>
  )
}
export default HomeMenu