import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import uuid from "uuid/v4";

// Current List

const CURRENT_LIST_KEY = "@@GroceryList/currentList";
const CURRENT_CART_KEY = "@@GroceryList/currentCart";

const updateStoredCurrentList = newList => {
  AsyncStorage.setItem(CURRENT_LIST_KEY, JSON.stringify(newList));
};

const updateStoredCurrentCart = newList => {
  AsyncStorage.setItem(CURRENT_CART_KEY, JSON.stringify(newList));
};

export const useCurrentList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem(CURRENT_LIST_KEY),
      AsyncStorage.getItem(CURRENT_CART_KEY)
    ])
      .then(([items, cartItems]) => [JSON.parse(items), JSON.parse(cartItems)])
      .then(([items, cartItems]) => {
        if (items) {
          setList(items);
        }
        if (cartItems) {
          setCart(cartItems);
        }
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

  const addToCart = item => {
    removeItem(item.id);
    const newCart = [item, ...cart];
    setCart(newCart);
    updateStoredCurrentCart(newCart);
  };

  return {
    list,
    addItem,
    removeItem,
    loading,
    cart,
    addToCart
  };
};
