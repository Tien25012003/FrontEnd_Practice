import {View, Text, StyleSheet, Button} from 'react-native';
import React, {useRef} from 'react';
import Rive, {Fit} from 'rive-react-native';
const Rive_index = () => {
  const riveRef = useRef(null);
  const STATE_MACHINE_NAME = 'State Machine 1';
  const handlePlay = () => {
    riveRef.current?.play();
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <Rive
        resourceName="weather_app"
        // url="https://rive.app/community/3113-6567-weather-app-demo"
        artboardName="proto1"
        stateMachineName={STATE_MACHINE_NAME}
        autoplay={true}
        style={{
          width: 400,
          height: 400,
        }}
        ref={riveRef}
        fit={Fit.Cover}
      />

      <Text>AA</Text>
      <Button title="Play" onPress={handlePlay} />
    </View>
  );
};

const styles = StyleSheet.create({
  riveStyles: {
    flexGrow: 1,
  },
});
export default Rive_index;
