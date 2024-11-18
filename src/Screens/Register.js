import React, { Component } from "react";
import { Text, View } from "react-native";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { auth, db } from "../firebase/config";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      userName: "",
      password: "",
      registered: false,
      errorMSG: "",
    };
  }

  handleSubmit(email, pass, userName) {
    if (email === '' || pass === '' || userName === ""){
      this.setState({errorMSG: 'todos lo campos son obligatorios'})
      return(this.state.errorMSG)
      
    }else{
      auth
      .createUserWithEmailAndPassword(email, pass)
      .then((response) => {
        if (response) {
          db.collection("users")
            .add({
              email: email,
              userName: userName,
              createdAt: Date.now(),
            })
            .then(() => {
              this.setState({ registered: true, errorMSG: "" });

              this.props.navigation.navigate("Login");
            })
            .catch((e) => console.log(error.message));
        }
      })
      .catch((error) => this.setState({ errorMSG: error.message }));

    }

    
  }
  render() {
    const camposCompletos =
      this.state.email !== "" &&
      this.state.userName !== "" &&
      this.state.password !== "";

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Registro</Text>

        <TextInput
          style={styles.field}
          keyboardType="email-address"
          placeholder="completar con email"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />
        <TextInput
          style={styles.field}
          keyboardType="default"
          placeholder=" completar con user-name"
          onChangeText={(text) => this.setState({ userName: text })}
          value={this.state.userName}
        />
        <TextInput
          style={styles.field}
          keyboardType="default"
          placeholder=" completar con password"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />

        <TouchableOpacity
          style={[styles.boton, !camposCompletos && styles.botonInactivo]}
          onPress={() =>
            this.handleSubmit(
              this.state.email,
              this.state.password,
              this.state.userName
            )
          }
        >
          {" "}
          <Text style={styles.colorBoton}> Registrarme </Text>
        </TouchableOpacity>

        

        {this.state.errorMSG && <Text>{this.state.errorMSG}</Text>}
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Login")}
          style={styles.button}
        >
          <Text>Ya tengo cuenta</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Register;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  field: {
    Altura: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "solid",
    borderRadius: 6,
    marginVertical: 10,
  },
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
  botonInactivo: {
    backgroundColor: "#ccc",
    borderColor: "#ccc",
  },
  colorBoton: {
    color: "#fff",
  },
  heading: {
    fontSize: 30,
    fontWeight: 700,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#51b9e9",
    borderRadius: 5,
    padding: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
});
