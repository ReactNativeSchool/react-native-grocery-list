import React from "react";
import {
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView
} from "react-native";
import { Header } from "react-navigation";

import { useCurrentList } from "../util/ListManager";

import ListItem, { Separator } from "../components/ListItem";
import AddItem from "../components/AddItem";

export default ({ navigation }) => {
  const { list, addItem, removeItem, loading } = useCurrentList();

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={Header.HEIGHT + 20}
    >
      <AddItem onSubmitEditing={({ nativeEvent: { text } }) => addItem(text)} />
      <FlatList
        data={list}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <ListItem
            name={item.name}
            onAddedSwipe={() => removeItem(item.id)}
            onRemoveSwipe={() => removeItem(item.id)}
            onFavoritePress={() => alert("not implemented!")}
            isFavorite={index < 2}
            onRowPress={() => navigation.navigate("ItemDetails", { item })}
          />
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
    </KeyboardAvoidingView>
  );
};
