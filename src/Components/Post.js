import { Text, View, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import { db, auth } from "../firebase/config";
import firebase from 'firebase' 
export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: false, // Inicializamos 'like' como un booleano
    };
  }

  componentDidMount() {
    const { item } = this.props;
    const userEmail = auth.currentUser ? auth.currentUser.email : null;

    // Verificamos si 'likes' existe y si el usuario ya ha dado like
    if (item && item.data && Array.isArray(item.data.likes) && userEmail) {
      if (item.data.likes.includes(userEmail)) {
        this.setState({ like: true }); // Si el email del usuario está en los likes, setear 'like' en true
      }
    }
  }

  handleLike = () => {
    const { item } = this.props;
    const userEmail = auth.currentUser ? auth.currentUser.email : null;

    if (userEmail) {
      db.collection("posts")
        .doc(item.id)
        .update({
          likes: firebase.firestore.FieldValue.arrayUnion(userEmail), // Usamos 'db.FieldValue' aquí
        })
        .then(() => {
          this.setState({ like: true }); // Establecemos 'like' en true después de dar el like
        })
        .catch((error) => console.log("Error al dar like:", error));
    }
  };

  handleDislike = () => {
    const { item } = this.props;
    const userEmail = auth.currentUser ? auth.currentUser.email : null;

    if (userEmail) {
      db.collection("posts")
        .doc(item.id)
        .update({
          likes: firebase.firestore.FieldValue.arrayRemove(userEmail), // Usamos 'db.FieldValue' aquí también
        })
        .then(() => {
          this.setState({ like: false }); // Establecemos 'like' en false después de quitar el like
        })
        .catch((error) => console.log("Error al quitar like:", error));
    }
  };

  render() {
    return (
      <View>
        <Text>{this.props.item.data.mensaje}</Text>
        <Text>{this.props.item.data.email}</Text>

        {this.state.like ? (
          <TouchableOpacity onPress={this.handleDislike}>
            <Text>Dislike</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={this.handleLike}>
            <Text>Like</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
