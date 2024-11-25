import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import React, { Component } from "react";
import { db, auth } from "../firebase/config";
import firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: false,
    };
  }

  componentDidMount() {
    const { item } = this.props;

    if (item.data.likes.includes(auth.currentUser.email)) {
      this.setState({
        like: true,
      });
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
        .catch((error) => {
          alert("Ocurrió un error al dar like, por favor intentá nuevamente.");
        });
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
    const { item } = this.props;
    const { like } = this.state;
    return (
      <View style={styles.postContainer}>
        <Text style={styles.title}>{item.data.titulo}</Text>
        <Text style={styles.email}>{item.data.email}</Text>
        <Text style={styles.message}>{item.data.mensaje}</Text>

        <View style={styles.likeRow}>
          <TouchableOpacity
            style={styles.likeContainer}
            onPress={like ? this.handleDislike : this.handleLike}
          >
            <Ionicons
              name={like ? "heart" : "heart-outline"}
              size={24}
              color={like ? "red" : "black"}
            />
          </TouchableOpacity>
          <Text style={styles.likeCount}>{item.data.likes.length}</Text>
        </View>
      </View>
    );
  }
}

export default Post;

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  email: {
    fontSize: 12,
    color: "#999",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: "#555",
    marginBottom: 15,
  },
  likeRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  likeContainer: {
    marginRight: 5,
  },
  likeCount: {
    fontSize: 16,
    color: "#555",
  },
});
