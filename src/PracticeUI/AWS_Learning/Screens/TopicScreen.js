import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DataStore} from 'aws-amplify';
import {Topic} from '../../../models';
import {Resource} from '../../../models';
import {Exercise} from '../../../models';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Data} from 'victory-core';
const TopicScreen = ({navigation, route}) => {
  const topicId = route.params.id;
  const [topic, setTopic] = useState({});
  const [exercise, setExercise] = useState([]);
  const [resource, setResource] = useState([]);
  useEffect(() => {
    const getData = async () => {
      await DataStore.query(Topic, topicId)
        .then(q => setTopic(q))
        .catch(e => console.log(e));
      const tmp = await DataStore.query(Topic, topicId);
      let exerciseTmp = [];
      for await (const e of tmp.Exercises) {
        exerciseTmp.push(e);
      }
      setExercise([...exerciseTmp]);
      await DataStore.query(Resource, c => c.topicID.eq(topicId))
        .then(data => setResource(data))
        .catch(e => console(e));
    };
    getData();
  }, [topicId]);
  console.log(exercise);
  //console.log(topic);
  const onStartQuiz = () => {
    navigation.navigate('QuizScreen', {id: topic.topicQuizId});
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 30,
      }}>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 20,
          marginVertical: 20,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('ModuleScreen')}>
          <Ionicons name="arrow-back" color="#000" size={30} />
        </TouchableOpacity>
        <Text
          style={{
            color: '#000',
            marginLeft: 20,
            fontSize: 20,
            fontWeight: '600',
          }}>
          {topic?.title}
        </Text>
      </View>
      {topic && (
        <View
          style={{
            paddingHorizontal: 10,
          }}>
          <Text
            style={{
              color: '#000',
              fontSize: 20,
              fontWeight: '600',
            }}>
            Intro
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 15,
              fontWeight: '500',
            }}>
            {topic.description}
          </Text>
        </View>
      )}
      <Text
        style={{
          color: '#000',
          marginHorizontal: 10,
          fontSize: 20,
          fontWeight: '600',
        }}>
        Resource
      </Text>
      {resource?.map((item, index) => {
        return (
          <View style={styles.row} key={index}>
            <Text style={styles.text}>{item.title}</Text>
          </View>
        );
      })}
      <Text
        style={{
          color: '#000',
          marginHorizontal: 10,
          fontSize: 20,
          fontWeight: '600',
        }}>
        Exercise
      </Text>
      {exercise?.map((item, index) => {
        return (
          <View style={styles.row} key={index}>
            <Text style={styles.text}>{item.title}</Text>
          </View>
        );
      })}

      <TouchableOpacity
        style={{
          width: '70%',
          alignSelf: 'center',
          backgroundColor: '#43de6e',
          borderRadius: 10,
          paddingVertical: 10,
          marginTop: 20,
        }}
        onPress={onStartQuiz}>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            textAlign: 'center',
            fontWeight: '500',
          }}>
          Start quiz
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  text: {
    color: '#000',
    fontSize: 16,
  },
});
export default TopicScreen;
