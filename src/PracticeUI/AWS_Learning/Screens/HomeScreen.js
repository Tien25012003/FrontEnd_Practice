import {View, Text, Button, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Auth, API, graphqlOperation, Hub} from 'aws-amplify';
import {listTopics} from '../../../graphql/queries';
import {DataStore, syncExpression} from 'aws-amplify';
import {Exercise, Topic} from '../../../models';

const HomeScreen = ({navigation}) => {
  const [localData, setLocalData] = useState(null);
  // useEffect(() => {
  //   DataStore.configure({
  //     syncExpressions: [
  //       syncExpression(Exercise, () => {
  //         return data => data.title.eq('Exercises update');
  //       }),
  //     ],
  //   });
  // }, []);
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
  const onFetchData = async () => {
    const topic = await API.graphql(graphqlOperation(listTopics));
    console.log('API', topic.data.listTopics.items);
  };
  const fetchDataStore = async () => {
    await DataStore.query(Topic)
      .then(q => {
        console.log('DataStore', q);
      })
      .catch(e => console.log(e));
  };
  const clearDataStore = async () => {
    await DataStore.clear();
  };
  // Hub.listen('auth', async data => {
  //   if (data.payload.event === 'signOut') {
  //     await DataStore.clear().then(() => console.log('clear data store'));
  //   }
  // });
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
        <Button title="Fetch Data From the API" onPress={onFetchData} />
        <Button title="Fetch Data From DataStore" onPress={fetchDataStore} />
        <Button title="Clear DataStore" onPress={clearDataStore} />
      </View>
    </View>
  );
};

export default HomeScreen;
