import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    flex: 1,
    padding: 10
  },
  input: {
    backgroundColor: "#fff",
    fontSize: 18,
    padding: 10,
    borderRadius: 3
  }
});

const AddItem = ({ style, ...rest }) => (
  <View style={styles.container}>
    <TextInput
      style={[styles.input, style]}
      placeholder="Add new item..."
      {...rest}
    />
  </View>
);

export default AddItem;
