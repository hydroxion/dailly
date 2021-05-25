import React, { useRef } from "react";

import { Animated, StyleSheet } from "react-native";

import { useTasks } from "../contexts/tasks";

import { useSettings } from "../contexts/settings";

import Task from "./task";

const Tasks = ({ navigation }) => {
  const { tasks } = useTasks();

  const { settings } = useSettings();

  const scrollY = useRef(new Animated.Value(0)).current;

  const renderItem = ({ item, index }) => (
    <Task task={item} index={index} scrollY={scrollY} navigation={navigation} />
  );

  const today = new Date().toLocaleDateString();

  return (
    <Animated.FlatList
      data={tasks.filter((task) => !task.completed[today] || settings.history)}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.id}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      bounces={false}
      maxToRenderPerBatch={4}
      onScroll={Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: { y: scrollY },
            },
          },
        ],
        { useNativeDriver: true }
      )}
      style={styles.flatList}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    width: "95%",
  },
});

export default Tasks;
