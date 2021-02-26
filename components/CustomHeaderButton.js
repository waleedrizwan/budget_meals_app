import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import {Platform} from 'react-native' ;

const platformColor = (Platform.OS === 'android' ? 'white' : Colors.primaryColor)

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      { ...props }
      IconComponent={ Ionicons }
      iconSize={ 23 }
      color={ platformColor }
    />
  );
};

export default CustomHeaderButton;
