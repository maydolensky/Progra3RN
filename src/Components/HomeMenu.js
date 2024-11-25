import React, { Component } from 'react'
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Usuarios from "../screens/Usuarios";
import NuevoPost from "../screens/NuevoPost";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
const Tab = createBottomTabNavigator();
import { auth, db } from "../firebase/config";

class HomeMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false, 
    };
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        this.props.navigation.navigate("Login");
      }
    });
    this.setState({
      isLoading: true,
    });
  }
  render() {
    return (
      <Tab.Navigator screenOptions= {{tabBarShowLabel: false}}> 
      <Tab.Screen name= "Home" component= {Home} options={{tabBarIcon:({focused}) => <MaterialCommunityIcons name= {focused ? "home" : "home-outline"}  size={24} color="black"/>, headerShown: false}}/>
      <Tab.Screen name= "Usuarios" component= {Usuarios} options={{tabBarIcon:({focused}) => <MaterialCommunityIcons name={focused ? "account-group" : "account-group-outline"} size={24} color="black"/>, headerShown: false}} /> 
      <Tab.Screen name= "NuevoPost" component= {NuevoPost} options={{tabBarIcon:({focused}) => <MaterialIcons name={ focused ? "add-circle" : "add-circle-outline"} size={24} color="black"/>, headerShown: false}}/> 
      <Tab.Screen name= "Profile" component= {Profile} options={{tabBarIcon:({focused}) => <Ionicons name={focused ? "person-circle" : "person-circle-outline"} size={24} color="black"/>, headerShown: false}}/>   
      </Tab.Navigator>
    )
  }
}

export default HomeMenu
