import { Text, View, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import { db, auth } from "../firebase/config";
export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text>{this.props.item.data.mensaje}</Text>
        <Text>{this.props.item.data.email}</Text>
      </View>
    );
  }
}
