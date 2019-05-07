import React from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  SectionList
} from "react-native";
import { Header } from "react-navigation";

import { useCurrentList } from "../util/ListManager";

import ListItem, { Separator, SectionHeader } from "../components/ListItem";
import AddItem from "../components/AddItem";

export default ({ navigation }) => {
  const {
    list,
    cart,
    addItem,
    removeItem,
    loading,
    addToCart
  } = useCurrentList();

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={Header.HEIGHT + 20}
    >
      <SectionList
        sections={[
          { title: "List", data: list },
          { title: "Cart", data: cart }
        ]}
        keyExtractor={item => item.id}
        renderSectionHeader={({ section }) => (
          <SectionHeader title={section.title} />
        )}
        renderItem={({ item, index, section }) => {
          let actions = {};

          if (section.title !== "Cart") {
            actions = {
              onAddedSwipe: () => addToCart(item),
              onRemoveSwipe: () => removeItem(item.id)
            };
          }

          return (
            <ListItem
              {...actions}
              name={item.name}
              onFavoritePress={() => alert("not implemented!")}
              isFavorite={index < 2}
              onRowPress={() => navigation.navigate("ItemDetails", { item })}
            />
          );
        }}
        ListHeaderComponent={() => (
          <AddItem
            onSubmitEditing={({ nativeEvent: { text } }) => addItem(text)}
          />
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
    </KeyboardAvoidingView>
  );
};
