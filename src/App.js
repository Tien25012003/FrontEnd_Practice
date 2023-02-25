import { View, Text, StatusBar } from "react-native";
import React from "react";
import Profile from "./PracticeUI/TabNavigationUI/screens/Profile"
import Home from "./PracticeUI/TabNavigationUI/screens/Home"
import { Provider } from 'react-redux';
import NavigationRoot from "./PracticeUI/TabNavigationUI/NavigationRoot";
import Rocket_Index from "./PracticeUI/RocketUI/Rocket_Index";
import Login_Index from "./PracticeUI/LoginUI/Login_Index";
import Food_Index from "./PracticeUI/FoodDeliveryUI/Food_Index";
import Calculator_Index from "./PracticeUI/CalculatorUI/Calculator_Index";
const App = () => {
  return (
    <>
      {/* <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} translucent /> */}
      {/* <NavigationRoot /> */}
      {/* <Rocket_Index /> */}
      {/* <Login_Index /> */}
      {/* <Food_Index /> */}
      <Calculator_Index />
    </>
  );
};

export default App;
