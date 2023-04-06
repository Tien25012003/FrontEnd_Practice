import {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {Auth} from 'aws-amplify';

const SignIn = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const onSignIn = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const user = await Auth.signIn(userName, password);
      //console.log(user.attributes.email_verified);
      if (user.attributes.email_verified) {
        navigation.navigate('HomeScreen');
      } else {
        Alert.alert('Please verify your email!');
      }
    } catch (error) {
      //console.log(error);
      Alert.alert('Error', error.message);
    }
    setLoading(false);
  };
  //console.log(userName);
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: 'hsl(0,0%,90%)',
        paddingTop: StatusBar.currentHeight,
      }}>
      <ScrollView>
        <Text
          style={{
            textAlign: 'center',
            color: '#4246dc',
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          AWS Learning
        </Text>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 20,
          }}>
          <Image
            style={{
              width: 150,
              height: 150,
            }}
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1280px-Amazon_Web_Services_Logo.svg.png',
            }}
            resizeMode={'contain'}
          />
        </View>
        <View style={styles.row}>
          <TextInput
            style={styles.text_input}
            placeholderTextColor={'hsl(0,0%,80%'}
            placeholder="User Name"
            defaultValue={userName}
            onChangeText={setUserName}
          />

          <TextInput
            style={styles.text_input}
            placeholderTextColor={'hsl(0,0%,80%'}
            placeholder="Password"
            defaultValue={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text
              style={[
                styles.text,
                {
                  textAlign: 'center',
                  color: 'hsl(0,0%,50%)',
                  marginVertical: 15,
                },
              ]}>
              Forgot Password
            </Text>
          </TouchableOpacity>
          {loading && (
            <View
              style={{
                marginVertical: 10,
                alignSelf: 'center',
              }}>
              <ActivityIndicator size="small" color="#0000ff" />
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.text_input,
              styles.btn,
              {
                backgroundColor: '#4246dc',
              },
            ]}
            onPress={onSignIn}>
            <Text style={[styles.text, {color: '#fff', letterSpacing: 1.5}]}>
              Sign In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.text_input,
              styles.btn,
              {
                backgroundColor: '#b2daef',
              },
            ]}>
            <Text style={[styles.text, {color: '#4246dc'}]}>
              Sign in with Facebook
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.text_input,
              styles.btn,
              {
                backgroundColor: '#F8D3CE',
              },
            ]}>
            <Text style={[styles.text, {color: 'red'}]}>
              Sign in with Google
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text
              style={[
                styles.text,
                {textAlign: 'center', color: 'hsl(0,0%,50%)', marginTop: 15},
              ]}>
              Don't have account yet ? Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  text_input: {
    width: '100%',
    paddingHorizontal: 10,
    borderRadius: 5,
    color: '#000',
    backgroundColor: '#fff',
    marginVertical: 5,
  },
  text: {
    color: '#000',
    fontSize: 15,
    fontWeight: '600',
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
});
export default SignIn;
