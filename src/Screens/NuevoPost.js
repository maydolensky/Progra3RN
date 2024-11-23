import React, { Component } from "react";
import { Text, View } from "react-native";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { auth, db } from "../firebase/config";

export class NuevoPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMSG: "",
      mensaje: "",
      titulo: "",

    };
  }
  handleSubmit(mensaje, titulo) {
    if(mensaje === "" || titulo === ""){
      this.setState({errorMSG: "Todos los campos son obligatorios"})
      return(this.state.errorMSG)
    }else {
    db.collection("posts")
      .add({
        email: auth.currentUser.email,
        mensaje: mensaje,
        titulo: titulo,
        likes: [],
        createdAt: Date.now(),
      })
      .then(() => {
        this.setState({ mensaje: "", titulo: "", errorMSG: "" });
        this.props.navigation.navigate("Home");
      })
      .catch((e) => console.log(e));
  }}
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Subi tu receta gastronómica!</Text>
        <TextInput
          style={styles.field}
          keyboardType="default"
          placeholder="Titulo de tu receta"
          multiline={true}
          numberOfLines={1}
          onChangeText={(text) => this.setState({ titulo: text })}
          value={this.state.titulo}
          
        />


        <TextInput
          style={styles.field}
          keyboardType="default"
          placeholder="Receta"
          multiline={true}
          numberOfLines={4}
          onChangeText={(text) => this.setState({ mensaje: text })}
          value={this.state.mensaje}
          
        />
        {this.state.errorMSG && <Text>{this.state.errorMSG}</Text>}

        <TouchableOpacity
          style={styles.boton}
          onPress={() => [
            this.handleSubmit(this.state.mensaje, this.state.titulo),
            
          ]}
        >
          <Text style={styles.colorBoton}> Subir </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default NuevoPost;
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
