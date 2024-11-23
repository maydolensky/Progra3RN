import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { auth, db } from "../firebase/config";
import Post from "../Components/Post";

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
    db.collection("posts").onSnapshot((docs) => {
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
        <Text>Las mejores rectas:</Text>

        {isLoading ? (
          <Text>Cargando...</Text>
        ) : posteos.length > 0 ? (
          <FlatList
            data={posteos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Post item={item} />}
          />
        ) : (
          <Text>No se han encontrado recetas</Text>
        )}

        {/* <Comentario/> */}

        <TouchableOpacity style={styles.boton} onPress={this.handleLogOut}>
          <Text>Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
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
    container: {
      margin: 20,
    },
    posteosContainer: {
      marginTop: 10,
      marginBottom: 10,
      padding: 10,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: "#0000006d",
    },
  
    heading: {
      fontSize: 30,
      fontWeight: 700,
      marginBottom: 10,
    },
  
    button: {
      backgroundColor: "#51B9E9",
      borderRadius: 5,
      padding: 5,
      width: "100%",
      alignItems: "center",
      marginTop: 10,
    },
  
    buttonSecondary: {
      backgroundColor: "#FFA500",
    },
  });
  

