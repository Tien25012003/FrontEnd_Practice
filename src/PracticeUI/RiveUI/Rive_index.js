import {View, Text, Button} from 'react-native';
import React from 'react';
import Rive, {RiveRef, Fit} from 'rive-react-native';
import {useRef} from 'react';

const Rive_index = () => {
  const riveRef = useRef(null);
  const handlePlay = () => {
    riveRef.current?.play();
  };
  const STATE_MACHINE_NAME = 'State Machine 1';
  console.log(riveRef.current);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <Rive
        resourceName="weather_app"
        //url="https://rive.app/community/3113-6567-weather-app-demo"
        artboardName="proto2"
        stateMachineName={'State Machine 1'}
        autoplay={true}
        style={{
          width: 400,
          height: 400,
        }}
        ref={riveRef}
        fit={Fit.Cover}
      />
      {/* <Rive ref={riveRef} resourceName={resourceName} autoplay={false} /> */}
      <Button onPress={handlePlay} title="Play"></Button>
    </View>
  );
};

export default Rive_index;
