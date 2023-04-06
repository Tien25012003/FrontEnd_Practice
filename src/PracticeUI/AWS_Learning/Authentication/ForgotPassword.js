import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {Auth} from 'aws-amplify';
const ForgotPassword = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const onSend = async () => {
    if (userName !== '') {
      await Auth.forgotPassword(userName)
        .then(() =>
          Alert.alert('Alert', 'Code is sent! Please enter your new password'),
        )
        .catch(e => console.log(e));
    }
  };
  const onSubmit = async () => {
    await Auth.forgotPasswordSubmit(userName, code, newPassword)
      .then(() => {
        Alert.alert('Alert!', 'Your password has been change!');
        navigation.navigate('HomeScreen');
      })
      .catch(err => console.log(err));
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
          Confirm your email
        </Text>
        <View style={styles.row}>
          <TextInput
            style={styles.text_input}
            placeholderTextColor={'hsl(0,0%,80%'}
            placeholder="User Name"
            defaultValue={userName}
            onChangeText={setUserName}
          />

          <TouchableOpacity
            style={[
              styles.text_input,
              styles.btn,
              {
                backgroundColor: '#4246dc',
              },
            ]}
            onPress={onSend}>
            <Text style={[styles.text, {color: '#fff', letterSpacing: 1.5}]}>
              Send
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text
              style={[
                styles.text,
                {textAlign: 'center', color: 'hsl(0,0%,50%)', marginTop: 15},
              ]}>
              Back to Sign In
            </Text>
          </TouchableOpacity>
          <TextInput
            style={styles.text_input}
            placeholderTextColor={'hsl(0,0%,80%'}
            placeholder="Code"
            defaultValue={code}
            onChangeText={setCode}
          />
          <TextInput
            style={styles.text_input}
            placeholderTextColor={'hsl(0,0%,80%'}
            placeholder="New Password"
            defaultValue={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity
            style={[
              styles.text_input,
              styles.btn,
              {
                backgroundColor: '#4246dc',
              },
            ]}
            onPress={onSubmit}>
            <Text style={[styles.text, {color: '#fff', letterSpacing: 1.5}]}>
              Submit
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
export default ForgotPassword;
