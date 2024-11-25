import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, FlatList, Image, ActivityIndicator } from "react-native";
import { auth, db } from "../firebase/config";
import Post from "../Components/Post";
const backgroundImage = require("../../assets/fondo-home.png");


export class Home extends Component {
  constructor() {
    super();
    this.state = {
      errorMSG: "",
      posteos: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        this.props.navigation.navigate("Login");
      }
    });
    this.setState({
      isLoading: true,
    });
    
    this.fetchPosts();}
    fetchPosts = () => {
    db.collection("posts")
    .orderBy("createdAt", "desc")
    .onSnapshot((docs) => {
      let posteos = [];
      docs.forEach((doc) => {
        posteos.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      this.setState({
        posteos: posteos,
        isLoading: false,
      });
    });
  }

  handleLogOut = () =>
    auth
      .signOut()
      .then(() => {
        this.props.navigation.navigate("Login");
      })
      .catch((error) => this.setState({ errorMSG: error.message }));

  render() {
    const { posteos, isLoading } = this.state;
    return (
      <View style={styles.container}>
        <Image source={backgroundImage} style={styles.backgroundImage} />
        <Text style={styles.titulo}>Tus Recetas Favoritas</Text>

        {isLoading ? (
          <ActivityIndicator size="large" color="#00BFFF" />
        ) : posteos.length > 0 ? (
          <FlatList
            style={styles.postList}
            data={posteos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Post item={item} />}
          />
        ) : (
          <Text>No se han encontrado recetas</Text>
        )}

      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: "#f0f0f0", 
    textAlign: 'center',
    margin: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  postList: {
    flexGrow: 1,
  },
  loadingText: {
    textAlign: "center",
    fontSize: 18,
    color: "#777",
    marginTop: 20,
  },
  noPostsText: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
    marginTop: 20,
  },
  boton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  botonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});