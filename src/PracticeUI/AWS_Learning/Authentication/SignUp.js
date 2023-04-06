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
  Alert,
} from 'react-native';
import React from 'react';
import 'core-js/full/symbol/async-iterator';
import {Auth} from 'aws-amplify';
const SignUp = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetPassword, setResetPassword] = useState('');
  const onSignUp = async () => {
    if (userName !== '' && password !== '' && email !== '') {
      try {
        const {user} = await Auth.signUp({
          username: userName,
          password,
          attributes: {
            email,
            name: userName,
          },
          autoSignIn: {
            enabled: false,
          },
        });
        //console.log(user);
        navigation.navigate('ConfirmEmail', {userName});
      } catch (e) {
        Alert.alert('Alert', e.message);
      }
    }
  };
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
          Create an account
        </Text>
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
            placeholder="Email"
            defaultValue={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.text_input}
            placeholderTextColor={'hsl(0,0%,80%'}
            placeholder="Password"
            defaultValue={password}
            onChangeText={setPassword}
          />
          {/* <TextInput
            style={styles.text_input}
            placeholderTextColor={'hsl(0,0%,80%'}
            placeholder="Reset Password"
            defaultValue={resetPassword}
            onChangeText={setResetPassword}
          /> */}
          <TouchableOpacity
            style={[
              styles.text_input,
              styles.btn,
              {
                backgroundColor: '#4246dc',
              },
            ]}
            onPress={onSignUp}>
            <Text style={[styles.text, {color: '#fff', letterSpacing: 1.5}]}>
              Regiter
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              color: 'hsl(0,0%,50%)',
              marginVertical: 10,
            }}>
            By registering, you confirm that you accept our
            <Text
              style={{
                color: 'orange',
              }}>
              Terms of Use
            </Text>
            <Text>{'\t'}and</Text>
            <Text
              style={{
                color: 'orange',
              }}>
              {'\t'}Privacy Policy
            </Text>
          </Text>
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
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text
              style={[
                styles.text,
                {textAlign: 'center', color: 'hsl(0,0%,50%)', marginTop: 15},
              ]}>
              Have an account ? Sign In
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
export default SignUp;
