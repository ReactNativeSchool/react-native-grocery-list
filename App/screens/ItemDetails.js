import React from "react";
import { View, Text } from "react-native";

export default ({ navigation }) => (
  <View>
    <Text>{JSON.stringify(navigation.getParam("item"), null, 2)}</Text>
  </View>
);
