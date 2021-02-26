import React from "react";
import { StyleSheet, View, Text, Switch, Platform } from "react-native";

const FilterSwitch = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text> Gluten-Free </Text>
      <Switch
        trackColor={{ true: Colors.primaryColor }}
        thumbColor={Colors.primaryColor}
        value={glutenSwitch}
        onValueChange={(newValue) => setGlutenSwitch(newValue)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    marginHorizontal: 20,
  },
});

export default FilterSwitch;
