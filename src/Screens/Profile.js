import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { auth, db } from "../firebase/config";
import Post from "../Components/Post";

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      userName: "",
      errorMsg: "",
      postsUsuario: [],
      dataUsuario: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    const user = auth.currentUser;
    if (user) {
      db.collection("posts")
        .where("email", "==", user.email)
        .onSnapshot((docs) => {
          let postsUsuario = [];
          docs.forEach((doc) => {
            postsUsuario.push({
              id: doc.id,
              data: doc.data(),
            });
          });
        
          postsUsuario.sort((a, b) => b.data.createdAt - a.data.createdAt);
          this.setState({
            postsUsuario: postsUsuario,
            email: user.email,
            isLoading: false,
          });
        });
        db.collection("users")
        .where("email", "==", user.email)
        .onSnapshot((docs) => {
          let dataUsuario = [];
          docs.forEach((doc) => {
            dataUsuario.push({
              id: doc.id,
              data: doc.data(),
            });
          }); 
          this.setState({
            dataUsuario: dataUsuario,
            
          });
        
        
        })


    } else {
      this.setState({
        errorMsg: "No se encontró usuario en sesión",
      });
    }
  }
  deletePost = (postId) => {
    db.collection("posts")
      .doc(postId) 
      .delete()
      .then(() => {
        console.log("Post eliminado");
        
        this.setState({
          postsUsuario: this.state.postsUsuario.filter(
            (post) => post.id !== postId
          ),
        });
      })
      .catch((error) => console.log(error));
  };
  handleLogOut = () =>
    auth
      .signOut()
      .then(() => {
        this.props.navigation.navigate("Login");
      })
      .catch((error) => this.setState({ errorMSG: error.message }));

  render() {
    const { email, errorMsg, dataUsuario,  postsUsuario, isLoading } = this.state;

    return (
      <View style={styles.container}>
        <Text>
        Nombre de usuario:{dataUsuario.length > 0 ? dataUsuario[0].data.userName : "Cargando..."}
      </Text>
        <Text> Email: {email}</Text>
        <Text> Cantidad de posteos: {postsUsuario.length}</Text>

        {isLoading ? (
          <Text>Cargando...</Text>
        ) : postsUsuario.length > 0 ? (
          <>
            <FlatList
              data={postsUsuario}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View> 
                    <Post item={item} />
                    <TouchableOpacity onPress={() => this.deletePost(item.id)} >
                        <Text>Eliminar Post</Text>
                     </TouchableOpacity>
                </View>
                
            )}
               
            />
            <TouchableOpacity style={styles.boton} onPress={this.handleLogOut}>
              <Text>Log Out</Text>
            </TouchableOpacity>
          </>
        ) : ( <>
        
              <Text> El usuario no ha subido ningun post</Text>
              <TouchableOpacity style={styles.boton} onPress={this.handleLogOut}>
              <Text>Log Out</Text>
             </TouchableOpacity>

            
             </>
         
         
        

          
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
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
});

export default Profile;
