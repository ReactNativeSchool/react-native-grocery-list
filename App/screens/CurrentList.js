import React from "react";
import { FlatList, View, ActivityIndicator } from "react-native";

import { useCurrentList } from "../util/ListManager";

import ListItem, { Separator } from "../components/ListItem";
import AddItem from "../components/AddItem";

export default () => {
  const { list, addItem, removeItem, loading } = useCurrentList();

  if (loading) {
    return <ActivityIndicator />;
  }

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
