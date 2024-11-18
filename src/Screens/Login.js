import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { auth } from "../firebase/config";

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      loged: false,
      errorMSG: ""
    }
  }
  
  componentDidMount(){
    auth.onAuthStateChanged(user =>{
      if(user){
        this.props.navigation.navigate('HomeMenu')
      }
    })
  }

  handleSubmit(email, password){
    if (email === '' || password === ''){
      this.setState({errorMSG: 'todos lo campos son obligatorios'})
      return(this.state.errorMSG)
      
    }else{
    auth.signInWithEmailAndPassword(email, password).then(response =>{this.props.navigation.navigate("HomeMenu"), this.setState({loged:true, errorMSG: ""})})
    .catch(error => this.setState({errorMSG: error.message}))
  }}
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Ingresar</Text>
        <TextInput style={styles.field}
          keyboardType='email-address'
          placeholder='email'
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email} />
        <TextInput style={styles.field}
          keyboardType='default'
          placeholder='password'
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password} />
        <TouchableOpacity style={styles.boton} onPress={() => this.handleSubmit(this.state.email, this.state.password)}>
          <Text style={[styles.boton]}> Login </Text>
        </TouchableOpacity>
        {this.state.errorMSG && <Text>{this.state.errorMSG}</Text>}
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate ('Register')} style={styles.button}
        ><Text>Register</Text> </TouchableOpacity>
      </View>
    )
  }
}
export default Login
const styles = StyleSheet.create({
  container:{
    margin: 20,
  },
  heading:{
    fontSize: 30,
    fontWeight:700,
    marginBottom:10,
  },
  field:{
    height: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor:'#ccc' ,
    borderStyle: 'solid',
    borderRadius: 6,
    marginVertical: 10
  },
  boton: {
    backgroundColor: '#28A745',
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#28A745',
},
  button:{
    backgroundColor: "#51B9E9",
    borderRadius: 5,
    padding:5,
    width:"100%",
    alignItems: "center",
    marginTop:10,
  },
})