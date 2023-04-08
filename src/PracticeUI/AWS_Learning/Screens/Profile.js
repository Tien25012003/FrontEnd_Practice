import {View, Text, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DataStore} from 'aws-amplify';
import {Exercise} from '../../../models';
import {sortByField} from '@aws-amplify/core';
const Profile = ({navigation}) => {
  useEffect(() => {
    const sub = DataStore.observeQuery(Exercise, e =>
      e.id.eq('3bc31ec1-5df5-409f-95d5-3aeffe711b52'),
    ).subscribe(({items}) => console.log(items));
    return () => sub.unsubscribe();
  }, []);
  const onCreate = async () => {
    await DataStore.save(
      new Exercise({
        title: 'New Exercise about JavaScript',
        topicID: 'bba66671-b838-42eb-bd36-1c0fe8c8cbd7',
      }),
    )
      .then(() => console.log('create successfully'))
      .catch(e => console.log(e));
  };
  const onDelete = async () => {
    const deleteItem = await DataStore.query(
      Exercise,
      '3bc31ec1-5df5-409f-95d5-3aeffe711b52',
    );
    DataStore.delete(deleteItem)
      .then(() => console.log('delete successfully'))
      .catch(e => console.log(e));
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>Profile</Text>
      <Button title="Create new data on local" onPress={onCreate} />
      <Button title="Delete data on local" onPress={onDelete} />
    </View>
  );
};

export default Profile;
