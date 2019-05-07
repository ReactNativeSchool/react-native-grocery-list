import React from "react";
import { Image, Platform } from "react-native";
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";

import CurrentList from "../screens/CurrentList";
import FavoritesList from "../screens/FavoritesList";
import ItemDetails from "../screens/ItemDetails";

const CurrentListStack = createStackNavigator({
  CurrentList: {
    screen: CurrentList,
    navigationOptions: {
      headerTitle: "Shopping List"
    }
  },
  ItemDetails: {
    screen: ItemDetails,
    navigationOptions: ({ navigation }) => ({
      headerTitle: navigation.getParam("item").name
    })
  }
});

const FavoritesStack = createStackNavigator({
  Favorites: {
    screen: FavoritesList,
    navigationOptions: {
      headerTitle: "Favorites"
    }
  }
});

const Tabs = createBottomTabNavigator(
  {
    CurrentList: {
      screen: CurrentListStack,
      navigationOptions: {
        tabBarLabel: "Current List"
      }
    },
    FavoritesList: {
      screen: FavoritesStack,
      navigationOptions: {
        tabBarLabel: "Favorites"
      }
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let image;
        if (routeName === "CurrentList") {
          image = Platform.select({
            ios: require("../assets/icons/ios-list.png"),
            android: require("../assets/icons/md-list.png")
          });
        } else if (routeName === "FavoritesList") {
          image = Platform.select({
            ios: focused
              ? require("../assets/icons/ios-star.png")
              : require("../assets/icons/ios-star-outline.png"),
            android: focused
              ? require("../assets/icons/md-star.png")
              : require("../assets/icons/md-star-outline.png")
          });
        }

        // You can return any component that you like here!
        return (
          <Image
            style={{ tintColor, width: 25 }}
            resizeMode="contain"
            source={image}
          />
        );
      }
    })
  }
);

export default createAppContainer(Tabs);
