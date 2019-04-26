import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  text: {
    fontSize: 18,
    color: "#696969"
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)"
  }
});

export const Separator = () => <View style={styles.separator} />;

const ListItem = ({ name }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{name}</Text>
  </View>
);

export default ListItem;
