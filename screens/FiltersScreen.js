import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, Switch, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import { setFilters } from "../store/actions/meals";

const FilterSwitch = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text> {props.title}</Text>
      <Switch
        trackColor={{ true: Colors.primaryColor }}
        thumbColor={Platform.OS === "android" ? Colors.primaryColor : ""}
        value={props.currValue}
        onValueChange={(newValue) => props.onPress(newValue)}
      />
    </View>
  );
};

const FiltersScreen = (props) => {
  // destructure so rebuilds dont run on any props change
  const { navigation } = props;

  // True to indicate switch is on
  const [isGlutenFree, setGlutenSwitch] = useState(false);
  const [isVegetarian, setVegeSwitch] = useState(false);
  const [isVegan, setVegaSwitch] = useState(false);
  const [isLactoseFree, setLactoseSwitch] = useState(false);

  const dispatch = useDispatch();

  // only rebuilds saveFilters function when one of the state values changes
  const saveFilters = useCallback(() => {
    const appliedFilters = {
      isGlutenFree: isGlutenFree,
      isVegetarian: isVegetarian,
      isVegan: isVegan,
      isLactoseFree: isLactoseFree,
    };
    dispatch(setFilters(appliedFilters));
  }, [isGlutenFree, isVegetarian, isVegan, isLactoseFree, dispatch]);

  useEffect(() => {
    navigation.setParams({ save: saveFilters });
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters</Text>
      <FilterSwitch
        currValue={isGlutenFree}
        onPress={setGlutenSwitch}
        title={"Gluten Free"}
      />
      <FilterSwitch
        currValue={isVegetarian}
        onPress={setVegeSwitch}
        title={"Vegetarian"}
      />
      <FilterSwitch
        currValue={isVegan}
        onPress={setVegaSwitch}
        title={"Vegan"}
      />
      <FilterSwitch
        currValue={isLactoseFree}
        onPress={setLactoseSwitch}
        title={"Lactose-Free"}
      />
    </View>
  );
};

// child of Navigation Component, set header styles
FiltersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Apply Filters",
    headerTitleStyle: { alignSelf: "center" },
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Save"
          iconName="ios-save"
          onPress={() => {
            // execute Callback function
            navData.navigation.getParam("save")();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    margin: 20,
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 15,
  },
});

export default FiltersScreen;
