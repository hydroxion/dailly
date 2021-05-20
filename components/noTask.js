import React from "react";

import { View, Text, StyleSheet } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import theme from "../theme";

const NoTask = () => {
  return (
    <View style={styles.container}>
      <MaterialIcons
        name="emoji-flags"
        size={68}
        color={theme.color.black.main}
      />

      <Text style={styles.text}>You don't have any goals</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 32,
  },
  text: {
    color: theme.color.black.main,
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    marginTop: 15,
  },
});

export default NoTask;
