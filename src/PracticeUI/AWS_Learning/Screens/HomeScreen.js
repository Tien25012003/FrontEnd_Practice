import {View, Text, Button, Alert} from 'react-native';
import React from 'react';
import {Auth} from 'aws-amplify';

const HomeScreen = ({navigation}) => {
  const onSignOut = async () => {
    try {
      await Auth.signOut();
      console.log('sign out');
      navigation.navigate('SignIn');
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };
  const onChangePassword = () => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        return Auth.changePassword(user, 'tienphuong2', 'tienphuong');
      })
      .then(data => Alert.alert('Alert!', 'Your password has been changed!'))
      .catch(err => console.log(err));
  };
  const onDeleteUser = async () => {
    try {
      const result = await Auth.deleteUser();
      console.log(result);
    } catch (error) {
      console.log('Error deleting user', error);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
      }}>
      <Button
        title="Go to Sign In"
        onPress={() => navigation.navigate('SignIn')}
      />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <Button title="Sign Out" onPress={onSignOut} />
        <Button title="Change Password" onPress={onChangePassword} />
        <Button title="Delete User" onPress={onDeleteUser} />
        <Button
          title="Go to module screen"
          onPress={() => navigation.navigate('ModuleScreen')}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
