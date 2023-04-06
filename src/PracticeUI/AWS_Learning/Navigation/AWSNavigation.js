import {View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../Authentication/SignIn';
import SignUp from '../Authentication/SignUp';
import HomeScreen from '../Screens/HomeScreen';
import ConfirmEmail from '../Authentication/ConfirmEmail';
import ForgotPassword from '../Authentication/ForgotPassword';
import {Auth, Hub} from 'aws-amplify';
const Stack = createStackNavigator();
const AWSNavigation = () => {
  // const [user, setUser] = useState(undefined);
  // const checkUser = async () => {
  //   try {
  //     const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
  //     setUser(authUser);
  //   } catch (e) {
  //     console.log(e.message);
  //     setUser(null);
  //   }
  // };
  // useEffect(() => {
  //   checkUser();
  // }, []);
  // const listener = data => {
  //   if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
  //     checkUser();
  //   }
  // };
  // Hub.listen('auth', listener);

  // if (user === undefined) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //       }}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="SignIn">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AWSNavigation;
