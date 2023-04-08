import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';
import {DataStore} from 'aws-amplify';
import {QuizQuestion} from '../../../models';
import {useCallback} from 'react';
import {S3Image} from 'aws-amplify-react-native';
const QuizScreen = ({navigation, route}) => {
  const [quizData, setQuizData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const getQuizeData = async () => {
      const quizId = route?.params?.id;
      await DataStore.query(QuizQuestion, q => q.quizID.eq(quizId)).then(data =>
        setQuizData([...data]),
      );
    };
    getQuizeData();
  }, []);
  //console.log(quizData);
  const onSubmit = useCallback(() => {
    if (currentIndex === 0) setCurrentIndex(1);
    else setCurrentIndex(0);
  }, [currentIndex]);
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" color="#000" size={30} />
        </TouchableOpacity>
        <Text
          style={{
            color: '#000',
            marginLeft: 20,
            fontSize: 20,
            fontWeight: '600',
          }}>
          Quiz
        </Text>
      </View>
      {/* Quiz */}
      <View
        style={{
          paddingHorizontal: 10,
        }}>
        <Text style={{color: '#000', fontSize: 20, fontWeight: '700'}}>
          {quizData[currentIndex]?.question}
        </Text>
        <View
          style={{
            alignSelf: 'center',
          }}>
          {quizData[currentIndex]?.image && (
            <S3Image
              imgKey={quizData[currentIndex].image}
              style={{height: 300, width: 300}}
              resizeMode={'contain'}
            />
          )}
        </View>
        <Text style={{color: '#000', fontSize: 20, fontWeight: '700'}}>
          {quizData[currentIndex]?.content}
        </Text>
      </View>
      {quizData[currentIndex]?.choices.map((choice, index) => (
        <TouchableOpacity
          style={{
            marginHorizontal: 10,
            marginTop: 10,
            borderWidth: 1,
            borderColor: '#000',
            alignItems: 'center',
            paddingVertical: 10,
            borderRadius: 10,
          }}
          key={index}>
          <Text style={styles.text}>{choice}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={{
          width: '70%',
          alignSelf: 'center',
          backgroundColor: 'grey',
          borderRadius: 10,
          paddingVertical: 10,
          marginTop: 20,
        }}
        onPress={onSubmit}>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            textAlign: 'center',
            fontWeight: '500',
          }}>
          Submit
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
export default QuizScreen;
