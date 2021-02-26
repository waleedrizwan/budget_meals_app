import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";
import CategoryMealsScreen from "./CategoryMealsScreen";
import { CATEGORIES } from "../data/dummy-data";
import Colors from "../constants/Colors";
import GridTile from "../components/GridTile";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";

const CategoriesScreen = (props) => {
  const navigationHandlers = (route, params) => {};
  const renderGridItem = (itemData) => {
    return (
      <GridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() =>
          props.navigation.navigate({
            routeName: "CategoryMeals",
            params: {
              categoryID: itemData.item.id,
            },
          })
        }
      />
    );
  };

  return (
    <FlatList
      keyExtractor={(item, index) => item.id}
      data={CATEGORIES}
      renderItem={renderGridItem}
      numColumns={2}
    />
  );
};

// child of Navigation Component, set header styles
CategoriesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Dish Categories",
    headerTitleStyle: { alignSelf: "center" },
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="Menu" iconName="ios-menu" onPress={() => {
          navData.navigation.toggleDrawer();
        }} />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gridItem: {
    flex: 1,
    margin: 15,
    alignItems: "center",
    height: 150,
  },
});

export default CategoriesScreen;
