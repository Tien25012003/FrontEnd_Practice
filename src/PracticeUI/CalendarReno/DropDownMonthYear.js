import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const DropDownMonthYear = ({
  width,
  height,
  open,
  setOpen,
  currentDate,
  setCurrentDate,
  DataMonth,
  onPress,
  onMonth,
}) => {
  const currentYear = currentDate.getFullYear();
  const [DataYear, setDataYear] = useState([
    currentYear,
    currentYear + 1,
    currentYear + 2,
    currentYear + 3,
    currentYear + 4,
    currentYear + 5,
  ]);
  const onScrollBottom = () => {
    let tmpArray = [...DataYear];
    tmpArray.push(DataYear[DataYear.length - 1] + 1);
    setDataYear([...tmpArray]);
  };
  useEffect(() => {
    if (open === false) {
      setDataYear([
        currentYear,
        currentYear + 1,
        currentYear + 2,
        currentYear + 3,
        currentYear + 4,
        currentYear + 5,
      ]);
    }
  }, [open]);

  return (
    <View
      style={{
        justifyContent: 'flex-start',
        width,
      }}>
      <Pressable
        style={{
          width,
          height,
          paddingHorizontal: 10,
        }}
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setOpen(!open);
        }}>
        <Text style={styles.title}>
          {DataMonth[currentDate.getMonth()]}
          {'\t\t'}
          {currentDate.getFullYear()}
        </Text>
      </Pressable>
      {open && (
        <View style={[styles.scroll_container]}>
          <ScrollView
            style={{
              height: height * 3,
            }}
            showsVerticalScrollIndicator={false}
            snapToInterval={height}>
            {DataMonth.map((item, index) => {
              return (
                <Pressable
                  style={[styles.item_press, {height}]}
                  key={index}
                  onPress={() => onMonth(index)}>
                  <Text style={styles.text} adjustsFontSizeToFit>
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
          <ScrollView
            style={{
              height: height * 3,
            }}
            onMomentumScrollEnd={onScrollBottom}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={true}
            snapToInterval={height}>
            {DataYear.map((item, index) => {
              return (
                <Pressable
                  style={[styles.item_press, {height}]}
                  key={index}
                  onPress={() => onPress(item)}>
                  <Text style={styles.text}>{item}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    color: '#000',
    fontSize: 15,
  },
  title: {
    color: '#000',
    fontSize: 17,
    textAlign: 'center',
  },
  scroll_container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
  },
  item_press: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default React.memo(DropDownMonthYear);
