import React from "react";
import { FlatList, View, ActivityIndicator } from "react-native";

import { useFavoriteList } from "../util/ListManager";

import ListItem, { Separator } from "../components/ListItem";
import AddItem from "../components/AddItem";

export default () => {
  const { list, loading, addFavorite, removeFavorite } = useFavoriteList();

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={{ flex: 1 }}>
      <AddItem
        placeholder="Add new favorite..."
        onSubmitEditing={({ nativeEvent: { text } }) => addFavorite(text)}
      />
      <FlatList
        data={list}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ListItem
            name={item.name}
            showStar={false}
            onRemoveSwipe={() => removeFavorite(item.id)}
          />
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
    </View>
  );
};
