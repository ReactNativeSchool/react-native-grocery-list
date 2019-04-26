import React, { useState, useEffect, createContext, useContext } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import uuid from "uuid/v4";

// Current List

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
  }, []);

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

// Favorites List

const FAVORITES_LIST_KEY = "@@GroceryList/favoriteList";

const updateStoredFavoriteList = newList => {
  AsyncStorage.setItem(FAVORITES_LIST_KEY, JSON.stringify(newList));
};

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(FAVORITES_LIST_KEY)
      .then(items => JSON.parse(items))
      .then(items => {
        setList(items);
        setLoading(false);
      });
  }, []);

  const addFavorite = item => {
    let newItem = item;
    if (typeof item === "string") {
      newItem = { id: uuid(), name: item };
    }

    const newList = [newItem, ...list];

    setList(newList);
    updateStoredFavoriteList(newList);
  };

  const removeFavorite = id => {
    const newList = list.filter(item => item.id !== id);

    setList(newList);
    updateStoredFavoriteList(newList);
  };

  return (
    <FavoritesContext.Provider
      value={{ list, addFavorite, removeFavorite, loading }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoriteList = () => {
  const { list, addFavorite, removeFavorite, loading } = useContext(
    FavoritesContext
  );

  const isFavorite = id => list.map(f => f.id).includes(id);

  return {
    list,
    loading,
    isFavorite,
    addFavorite,
    removeFavorite
  };
};
