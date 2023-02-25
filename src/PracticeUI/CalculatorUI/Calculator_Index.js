import { View, Text, Pressable, StatusBar, FlatList, TextInput, Alert, Modal } from "react-native";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { NumberData, OperatorData, SpecialOperators } from "./NumberData";
import { ScrollView } from "react-native-gesture-handler";
const Calculator_Index = () => {
    const [isWhite, setIsWhite] = useState(true);
    const [firstNumber, setFirstNumber] = useState("");
    const [secondNumber, setSecondNumber] = useState("");
    const [operator, setOperator] = useState("");
    const [thirdNumber, setThirdNumber] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [history, setHistory] = useState([]);
    const [flag, setFlag] = useState(false);
    //let history = [];
    const Color = () => {
        //console.log("render");
        return isWhite ? '#000' : '#fff';
    };
    const textColor = useMemo(() => Color(), [isWhite]);
    //console.log(textColor);
    useEffect(() => {
        if (firstNumber.length !== 0 && secondNumber.length !== 0 && thirdNumber.length !== 0 && flag === true) {
            // console.log(operator);
            // console.log("first " + firstNumber);
            // console.log("second " + secondNumber);
            // console.log("third " + thirdNumber);
            let tmp = `${secondNumber}  ${operator}  ${thirdNumber}  =  ${firstNumber}`;
            setHistory([...history, tmp]);
        };
    }, [firstNumber, secondNumber, thirdNumber, operator]);
    const onPressNumber = (item) => {
        setFlag(false);
        if (item === "back") {
            setShowModal(true);
        } else if (item === ".") {
            setFirstNumber(firstNumber + item);
        } else {
            if (firstNumber.length <= 100) {
                if (thirdNumber.length !== 0 && firstNumber.indexOf(".") === -1) {
                    setFirstNumber(item);
                } else {
                    setFirstNumber(firstNumber + item);
                }
                //setFirstNumber(firstNumber + item);

            } else {
                Alert.alert("Maximum characters is 100!");
            }
        };
    };
    const onPressOperators = (item) => {
        if (item.symbol !== "=") {
            setFlag(false);
            setOperator(item.symbol);
            setSecondNumber(firstNumber);
            setFirstNumber("");
            setThirdNumber("");
        } else if (item.symbol === "=") {
            switch (operator) {
                case "+":
                    //setOperator("");
                    setThirdNumber(firstNumber);
                    setFirstNumber((Number(firstNumber) + Number(secondNumber)).toString());
                    setFlag(true);
                    break;
                case "-":
                    setThirdNumber(firstNumber);
                    setFirstNumber((Number(secondNumber) - Number(firstNumber)).toString());
                    setFlag(true);
                    break;
                case "x":
                    setThirdNumber(firstNumber);
                    setFirstNumber((Number(firstNumber) * Number(secondNumber)).toString());
                    setFlag(true);
                    break;
                case "÷":
                    if (firstNumber !== "0") {
                        setThirdNumber(firstNumber);
                        setFirstNumber((Number(secondNumber) / Number(firstNumber)).toString());
                        setFlag(true);
                        break;
                    } else {
                        setFirstNumber("");
                        Alert.alert("Cannot divide 0");
                    };
            };

        };
    };

    const onPressSpecialOperators = (item) => {
        console.log("render");
        setFlag(false);
        if (item === "AC") {
            setOperator("");
            setFirstNumber("");
            setSecondNumber("");
            setThirdNumber("");
        } else if (item === "+/-") {
            if (firstNumber.length !== 0) {
                if (firstNumber.indexOf("-") === -1) {
                    setFirstNumber("-" + firstNumber);
                } else {
                    setFirstNumber(firstNumber.replace("-", ""));
                };
            };
        } else if (item === "%") {
            if (firstNumber.length !== 0) {
                if (firstNumber.indexOf("%") === -1) {
                    setFirstNumber((Number(firstNumber) / 100).toString());
                }
            }
        };
    };
    //console.log(operator);
    const renderNumberBtn = ({ item, index }) => {
        return (
            <Pressable
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 10,
                    //borderWidth: 1,
                    marginHorizontal: 5,
                    paddingVertical: 10,
                    backgroundColor: isWhite ? 'hsl(0,0%,85%)' : 'hsl(0,0%,10%)',
                    borderRadius: 10,
                }}
                //onPress={() => onAddElement(item)}
                onPress={() => onPressNumber(item)}
            >
                {(index === 0 || index === 2) ?
                    index == 0
                        ? (
                            <FontAwesome
                                name={"undo"}
                                size={18}
                                color={textColor}
                            />
                        ) : (
                            <Octicons
                                name={"dot-fill"}
                                size={15}
                                color={textColor}
                            />
                        )
                    : (
                        <Text
                            style={{
                                fontSize: 20,
                                color: textColor,
                                fontWeight: '600',
                            }}>
                            {item}
                        </Text>
                    )}
            </Pressable >
        )
    }
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: isWhite ? '#fff' : 'hsl(0,0%,10%)',
                paddingTop: 40,
            }}>
            <StatusBar barStyle={isWhite ? 'dark-content' : 'light-content'} backgroundColor={'transparent'} translucent />
            {/* Header */}
            <View
                style={{
                    alignSelf: 'center',
                    borderRadius: 10,
                    justifyContent: 'space-between',
                    backgroundColor: isWhite ? 'hsl(0,0%,90%)' : 'hsl(0,0%,30%)',
                    //paddingHorizontal: 10,
                    paddingVertical: 7,
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: '20%',

                }}>
                {[...new Array(2)].map((item, index) => {
                    return (
                        <Pressable
                            key={index}
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                //borderWidth: 1,
                            }}
                            onPress={() => setIsWhite(!isWhite)}>
                            <Feather
                                name={index === 0 ? "sun" : "moon"}
                                size={18}
                                color={index === 1
                                    ? (isWhite ? 'hsl(0,0%,70%)' : '#fff')
                                    : (isWhite ? '#000' : 'hsl(0,0%,70%)')}
                            />
                        </Pressable>
                    )
                })}
            </View>
            {/* Calculator View */}
            <View
                style={{
                    flex: 1,
                    //backgroundColor: '#fff',
                    justifyContent: 'flex-end',
                }}>
                {/* Result */}
                <View
                    style={{
                        marginBottom: 30,
                        alignItems: 'flex-end',
                        paddingHorizontal: 30,

                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{
                                fontSize: 25,
                                color: textColor,
                                fontWeight: '400',
                                marginRight: 8,
                            }}
                        >
                            {secondNumber}
                        </Text>
                        {secondNumber.length !== 0 ? (
                            <Text
                                style={{
                                    fontSize: 25,
                                    color: "red",
                                    fontWeight: '400',
                                    marginRight: 8,
                                }}
                            >
                                {operator}
                            </Text>
                        ) : (null)}

                        <Text
                            style={{
                                fontSize: 25,
                                color: textColor,
                                fontWeight: '400',
                                marginRight: 8,
                            }}
                        >
                            {thirdNumber}
                        </Text>
                    </View>

                    {firstNumber === "" ? (
                        <Text
                            style={{
                                fontSize: 50,
                                color: textColor,
                                fontWeight: '600',
                            }}>
                            0
                        </Text>
                    ) : (
                        <Text
                            style={{
                                fontSize: 50,
                                color: textColor,
                                fontWeight: '600',
                            }}>
                            {firstNumber}
                        </Text>
                    )}


                </View>
                {/* Keyboard */}
                <View
                    style={{
                        marginTop: 20,
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        backgroundColor: isWhite ? 'hsl(0,0%,90%)' : 'hsl(0,0%,15%)',
                        //borderWidth: 1,
                        paddingTop: 40,
                        paddingHorizontal: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingBottom: 10,
                    }}>
                    <View
                        style={{
                            flex: 3,
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            {SpecialOperators.map((item, index) => (
                                <Pressable
                                    style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        //borderWidth: 1,
                                        paddingVertical: 10,
                                        marginHorizontal: 5,
                                        borderRadius: 10,
                                        backgroundColor: isWhite ? 'hsl(0,0%,85%)' : 'hsl(0,0%,10%)'
                                    }}
                                    key={index}
                                    onPress={() => onPressSpecialOperators(item)}>
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            color: '#17ddb9',
                                            fontWeight: '600',
                                        }}>
                                        {item}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                        <View
                            style={{
                                marginVertical: 10,
                                //borderWidth: 1,
                            }}>
                            <FlatList
                                data={NumberData}
                                renderItem={renderNumberBtn}
                                numColumns={3}
                                inverted
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            flex: 1,
                        }}>
                        {OperatorData.map((item, index) => {
                            return (
                                <Pressable
                                    style={{
                                        //borderWidth: 1,
                                        flex: 1,
                                        //marginVertical: 10,
                                        marginBottom: 20,
                                        marginHorizontal: 5,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: isWhite ? 'hsl(0,0%,85%)' : 'hsl(0,0%,10%)',
                                        borderRadius: 10,
                                    }}
                                    key={index}
                                    onPress={() => onPressOperators(item)}>
                                    {index === 0 && (
                                        <Feather
                                            name="divide"
                                            size={20}
                                            color={"red"}
                                        />
                                    )}
                                    {index === 4 && (
                                        <MaterialCommunityIcons
                                            name="equal"
                                            size={20}
                                            color={"red"}
                                        />
                                    )}
                                    {(index === 1 || index === 2 || index === 3) && (
                                        <Feather
                                            name={item.name}
                                            size={20}
                                            color={"red"}
                                        />
                                    )}
                                </Pressable>
                            )
                        })}
                    </View>

                </View>
            </View>
            <Modal
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
                transparent
                statusBarTranslucent
                animationType="fade">
                <Pressable
                    style={{
                        flex: 1,
                        backgroundColor: '#00000099'
                    }}
                    onPress={() => setShowModal(false)}
                />
                <View
                    style={{
                        position: "absolute",
                        bottom: 0,
                        width: "100%",
                        backgroundColor: '#fff',
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        height: "50%",
                        elevation: 5,
                        alignItems: history.length === 0 ? 'flex-start' : 'flex-end',
                    }}>
                    {history.length === 0 ? (
                        <Text
                            style={{
                                color: '#000',
                                fontSize: 20,
                                paddingTop: 20,
                                paddingHorizontal: 20,
                            }}>
                            There's no history yet
                        </Text>
                    ) : (
                        <ScrollView>
                            <View
                                style={{
                                    paddingTop: 40,
                                }}>
                                {history.map((item, index) => {
                                    return (
                                        <View
                                            style={{
                                                paddingHorizontal: 30,
                                                paddingVertical: 10,
                                            }}
                                            key={index}>
                                            <Text
                                                style={{
                                                    color: "hsl(0,0%,50%)",
                                                    fontWeight: '500',
                                                    fontSize: 18,
                                                    textAlign: 'right',
                                                }}>
                                                {item}
                                            </Text>
                                        </View>
                                    );
                                })}
                            </View>
                        </ScrollView>
                    )}

                </View>
                <Pressable
                    style={{
                        position: 'absolute',
                        bottom: 20,
                        right: 10,
                    }}
                    onPress={() => {
                        setHistory([]);
                    }}>
                    <EvilIcons
                        name="trash"
                        color={"#000"}
                        size={35}
                    />
                </Pressable>
            </Modal>
        </View>
    );
};

export default Calculator_Index;
