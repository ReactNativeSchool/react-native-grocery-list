import React from "react";
import { FlatList } from "react-native";

import ListItem, { Separator } from "../components/ListItem";

import nachos from "../data/nachos";
import AddItem from "../components/AddItem";

export default () => (
  <FlatList
    data={nachos}
    keyExtractor={item => item.id}
    renderItem={({ item }) => <ListItem name={item.name} />}
    ItemSeparatorComponent={() => <Separator />}
    ListHeaderComponent={<AddItem />}
  />
);
