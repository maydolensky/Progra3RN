import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./src/screens/Login";
import Register from "./src/screens/Register"
import HomeMenu from "./src/Components/HomeMenu"


const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name= "HomeMenu" component= {HomeMenu} screenOptions ={{tabBarShowLabel:false}}/>
      <Stack.Screen name="Register" component={Register} screenOptions={{tabBarShowLabel:false}} />

      <Stack.Screen name="Login" component={Login} screenOptions={{tabBarShowLabel:false}}    />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});