import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import MealItem from "../components/MealItem";
import { useSelector } from "react-redux";

const MealList = (props) => {
  // state containing all current favorite meals
  const favoriteMeals = useSelector((state) => state.mealsState.favoriteMeals);
  // describes how FlatList items are rendered to user
  const renderMealItem = (itemData) => {
    // returns true if item is member of favoriteMeals var
    const isFavorite = favoriteMeals.some(
      (meal) => meal.id === itemData.item.id
    );
    return (
      <MealItem
        duration={itemData.item.duration}
        title={itemData.item.title}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        onSelectedMeal={() => {
          props.navigation.navigate({
            routeName: "MealDetail",
            params: {
              mealID: itemData.item.id,
              mealTitle: itemData.item.title,
              isFav: isFavorite,
            },
          });
        }}
        image={itemData.item.imageUrl}
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        data={props.listData}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
        style={{ width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MealList;
