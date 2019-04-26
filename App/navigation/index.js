import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";

import CurrentList from "../screens/CurrentList";
import FavoritesList from "../screens/FavoritesList";

const CurrentListStack = createStackNavigator({
  CurrentList: {
    screen: CurrentList,
    navigationOptions: {
      headerTitle: "Shopping List"
    }
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
