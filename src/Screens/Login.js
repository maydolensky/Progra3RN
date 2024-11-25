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
        <Text style={styles.title}>Ingresar</Text>
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
        <TouchableOpacity style={styles.button} onPress={() => this.handleSubmit(this.state.email, this.state.password)}>
          <Text style={[styles.boton]}> Login </Text>
        </TouchableOpacity>
        {this.state.errorMSG && <Text style={styles.errorText}>{this.state.errorMSG}</Text>}
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate ('Register')} style={styles.button}
        ><Text style={[styles.boton]}>Register</Text> </TouchableOpacity>
      </View>
    )
  }
}
export default Login
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  field: {
    width: '90%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    elevation: 5, //fuente: https://stackoverflow.com/questions/41482448/material-design-elevation-correct-css
  },
  button: {
    backgroundColor: "#007BFF",
    width: '90%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 5, 
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    marginTop: 10,
  },
  registerText: {
    color: '#4a90e2',
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    alignSelf: "center",
  },
  boton:{
    color:"white",
  }
});