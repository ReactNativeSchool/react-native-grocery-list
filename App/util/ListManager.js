import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import uuid from "uuid/v4";

const CURRENT_LIST_KEY = "@@GroceryList/currentList";

const updateStoredCurrentList = newList => {
  AsyncStorage.setItem(CURRENT_LIST_KEY, JSON.stringify(newList));
};

export const useCurrentList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(CURRENT_LIST_KEY)
      .then(items => JSON.parse(items))
      .then(items => {
        setList(items);
        setLoading(false);
      });
  }, [loading]);

  const addItem = text => {
    const newList = [{ id: uuid(), name: text }, ...list];
    setList(newList);
    updateStoredCurrentList(newList);
  };

  const removeItem = id => {
    const newList = list.filter(item => item.id !== id);
    setList(newList);
    updateStoredCurrentList(newList);
  };

  return {
    list,
    addItem,
    removeItem,
    loading
  };
};
