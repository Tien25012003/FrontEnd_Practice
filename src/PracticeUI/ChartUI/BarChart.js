import {
  View,
  Text,
  Dimensions,
  ScrollView,
  StyleSheet,
  Animated,
  Pressable,
} from 'react-native';
import React, {useRef, useEffect} from 'react';
import Svg, {Line, G, Path, Text as TextSvg} from 'react-native-svg';

const {width: WIDTH_SCREEN, height: HEIGHT_SCREEN} = Dimensions.get('screen');
const BarChart = ({
  height = 400,
  paddingLeft = 50,
  paddingRight = 20,
  paddingTop = 30,
  paddingBottom = 40,
  data,
  axisColor = '#000',
}) => {
  const widthChart = data.length <= 6 ? WIDTH_SCREEN : WIDTH_SCREEN * 2;
  const x1 = paddingLeft;
  const y1 = height - paddingBottom;
  const x2 = widthChart - paddingRight;
  const y2 = height - paddingBottom;
  const x3 = paddingLeft;
  const y3 = paddingTop;
  const gap_Between_yAxis = (y1 - y3) / data?.length;
  const gap_Between_xAxis = (x2 - x1) / data?.length;
  const x2_Animated = useRef(new Animated.Value(x1)).current;
  const y3_Animated = useRef(new Animated.Value(y1)).current;
  const AnimatedLine = Animated.createAnimatedComponent(Line);
  const maxNumber = Math.max(...data.map(item => item.value));
  const gap_Number = maxNumber / data.length;
  const heightBarAnimated = [
    ...data.map(() => useRef(new Animated.Value(y1)).current),
  ];
  //console.log(heightBarAnimated);
  //console.log(y1);
  useEffect(() => {
    Animated.parallel([
      Animated.timing(x2_Animated, {
        toValue: x2,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(y3_Animated, {
        toValue: y3 - 18,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  useEffect(() => {
    data.map((item, index) => {
      const y = y1 - ((y1 - y3) / maxNumber) * item.value;
      Animated.timing(heightBarAnimated[index], {
        toValue: y,
        duration: 1200,
        useNativeDriver: true,
      }).start();
    });
  }, [data]);

  return (
    <View
      style={{
        width: WIDTH_SCREEN,
        height,
        backgroundColor: 'transparent',
        //borderWidth: 1,
        zIndex: 2,
      }}>
      {/* Axis_Y */}
      <View
        style={{
          position: 'absolute',
          backgroundColor: '#fff',
          zIndex: 1,
          ...StyleSheet.absoluteFill,
        }}>
        <Svg>
          <G id="y_Axis">
            <AnimatedLine
              x1={x1}
              y1={y1}
              x2={x3}
              y2={y3_Animated}
              stroke={axisColor}
              strokeWidth="1.5"
            />
            <Path
              d={`M ${x3 - 5} ${y3 - 10} L ${x3} ${y3 - 18} L ${x3 + 5} ${
                y3 - 10
              }`}
              stroke={axisColor}
              strokeWidth="2"
              fill="none"
            />
          </G>
          {/* Ruler & Number*/}
          {[...new Array(data.length + 1)].map((item, index) => {
            const y = y1 - (gap_Between_yAxis - 0) * index;
            return (
              <G key={index}>
                <Line
                  x1={x1 - 3}
                  y1={y}
                  x2={x1 + 3}
                  y2={y}
                  stroke={axisColor}
                  strokeWidth="2"
                  fill="#000"
                />
                <TextSvg
                  textAnchor="end"
                  fontSize={15}
                  x={x1 - 10}
                  y={y + 3}
                  stroke={'none'}
                  fill={axisColor}>
                  {Math.floor(gap_Number * index)}
                </TextSvg>
              </G>
            );
          })}
        </Svg>
      </View>
      <View
        style={{
          width: WIDTH_SCREEN - paddingLeft,
          height,
          backgroundColor: 'transparent',
          //borderWidth: 1,
          zIndex: 3,
          alignSelf: 'flex-end',
        }}>
        {/* Axis_X */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={{
              width: widthChart,
              height,
              marginLeft: -paddingLeft,
            }}>
            <Svg>
              {/* Axis_X */}
              <G id="x_Axis">
                <AnimatedLine
                  x1={x1}
                  y1={y1}
                  x2={x2_Animated}
                  y2={y2}
                  stroke={axisColor}
                  strokeWidth="1.2"
                />
                <Path
                  d={`M ${x2 - 7} ${y2 - 5} L ${x2} ${y2} L${x2 - 7} ${y2 + 5}`}
                  fill="none"
                  strokeWidth={'2'}
                  stroke={axisColor}
                />
              </G>
              {/* Ruler */}
              {[...new Array(data.length + 1)].map((item, index) => {
                const y = y1 - gap_Between_yAxis * index;
                return (
                  <G key={index}>
                    <Line
                      x1={x1 + 10}
                      y1={y}
                      x2={x2}
                      y2={y}
                      stroke="hsl(0,0%,80%)"
                    />
                  </G>
                );
              })}
              {data.map((item, index) => {
                const y = y1 - ((y1 - y3) / maxNumber) * item.value;

                return (
                  <G key={index} onPress={() => console.log('press')}>
                    <AnimatedLine
                      x1={
                        gap_Between_xAxis * index + x1 + gap_Between_xAxis * 0.4
                      }
                      y1={y1}
                      x2={
                        gap_Between_xAxis * index + x1 + gap_Between_xAxis * 0.4
                      }
                      //y2={y}
                      y2={heightBarAnimated[index]}
                      //y2={Animated_Height_Bar(item, index)}
                      fill="red"
                      stroke="red"
                      strokeWidth={gap_Between_xAxis * 0.4}
                    />
                    <TextSvg
                      fontSize={16}
                      fontWeight="600"
                      textAnchor="middle"
                      fill={axisColor}
                      stroke="none"
                      x={
                        gap_Between_xAxis * index + x1 + gap_Between_xAxis * 0.4
                      }
                      y={y1 + 20}>
                      {item.month}
                    </TextSvg>
                    {/* Top Label */}
                    <TextSvg
                      fontSize={16}
                      textAnchor="middle"
                      fill={axisColor}
                      stroke="none"
                      x={
                        gap_Between_xAxis * index + x1 + gap_Between_xAxis * 0.4
                      }
                      y={y - 10}>
                      {item.value}
                    </TextSvg>
                  </G>
                );
              })}
            </Svg>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default BarChart;
