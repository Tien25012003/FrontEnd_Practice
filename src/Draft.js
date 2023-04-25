import {View, Text, TextInput, Button} from 'react-native';
import React, {useState, useCallback} from 'react';
const Draft = () => {
  const [text, setText] = useState('');
  const [saveMoney, setSaveMoney] = useState(0);
  const MoneyFormat = useCallback(
    money => {
      money = money.split('.').join('');
      money = money.split('');
      for (let i = money.length - 1; i > 0; i--) {
        if (i % 3 === 0) {
          money.splice(-i, 0, '.');
        }
      }
      money = money.join('');
      setText(money);
    },
    [text],
  );
  const CovertMoneyToNumber = money => {
    money = money.split('.').join('');
    return +money;
    //return +money;
  };
  const onDone = () => {
    setSaveMoney(CovertMoneyToNumber(text));
    setText('');
  };
  console.log(saveMoney);
  //console.log(text);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TextInput
        style={{width: '80%', borderWidth: 1}}
        defaultValue={text}
        onChangeText={value => MoneyFormat(value)}
        keyboardType="numeric"
      />
      <Button title="Done" onPress={onDone} />
    </View>
  );
};

export default Draft;
