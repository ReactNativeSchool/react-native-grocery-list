import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity
} from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
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
  }
});

export const Separator = () => <View style={styles.separator} />;

const isAndroid = Platform.OS === "android";

const ListItem = ({ name, showStar = true, onFavoritePress = () => {} }) => {
  const starIcon = isAndroid
    ? require("../assets/icons/md-star-outline.png")
    : require("../assets/icons/ios-star-outline.png");

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      {showStar && (
        <TouchableOpacity onPress={onFavoritePress}>
          <Image source={starIcon} style={styles.icon} resizeMode="contain" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ListItem;
