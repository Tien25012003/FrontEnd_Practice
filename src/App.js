import { View, Text, StatusBar } from "react-native";
import React from "react";

const App = () => {
  return (
    <View>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} translucent />
      <Text>App</Text>
    </View>
  );
};

export default App;
