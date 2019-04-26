import React from "react";
import { FlatList, View } from "react-native";

import ListItem, { Separator } from "../components/ListItem";

import nachos from "../data/nachos";
import AddItem from "../components/AddItem";

export default () => (
  <View style={{ flex: 1 }}>
    <AddItem placeholder="Add new favorite..." />
    <FlatList
      data={nachos}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <ListItem name={item.name} showStar={false} />}
      ItemSeparatorComponent={() => <Separator />}
    />
  </View>
);
