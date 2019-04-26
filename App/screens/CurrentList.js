import React from "react";
import { FlatList, View, ActivityIndicator } from "react-native";

import { useCurrentList, useFavoriteList } from "../util/ListManager";

import ListItem, { Separator } from "../components/ListItem";
import AddItem from "../components/AddItem";

export default () => {
  const { list, addItem, removeItem, loading } = useCurrentList();
  const { isFavorite, addFavorite, removeFavorite } = useFavoriteList();

  if (loading) {
    return <ActivityIndicator />;
  }

  console.log("CurrentList", Date.now());
  return (
    <View style={{ flex: 1 }}>
      <AddItem onSubmitEditing={({ nativeEvent: { text } }) => addItem(text)} />
      <FlatList
        data={list}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const favorite = isFavorite(item.id);
          return (
            <ListItem
              name={item.name}
              onAddedSwipe={() => removeItem(item.id)}
              onRemoveSwipe={() => removeItem(item.id)}
              onFavoritePress={() => {
                if (favorite) {
                  removeFavorite(item.id);
                } else {
                  addFavorite(item);
                }
              }}
              isFavorite={favorite}
            />
          );
        }}
        ItemSeparatorComponent={() => <Separator />}
      />
    </View>
  );
};
