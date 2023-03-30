import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import Profile from './PracticeUI/TabNavigationUI/screens/Profile';
import Home from './PracticeUI/TabNavigationUI/screens/Home';
import {Provider} from 'react-redux';
import NavigationRoot from './PracticeUI/TabNavigationUI/NavigationRoot';
import Rocket_Index from './PracticeUI/RocketUI/Rocket_Index';
import Login_Index from './PracticeUI/LoginUI/Login_Index';
import Food_Index from './PracticeUI/FoodDeliveryUI/Food_Index';
import Calculator_Index from './PracticeUI/CalculatorUI/Calculator_Index';
import ColorCard_Index from './PracticeUI/ColorCard/ColorCard_Index';
import Charging from './PracticeUI/RNSkia/Tesla_Skia/Charging';
import NavigationBottom from './PracticeUI/RNSkia/Tesla_Skia/NavigationBottom';
import Copilot_Index from './PracticeUI/CopilotUI/Copilot_Index';
import BarChart from './PracticeUI/ChartUI/BarChart';
const App = () => {
  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
        translucent
      />
      {/* <NavigationRoot /> */}
      {/* <Rocket_Index /> */}
      {/* <Login_Index /> */}
      {/* <Food_Index /> */}
      {/* <Calculator_Index /> */}
      {/* <ColorCard_Index /> */}
      {/* <Charging /> */}
      {/* <NavigationBottom /> */}
      {/* <Copilot_Index /> */}
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
        }}>
        <BarChart
          data={[
            {month: 'Jan', value: 500},
            {month: 'Feb', value: 400},
            {month: 'Mar', value: 600},
            {month: 'Apr', value: 240},
            {month: 'Jun', value: 600},
            {month: 'Jul', value: 700},
            {month: 'Aug', value: 600},
          ]}
        />
      </View>
    </>
  );
};

export default App;
