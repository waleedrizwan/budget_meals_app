import { ActionSheetIOS } from "react-native";
import { MEALS } from "../../data/dummy-data";
import { SET_FILTERS, TOGGLE_FAVORITE } from "../actions/meals";

// meals store, maintains state of meals to display to users

// initial state of store
const initialState = {
  // both meals and filtered meals start with all data
  allMeals: MEALS,
  filteredMeals: MEALS,
  // fav meals is empty until the user selects some
  favoriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      // if toggle fav button is pressed and the meal is already in the favorites array, remove it, else add it
      const existingIndex = state.favoriteMeals.findIndex(
        (meal) => meal.id === action.mealID
      );
      if (existingIndex >= 0) {
        const updateFavMeals = [...state.favoriteMeals];
        updateFavMeals.splice(existingIndex, 1);
        return { ...state, favoriteMeals: updateFavMeals };
      } else {
        const meal = state.allMeals.find((meal) => meal.id === action.mealID);
        return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) };
      }

    case SET_FILTERS:
        const appliedFilters = action.filters;
        // remove elements that evaluate to false 
        const filteredMeals = state.allMeals.filter(meal => {
            if (appliedFilters.isLactoseFree && !meal.isLactoseFree){
                return false
            }
            if (appliedFilters.isGlutenFree && !meal.isGlutenFree){
                return false
            }
            if (appliedFilters.isVegetarian && !meal.isVegetarian){
                return false
            }
            if (appliedFilters.isVegan && !meal.isVegan){
                return false
            }
            return true});
        
            return {...state, filteredMeals: filteredMeals   }    


    default:
      return state;
  }

  return state;
};

export default mealsReducer;
