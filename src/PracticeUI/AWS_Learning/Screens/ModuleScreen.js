import {
  View,
  Text,
  ScrollView,
  StatusBar,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import topics from '../../../Assets/Data/topics';
import {DataStore} from 'aws-amplify';
import {Topic} from '../../../models';
import {S3Image} from 'aws-amplify-react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const {width, height} = Dimensions.get('screen');
const ModuleScreen = ({navigation}) => {
  const [DataTopics, setDataTopics] = useState([]);
  useEffect(() => {
    const fetchTopics = async () => {
      await DataStore.query(Topic)
        .then(q => {
          setDataTopics(q);
        })
        .catch(e => console.log(e));
    };
    fetchTopics();
  }, []);
  //console.log(DataTopics);
  return (
    <View
      style={{
        height: height - 100,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#fff',
      }}>
      <ScrollView style={{}}>
        {DataTopics.map((item, _) => {
          return (
            <View key={item.id} style={[styles.view, {paddingVertical: 10}]}>
              <Pressable
                style={[
                  styles.view,
                  {
                    height: 150,
                    width: 150,
                    borderRadius: 100,
                    backgroundColor: '#94e7dd',
                  },
                ]}
                onPress={() =>
                  navigation.navigate('TopicScreen', {id: item.id})
                }>
                {/* <Image
                  style={{height: 80, width: 80}}
                  source={{uri: item.icon}}
                /> */}
                {item.icon ? (
                  <S3Image imgKey={item.icon} style={{height: 80, width: 80}} />
                ) : (
                  <FontAwesome5 name="question" color="#000" size={30} />
                )}
              </Pressable>
              <Text style={[styles.text, {textAlign: 'center', marginTop: 20}]}>
                {item.title}
              </Text>
            </View>
          );
        }).reverse()}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#000',
    fontSize: 15,
    fontWeight: '600',
  },
});
export default ModuleScreen;
