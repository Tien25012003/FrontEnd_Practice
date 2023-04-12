import {View, Text, StatusBar, Button} from 'react-native';
import React, {useState} from 'react';
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
import Calendar_Index from './PracticeUI/CalendarUI/Calendar_Index';
import moment from 'moment/moment';
import FunnyScroll from './PracticeUI/FunnyScrollView/FunnyScroll';

const App = () => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
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
      {/* <SignUp /> */}
      {/* <SignIn /> */}
      {/* <ForgotPassword /> */}
      {/* <ConfirmEmail /> */}
      <FunnyScroll />
      {/* <HomeScreen /> */}
      {/* <ModuleScreen /> */}
    </>
  );
};

//export default withAuthenticator(App, {signUpConfig, theme: customTheme});
export default App;
