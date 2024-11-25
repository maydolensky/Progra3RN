import React, { Component } from "react";
import {View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { db } from "../firebase/config";

export default class Usuarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [], 
      filteredUsers: [], 
      filterValue: "", 
      loading: true, 
    };
  }

  componentDidMount() {
    db.collection("users")
      .orderBy("userName", "desc") 
      .onSnapshot((docs) => {
        const usersArray = [];
        docs.forEach((doc) => {
          usersArray.push({
            id: doc.id, 
            data: doc.data(), 
          });
        });

        this.setState({
          users: usersArray,
          filteredUsers: usersArray, 
          loading: false,
        });
      });
  }

  handleFilterChange = (text) => {
    this.setState({
      filterValue: text,
      filteredUsers: this.state.users.filter((user) =>
        user.data.userName.toLowerCase().includes(text.toLowerCase())
      ),
    });
  };

  handleResetFilter = () => {
    this.setState({
      filterValue: "",
      filteredUsers: this.state.users,
    });
  };

  render() {
    const { filteredUsers, filterValue, loading } = this.state;

    if (loading) {
      return (
        <View style={styles.center}>
          <Text style={styles.loadingText}>Cargando usuarios...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Usuarios</Text>

        <TextInput
          style={styles.input}
          placeholder="Buscar usuarios"
          value={filterValue}
          onChangeText={this.handleFilterChange}
        />

        <TouchableOpacity style={styles.resetButton} onPress={this.handleResetFilter}>
          <Text style={styles.resetButtonText}>Resetear</Text>
        </TouchableOpacity>

        {filteredUsers.length > 0 ? (
          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.userItem}>
                <Text style={styles.userText}>{item.data.userName}</Text>
              </View>
            )}
          />
        ) : (
          <View style={styles.center}>
            <Text style={styles.noResultsText}>No se encontraron usuarios.</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#2c3e50",  
  },
  input: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  resetButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  resetButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  userItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2, //fuente: https://stackoverflow.com/questions/41482448/material-design-elevation-correct-css
  },
  userText: {
    fontSize: 18,
    color: "#333",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#555",
  },
  noResultsText: {
    fontSize: 16,
    color: "#999",
  },
});