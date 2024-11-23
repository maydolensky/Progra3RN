import { Text, View, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import { db, auth } from "../firebase/config";
import firebase from 'firebase' 

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: false, 

    };
  }

  componentDidMount() {
    const { item } = this.props;
    const userEmail = auth.currentUser ? auth.currentUser.email : null;

    if (item && item.data && Array.isArray(item.data.likes) && userEmail) {
      if (item.data.likes.includes(userEmail)) {
        this.setState({ like: true }); 
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
          likes: firebase.firestore.FieldValue.arrayUnion(userEmail), 
        })
        .then(() => {
          this.setState({ like: true }); 
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
          likes: firebase.firestore.FieldValue.arrayRemove(userEmail), 
        })
        .then(() => {
          this.setState({ like: false }); 
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
        <Text>Cantidad de likes: {this.props.item.data.likes.length}</Text>
      </View>
    );
  }
}

export default Post