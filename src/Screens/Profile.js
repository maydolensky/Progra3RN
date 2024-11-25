import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { auth, db } from "../firebase/config";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
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
      
        <Image
          source={require("../../assets/fondoProfile.jpg")} 
          style={styles.imagen}
        />
        <View style={styles.headerConainer}> 
          <Text  style={styles.headerText}>

            {dataUsuario.length > 0 ? (dataUsuario[0].data.userName) : (<ActivityIndicator size="small" color="#00BFFF" />)}

          </Text>
          <FontAwesome5 name="glass-martini-alt" size={24} color="black" />

       </View>
        
        <View  style={styles.infoRow}> 
          <Text  style={styles.info} > {email}</Text>
          <Text  style={styles.info} > Cantidad de posteos: {postsUsuario.length}</Text> 
        </View>

        {isLoading ? (
          <ActivityIndicator size="small" color="#00BFFF" />
        ) : postsUsuario.length > 0 ? (
          <>
            <FlatList
              data={postsUsuario}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.postContainer}> 
                    <Post item={item} />
                    <TouchableOpacity onPress={() => this.deletePost(item.id)} style={styles.deleteIcon}  >
                     <MaterialIcons name="delete" size={24} color="black" />
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
  },
  headerConainer:{
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: "center", 
    marginBottom: 10, 

  },
  headerText: {
    color: 'black',
    fontSize: 40,
    fontWeight: "bold",
    textAlign: 'center'

  },

  postContainer: {
    marginBottom: 20,
    position: 'relative', 
  },
  deleteIcon: {
    position: 'absolute', 
    top: 10, 
    right: 10, 
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 5,
    elevation: 2, 
  },

  boton: {
    backgroundColor: "#D2B48C",
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "solid",
    width: 120,
    alignSelf: "center",
    borderColor: "#D2B48C",
  },
  imagen: {
    height: "100%",
    width: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute'   
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-around", 
    alignItems: "center",
    padding: 10,
    marginTop: 10},

  info: {
    alignItems: 'center',
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});

export default Profile;
