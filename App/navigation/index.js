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

const Tabs = createBottomTabNavigator({
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
});

export default createAppContainer(Tabs);
