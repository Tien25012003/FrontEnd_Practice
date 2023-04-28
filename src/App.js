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
import ScrollAnimated from './PracticeUI/AnimatedUI/ScrollAnimated';
import RotateUI from './PracticeUI/AnimatedUI/RotateUI';
import Carousel from './PracticeUI/AnimatedUI/Carousel';
import WaterWave from './PracticeUI/AnimatedUI/WaterWave';
import Draft from './Draft';
import PhoneRing from './PracticeUI/AnimatedUI/PhoneRing';
import Rive_index from './PracticeUI/RiveUI/Rive_index';
import Rive, {Fit} from 'rive-react-native';
import CalendarReno from './PracticeUI/CalendarReno/CalendarReno';
import DataConfig from './PracticeUI/CalendarReno/DataConfig';
import WaterDrop from './PracticeUI/AnimatedUI/WaterDrop';
import Index_Calendar from './PracticeUI/CalendarReno/Index_Calendar';
import CalendarNumber from './PracticeUI/CalendarReno/CalendarNumber';
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

      {/* <RotateUI /> */}
      {/* <ScrollAnimated /> */}
      {/* <Carousel /> */}
      {/* <WaterWave /> */}
      {/* <Draft /> */}
      {/* <PhoneRing /> */}
      {/* <Rive_index /> */}
      {/* <Rive
        resourceName="weather_app"
        //url="https://rive.app/community/3113-6567-weather-app-demo"
        artboardName="proto1"
        stateMachineName={'State Machine 1'}
        autoplay={true}
        style={{
          width: 400,
          height: 400,
        }}
        fit={Fit.Contain}
      />
      <Text>AAA</Text> */}
      {/* <CalendarReno /> */}
      {/* <DataConfig /> */}
      <Index_Calendar />
      {/* <WaterDrop /> */}
    </>
  );
};

export default App;
