import React, { Component } from "react";
import { Text, View } from "react-native";
import { StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
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
    if (mensaje === "" || titulo === "") {
      this.setState({ errorMSG: "Todos los campos son obligatorios" });
      return this.state.errorMSG;
    } else {
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
        });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../assets/fondoo.jpg")}
          resizeMode="cover"
        />
        <Text style={styles.title}>Subi tu receta gastronómica!</Text>
        <View style={styles.arriba}>
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
          {this.state.errorMSG && (
            <Text style={styles.errorMSG}>{this.state.errorMSG}</Text>
          )}

          <TouchableOpacity
            style={styles.boton}
            onPress={() => [
              this.handleSubmit(this.state.mensaje, this.state.titulo),
            ]}
          >
            <Text style={styles.colorBoton}> Subir </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default NuevoPost;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
    color: "black",
  },
  field: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    elevation: 3,
  },
  boton: {
    backgroundColor: "#007BFF",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    elevation: 5,
  },
  colorBoton: {
    color: "#fff",
  },
  errorMSG: {
    color: "red",
    marginTop: 10,
    marginBottom: 20,
    alignSelf: "center",
  },
  image: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: "110%", // recomendación de Luca
    width: "100%",
    position: "absolute",
  },
  arriba: {
    flex: 1,
    justifyContent: "center",
  },
});
