import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";

import CurrentList from "../screens/CurrentList";

const CurrentListStack = createStackNavigator({
  CurrentList: {
    screen: CurrentList,
    navigationOptions: {
      headerTitle: "Current List"
    }
  }
});

const FavoritesStack = createStackNavigator({
  Favorites: {
    screen: () => null,
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
