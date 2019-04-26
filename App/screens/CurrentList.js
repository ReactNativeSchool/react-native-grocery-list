import React, { useState } from "react";
import { FlatList, View } from "react-native";
import uuid from "uuid/v4";

import ListItem, { Separator } from "../components/ListItem";

import nachos from "../data/nachos";
import AddItem from "../components/AddItem";

const useCurrentList = initialList => {
  const [list, setList] = useState(initialList);

  const addItem = text => {
    setList([{ id: uuid(), name: text }, ...list]);
  };

  const removeItem = id => {
    const newList = list.filter(item => item.id !== id);
    setList(newList);
  };

  return {
    list,
    addItem,
    removeItem
  };
};

export default () => {
  const { list, addItem, removeItem } = useCurrentList(nachos);

  return (
    <View style={{ flex: 1 }}>
      <AddItem onSubmitEditing={({ nativeEvent: { text } }) => addItem(text)} />
      <FlatList
        data={list}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ListItem
            name={item.name}
            onAddedSwipe={() => removeItem(item.id)}
            onRemoveSwipe={() => removeItem(item.id)}
          />
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
    </View>
  );
};
