import React from "react";
import { StyleSheet, View } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import MealList from "../components/MealList";
import { useSelector } from "react-redux";
import DefaultText from "../components/DefaultText";

const CategoryMealsScreen = (props) => {
  // catId is passed a parameter from the categoriesscreen when a certian category is pressed
  const catID = props.navigation.getParam("categoryID");
  const availableMeals = useSelector((state) => state.mealsState.filteredMeals);

  // returns the array of meals which match the catergory the user selected
  const displayedMeals = availableMeals.filter(
    (meal) => meal.categoryIds.indexOf(catID) >= 0
  );

  if (displayedMeals.length == 0 || !displayedMeals) {
    return (
      <View style={styles.screen} >
        <DefaultText>
          {"No Meals Found, Please check your filters!"}
        </DefaultText>
      </View>
    );
  }

  return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
  const catID = navigationData.navigation.getParam("categoryID");
  const selectedCat = CATEGORIES.find((cat) => cat.id === catID);

  return {
    headerTitle: selectedCat.title,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoryMealsScreen;
