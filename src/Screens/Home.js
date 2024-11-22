import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import { auth } from "../firebase/config";

export class Home extends Component {
  constructor() {
    super();
    this.state = {
      errorMSG: "",
    };
  
  }

  componentDidMount(){
    auth.onAuthStateChanged(user =>{
      if(!user){
        this.props.navigation.navigate('Login')
      }
    })
  }

  handleLogOut = ()=> auth.signOut().then(() => {
    this.props.navigation.navigate('Login');
  })
  .catch((error) => this.setState({ errorMSG: error.message }));


  render() {
    return (
        <View>
            <TouchableOpacity style={styles.boton} onPress={this.handleLogOut}>
              <Text>Log Out</Text>
            </TouchableOpacity>
        </View>
      
    )
  }
}

export default Home

const styles = StyleSheet.create({
  boton: {
    backgroundColor: "#28a745",
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#28a745",
  },

});
