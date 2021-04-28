import React, { useState } from "react";

import { Dimensions, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Animated } from "react-native";

import theme from "../theme";

import { useTasks } from "../contexts/tasks";

import Header from "../components/header";

import Tasks from "../components/tasks";

import NoTask from "../components/noTask";

import NewTaskButton from "../components/newTaskButton";

import NewTask from "../components/newTask";

const TasksScreen = () => {
  const { tasks } = useTasks();

  const newTaskTranslateY = useState(
    new Animated.Value(Dimensions.get("window").height)
  )[0];

  const showNewTask = () =>
    Animated.timing(newTaskTranslateY, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    }).start();

  const hideNewTask = () =>
    Animated.timing(newTaskTranslateY, {
      toValue: Dimensions.get("window").height,
      duration: 350,
      useNativeDriver: true,
    }).start();

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      {tasks.length ? <Tasks /> : <NoTask />}

      <NewTask
        newTaskTranslateY={newTaskTranslateY}
        hideNewTask={hideNewTask}
      />

      <NewTaskButton showNewTask={showNewTask} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 8,
    backgroundColor: theme.color.white.main,
  },
});

export default TasksScreen;
