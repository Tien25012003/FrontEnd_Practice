import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Dimensions,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Svg, {Rect, Defs, ClipPath, Path} from 'react-native-svg';
const {width: WIDTH_SCREEN, height: HEIGHT_SCREEN} = Dimensions.get('screen');
const DataIcon = [
  'person-circle-outline',
  'game-controller',
  'globe',
  'navigate-circle-outline',
  'rainy',
];
//console.log(WIDTH_SCREEN, HEIGHT_SCREEN);
const Copilot_Index = () => {
  const STEP_LIST = ['header', 'image', 'tab'];
  const [showClipShape, setShowClipShape] = useState(false);
  const [selectedClipPath, setSelectedClipPath] = useState('header');
  const [clipShape, setClipShape] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [clipImage, setClipImage] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [clipTab, setClipTab] = useState([]);
  //let clip;
  //console.log(clip);
  //console.log(clipShape);
  const handleLayout = e => {
    setClipShape(e.nativeEvent.layout);
  };
  const handleLayoutImage = e => {
    setClipImage(e.nativeEvent.layout);
  };
  const handleLayoutTab = e => {
    // let imageObject = {
    //   x: e.nativeEvent.x,
    //   y: e.nativeEvent.y,
    //   width: e.nativeEvent.width,
    //   height: e.nativeEvent.height,
    // };
    setClipTab([...clipTab, e.nativeEvent.layout]);
  };
  const handleOnPress = () => {
    if (selectedClipPath === 'header') {
      setSelectedClipPath('image');
    }
    if (selectedClipPath === 'image') {
      setSelectedClipPath('tab');
    }
  };
  //console.log(clipTab[0]);
  //console.log(clipImage);
  //useEffect(() => handleLayout, []);
  //console.log(clipShape);
  //console.log(selectedClipPath);
  //console.log(clipTab.length);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        //paddingTop: -10,
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 50,
        }}>
        <View
          style={{
            width: '70%',
          }}
          onLayout={handleLayout}>
          <Text
            style={{
              color: '#000',
              fontSize: 20,
              fontWeight: '500',
              textAlign: 'center',
              marginBottom: 30,
            }}>
            Welcome to the demo of "React Native Copilot"
          </Text>
        </View>

        <Image
          source={{
            uri: 'https://news.itsfoss.com/content/images/size/w1304/wordpress/2022/06/github-copilot.jpg',
          }}
          style={{
            width: 150,
            height: 150,
            borderRadius: 150,
          }}
          onLayout={handleLayoutImage}
        />
        <Pressable
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 50,
            backgroundColor: 'hsl(238,69%,56%)',
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}
          android_ripple={styles.ripple_config}
          onPress={() => {
            setSelectedClipPath('header'), setShowClipShape(true);
          }}
          //disabled={showClipShape ? false : true}
          disabled={false}>
          <Text
            style={{
              color: '#fff',
              fontSize: 13,
              fontWeight: '500',
              letterSpacing: 1.5,
            }}>
            START THE TUTORIAL!
          </Text>
        </Pressable>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          //height: 100,
          //borderWidth: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 0,
            backgroundColor: '#fff',
          }}>
          {DataIcon.map((item, index) => (
            <Pressable
              key={index}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onLayout={handleLayoutTab}
              //onPress={()=>setClipShape(e.)}
              //onLayout={handleLayout}
              //onLayout={(e, index) => console.log(index)}
            >
              <Ionicons name={item} size={30} color={'hsl(0,0%,50%)'} />
            </Pressable>
          ))}
        </View>
      </View>
      <Modal
        visible={showClipShape}
        onRequestClose={() => {}}
        transparent
        animationType="fade"
        statusBarTranslucent>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
          }}>
          <Svg width={WIDTH_SCREEN + 20} height={HEIGHT_SCREEN + 20}>
            <Defs>
              <ClipPath id="clip">
                <Path
                  d={`M 0 0 L ${WIDTH_SCREEN + 20} 0 L ${WIDTH_SCREEN + 20} ${
                    HEIGHT_SCREEN + 20
                  } L 0 ${HEIGHT_SCREEN + 20} L 0 0  M ${clipShape.x} ${
                    clipShape.y + 40
                  } l 0 ${clipShape.height} l ${clipShape.width} 0 l 0 -${
                    clipShape.height
                  } l -${clipShape.width} 0`}
                />
              </ClipPath>
              <ClipPath id="image">
                <Path
                  d={`M 0 0 L ${WIDTH_SCREEN + 20} 0 L ${WIDTH_SCREEN + 20} ${
                    HEIGHT_SCREEN + 20
                  } L 0 ${HEIGHT_SCREEN + 20} L 0 0  M ${clipImage.x} ${
                    clipImage.y + 40
                  } l 0 ${clipImage.height + 10} l ${clipImage.width} 0 l 0 -${
                    clipImage.height
                  } l -${clipImage.width} 0`}
                />
              </ClipPath>
              {clipTab.map((item, index) => (
                <ClipPath id={`${index}`} key={index}>
                  <Path
                    d={`M 0 0 L ${WIDTH_SCREEN + 20} 0 L ${WIDTH_SCREEN + 20} ${
                      HEIGHT_SCREEN + 20
                    } L 0 ${
                      HEIGHT_SCREEN + 20
                    } L 0 0  M 0 840 l 79 0 l 0 -120 l -79 0 l 0 120`}
                  />
                </ClipPath>
              ))}
              {clipTab.length === 5 && (
                <ClipPath id="tab">
                  <Path
                    d={`M 0 0 L ${WIDTH_SCREEN + 20} 0 L ${WIDTH_SCREEN + 20} ${
                      HEIGHT_SCREEN + 20
                    } L 0 ${HEIGHT_SCREEN + 20} L 0 0  M 0 ${
                      HEIGHT_SCREEN + 20
                    } l ${clipTab[0].width} 0 l 0 -${
                      clipTab[0].height + 87
                    } l -${clipTab[0].width} 0 l 0 ${clipTab[0].height + 87}`}
                  />
                </ClipPath>
              )}
            </Defs>
            {selectedClipPath === 'header' ? (
              <Rect
                width={WIDTH_SCREEN}
                height={HEIGHT_SCREEN}
                fill="#00000099"
                clipPath="url(#clip)"
                //fill="yellow"
                clipRule="evenodd"
              />
            ) : selectedClipPath === 'image' ? (
              <Rect
                width={WIDTH_SCREEN}
                height={HEIGHT_SCREEN}
                fill="#00000099"
                clipPath="url(#image)"
                //fill="yellow"
                clipRule="evenodd"
              />
            ) : (
              <Rect
                width={WIDTH_SCREEN}
                height={HEIGHT_SCREEN}
                fill="#00000099"
                clipPath="url(#tab)"
                //fill="yellow"
                clipRule="evenodd"
              />
            )}
            <View
              style={{
                position: 'absolute',
                top:
                  selectedClipPath === 'header'
                    ? clipShape.y + 25
                    : clipImage.y + 35,
                left:
                  selectedClipPath === 'header'
                    ? clipShape.x - 10
                    : clipImage.x - 10,
                width: 30,
                height: 30,
                borderRadius: 100,
                borderWidth: 2,
                borderColor: '#fff',
                backgroundColor: '#38a564',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: '#fff'}}>
                {selectedClipPath === 'header' ? `1` : `2`}
              </Text>
            </View>
          </Svg>
        </View>
        <View
          style={{
            zIndex: 2,
            flex: 1,
            borderWidth: 1,
          }}>
          {/* Note for title */}

          <View
            style={{
              marginTop:
                selectedClipPath === 'header'
                  ? clipShape.x + clipShape.height + 10
                  : clipImage.x + clipImage.height + 20,
              borderWidth: 1,
              width:
                selectedClipPath === 'header'
                  ? clipShape.width
                  : clipImage.width + 20,
              alignSelf: 'center',
              backgroundColor: '#fff',
              borderRadius: 3,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderColor: '#fff',
            }}>
            <View
              style={[
                {
                  position: 'absolute',
                  top: -5,
                  left: 10,
                  width: 18,
                  height: 18,
                  backgroundColor: '#fff',
                  zIndex: 1,
                },
                {transform: [{rotate: '45deg'}]},
              ]}
            />
            {selectedClipPath === 'header' ? (
              <Text style={styles.text}>
                Hey! This is the first step of the tour
              </Text>
            ) : selectedClipPath === 'image' ? (
              <Text style={styles.text}>Here goes your profile picture</Text>
            ) : null}

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <Pressable
                style={{
                  paddingHorizontal: 10,
                  paddingTop: 10,
                }}
                onPress={() => setShowClipShape(false)}>
                <Text
                  style={{
                    color: '#38a564',
                    fontWeight: '500',
                  }}>
                  Skip
                </Text>
              </Pressable>
              <Pressable
                style={{
                  paddingHorizontal: 10,
                  paddingTop: 10,
                }}
                onPress={handleOnPress}>
                <Text
                  style={{
                    color: '#38a564',
                    fontWeight: '500',
                  }}>
                  Next
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  ripple_config: {
    color: '#9bbff9',
    borderless: false,
    radius: 150,
    foreground: false,
  },
  text: {
    color: '#000',
    fontSize: 15,
    fontWeight: '500',
  },
});
export default Copilot_Index;
