import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Auth} from 'aws-amplify';
const ConfirmEmail = ({navigation, route}) => {
  const [userName, setUserName] = useState('');
  const [code, setCode] = useState('');
  useEffect(() => {
    setUserName(route?.params?.userName);
  }, []);
  const onConfirm = async () => {
    if (code !== '') {
      try {
        await Auth.confirmSignUp(userName, code);
        //console.log('sign up successfully');
        navigation.navigate('HomeScreen');
      } catch (e) {
        Alert.alert(e.message);
      }
    }
  };
  const onResendCode = async () => {
    try {
      await Auth.resendSignUp(userName);
      Alert.alert('Notice!', 'Code has been resend!');
    } catch (e) {
      Alert.alert('Error', e, message);
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
          <TextInput
            style={styles.text_input}
            placeholderTextColor={'hsl(0,0%,80%'}
            placeholder="Enter your confirmation code"
            defaultValue={code}
            onChangeText={setCode}
          />
          <TouchableOpacity
            style={[
              styles.text_input,
              styles.btn,
              {
                backgroundColor: '#4246dc',
              },
            ]}
            onPress={onConfirm}>
            <Text style={[styles.text, {color: '#fff', letterSpacing: 1.5}]}>
              Confirm
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.text_input,
              styles.btn,
              {
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: '#4246dc',
              },
            ]}
            onPress={onResendCode}>
            <Text style={[styles.text, {color: '#4246dc'}]}>Resend code</Text>
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
export default ConfirmEmail;
