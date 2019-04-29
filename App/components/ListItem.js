import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  Animated
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  text: {
    fontSize: 18,
    color: "#696969"
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)"
  },
  icon: {
    tintColor: "#696969",
    height: 30
  },

  leftAction: {
    flex: 1,
    backgroundColor: "#388e3c",
    justifyContent: "center"
  },
  rightAction: {
    flex: 1,
    backgroundColor: "#dd2c00",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
    padding: 20
  }
});

const LeftActions = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: "clamp"
  });
  return (
    <View style={styles.leftAction}>
      <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
        Add to Cart
      </Animated.Text>
    </View>
  );
};

const RightActions = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: "clamp"
  });
  return (
    <View style={styles.rightAction}>
      <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
        Delete
      </Animated.Text>
    </View>
  );
};

export const Separator = () => <View style={styles.separator} />;

const ListItem = ({
  name,
  isFavorite,
  onFavoritePress,
  onAddedSwipe,
  onRemoveSwipe
}) => {
  let starIcon;

  if (isFavorite) {
    starIcon = Platform.select({
      android: require("../assets/icons/md-star.png"),
      ios: require("../assets/icons/ios-star.png")
    });
  } else {
    starIcon = Platform.select({
      android: require("../assets/icons/md-star-outline.png"),
      ios: require("../assets/icons/ios-star-outline.png")
    });
  }

  return (
    <Swipeable
      renderLeftActions={onAddedSwipe && LeftActions}
      renderRightActions={onRemoveSwipe && RightActions}
      onSwipeableLeftOpen={onAddedSwipe}
      onSwipeableRightOpen={onRemoveSwipe}
    >
      <View style={styles.container}>
        <Text style={styles.text}>{name}</Text>
        {onFavoritePress && (
          <TouchableOpacity onPress={onFavoritePress}>
            <Image source={starIcon} style={styles.icon} resizeMode="contain" />
          </TouchableOpacity>
        )}
      </View>
    </Swipeable>
  );
};

export default ListItem;
