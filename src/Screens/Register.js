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
      errorEmail: "",
      errorPassword: "",
      errorUserName: "",
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate("Login");
      }
    });
  }

  handleSubmit(email, pass, userName) {
    if (email === "") this.setState({ errorEmail: "el Email es requerido" });
    else {
      this.setState({ errorEmail: " " });
    }
    if (userName === "")
      this.setState({ errorUserName: "el Nombre de usuario es requerido" });
    else {
      this.setState({ errorUserName: " " });
    }
    if (pass === "")
      this.setState({ errorPassword: "la Contraseña es requerida" });
    else {
      this.setState({ errorPassword: " " });
    }
    if (email === "" || pass === "" || userName === "") {
      this.setState({ errorMSG: "todos lo campos son obligatorios" });
      return this.state.errorMSG;
    } else {
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
                this.setState({
                  registered: true,
                  errorMSG: "",
                  errorEmail: "",
                  errorPassword: "",
                  errorUserName: "",
                });

                this.props.navigation.navigate("Login");
              })
              .catch(() => {
                alert(
                  "Ocurrió un error al registrate. Intentá de nuevo más tarde."
                );
              });
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
        <Text style={styles.title}>Registro</Text>

        <TextInput
          style={styles.field}
          keyboardType="email-address"
          placeholder="completar con email"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />
        <Text style={styles.mensajesError}>{this.state.errorEmail}</Text>
        <TextInput
          style={styles.field}
          keyboardType="default"
          placeholder=" completar con user-name"
          onChangeText={(text) => this.setState({ userName: text })}
          value={this.state.userName}
        />
        <Text style={styles.mensajesError}>{this.state.errorUserName}</Text>

        <TextInput
          style={styles.field}
          keyboardType="default"
          placeholder=" completar con password"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />
        <Text style={styles.mensajesError}>{this.state.errorPassword}</Text>

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
          <Text style={styles.botonTexto}> Registrarme </Text>
        </TouchableOpacity>

        {this.state.errorMSG && (
          <Text style={styles.errorText}>{this.state.errorMSG}</Text>
        )}
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Login")}
          style={styles.botonSecundario}
        >
          <Text style={styles.botonSecundarioTexto}>Ya tengo cuenta</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  mensajesError: {
    color: "red",
    alignItems: "center",
    margin: "10px",
  },
  field: {
    width: "90%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    elevation: 5, //fuente: https://stackoverflow.com/questions/41482448/material-design-elevation-correct-css
  },
  boton: {
    backgroundColor: "#007BFF",
    width: "90%",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    elevation: 5, //fuente: https://stackoverflow.com/questions/41482448/material-design-elevation-correct-css
  },
  botonInactivo: {
    backgroundColor: "#ccc",
  },
  botonTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  botonSecundario: {
    marginTop: 10,
  },
  botonSecundarioTexto: {
    color: "#007BFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginTop: 10,
    fontSize: 14,
  },
});
