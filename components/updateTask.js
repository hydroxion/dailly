import React, { useState, useRef } from "react";

import {
  View,
  ScrollView,
  Text,
  ToastAndroid,
  Platform,
  Keyboard,
  Dimensions,
  Animated,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import theme from "../theme";

import { useSettings } from "../contexts/settings";

import { useTasks } from "../contexts/tasks";

import { limitText, capitalize } from "../utils/text";

import {
  schedulePushNotification,
  cancelPushNotification,
} from "../utils/notifications";

import Button from "./button";

import History from "./history";

import Information from "./information";

import Design from "./design";

const messageNewGoal = "Goal updated!";

const UpdateTask = ({ task, navigation }) => {
  const { isDark } = useSettings();

  const { updateTask, findTask } = useTasks();

  const [text, setText] = useState(task.text);

  const [textError, setTextError] = useState(false);

  const [remind, setRemind] = useState(task.remind);

  const [emoji, setEmoji] = useState(task.emoji);

  const [category, setCategory] = useState("Smileys & Emotion");

  const [date, setDate] = useState(
    task.remindTime ? new Date(task.remindTime) : new Date()
  );

  const [showTimePicker, setShowTimePicker] = useState(false);

  const [cardColor, setCardColor] = useState(task.cardColor);

  const [showCardColor, setShowCardColor] = useState(false);

  const [cardFontColor, setCardFontColor] = useState(task.cardFontColor);

  const [showCardFontColor, setShowCardFontColor] = useState(false);

  const [colorError, setColorError] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const slidesReference = useRef();

  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const resetFields = () => {
    Keyboard.dismiss();

    setTextError(false);

    setColorError(false);
  };

  return (
    <View
      style={styles.container}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            isDark ? { color: theme.color.white.main } : {},
          ]}
        >
          Make
        </Text>

        <Text
          style={[
            styles.title,
            isDark ? { color: theme.color.white.main } : {},
          ]}
        >
          your goal
        </Text>

        <Text
          style={[
            styles.title,
            isDark ? { color: theme.color.white.main } : {},
          ]}
        >
          remarkable
        </Text>
      </View>

      <View
        style={[
          styles.containerCards,
          isDark ? { backgroundColor: theme.color.black.main } : {},
        ]}
      >
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ],
            // If set to true the scroll position will be always 0
            { useNativeDriver: false }
          )}
          onViewableItemsChanged={viewableItemsChanged}
          ref={slidesReference}
          pagingEnabled
          scrollEventThrottle={16}
          viewabilityConfig={viewConfig}
          style={styles.cards}
        >
          <ScrollView
            style={styles.card}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.cardInformation}>
              <Text
                style={[
                  styles.cardTitle,
                  isDark
                    ? {
                        color: theme.color.white.main,
                      }
                    : {},
                ]}
              >
                History
              </Text>

              <View style={styles.cardIndicator}>
                <Text
                  style={[
                    styles.cardIndicatorTitle,
                    isDark
                      ? {
                          color: theme.color.white.main,
                        }
                      : {},
                  ]}
                >
                  Scroll
                </Text>

                <Ionicons
                  name="md-arrow-forward"
                  size={24}
                  color={
                    isDark ? theme.color.white.main : theme.color.black.main
                  }
                  style={styles.cardIcon}
                />
              </View>
            </View>

            <History task={task} />
          </ScrollView>

          <ScrollView
            style={styles.card}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.cardInformation}>
              <Text
                style={[
                  styles.cardTitle,
                  isDark
                    ? {
                        color: theme.color.white.main,
                      }
                    : {},
                ]}
              >
                Information
              </Text>
            </View>

            <Information
              text={text}
              setText={setText}
              textError={textError}
              setTextError={setTextError}
              remind={remind}
              setRemind={setRemind}
              date={date}
              setDate={setDate}
              showTimePicker={showTimePicker}
              setShowTimePicker={setShowTimePicker}
            />
          </ScrollView>

          <ScrollView
            style={styles.card}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.cardInformation}>
              <Text
                style={[
                  styles.cardTitle,
                  isDark ? { color: theme.color.white.main } : {},
                ]}
              >
                Style
              </Text>
            </View>

            <Design
              category={category}
              setCategory={setCategory}
              emoji={emoji}
              setEmoji={setEmoji}
              cardColor={cardColor}
              setCardColor={setCardColor}
              showCardColor={showCardColor}
              setShowCardColor={setShowCardColor}
              cardFontColor={cardFontColor}
              setCardFontColor={setCardFontColor}
              showCardFontColor={showCardFontColor}
              setShowCardFontColor={setShowCardFontColor}
              colorError={colorError}
            />
          </ScrollView>
        </ScrollView>

        <View style={styles.rowButton}>
          <Button
            onPress={async () => {
              if (!text) {
                setTextError(true);

                return;
              }

              if (cardColor === cardFontColor) {
                setColorError(true);

                return;
              }

              let identifier;

              const _task = await findTask(task.id);

              if (_task.identifier)
                await cancelPushNotification(_task.identifier);

              if (remind) {
                identifier = await schedulePushNotification(
                  {
                    title: `Check your goal ${emoji.emoji ? emoji.emoji : ""}`,
                    body: capitalize(limitText(text, 34)),
                    vibrate: true,
                  },
                  {
                    hour: date.getHours(),
                    minute: date.getMinutes(),
                    repeats: true,
                  }
                );
              }

              updateTask(task.id, {
                id: task.id,
                text: text.trim(),
                remind,
                ...(remind ? { identifier } : {}),
                ...(remind ? { remindTime: date.getTime() } : {}),
                completed: task.completed,
                emoji,
                createdAt: task.createdAt,
                cardColor,
                cardFontColor,
              });

              if (Platform.OS === "android")
                ToastAndroid.show(messageNewGoal, ToastAndroid.SHORT);

              resetFields();

              if (navigation.canGoBack()) navigation.goBack();
            }}
            text="Update goal"
            style={isDark ? { backgroundColor: theme.color.black.light } : {}}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 8,
    paddingLeft: 32,
  },
  header: {
    justifyContent: "center",
    flex: 0.25,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 40,
    color: theme.color.black.main,
  },
  containerCards: {
    flex: 0.75,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "space-evenly",
    marginBottom: 16,
    backgroundColor: theme.color.white.main,
  },
  cards: {},
  card: {
    paddingTop: 38,
    height: "100%",
    width: Dimensions.get("window").width - 64,
    marginRight: 32,
    marginBottom: 16,
  },
  cardInformation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  cardTitle: {
    fontFamily: "Inter_500Medium",
    fontSize: 20,
    color: theme.color.black.main,
  },
  cardIndicator: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardIndicatorTitle: {
    marginRight: 8,
    fontFamily: "Inter_300Light",
    fontSize: 16,
    color: theme.color.black.main,
  },
  cardIcon: {},
  rowButton: {
    height: 45,
    marginRight: 32,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 5,
    backgroundColor: theme.color.black.main,
  },
  buttonText: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: theme.color.white.main,
  },
});

export default UpdateTask;
