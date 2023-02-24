import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Settings from "./screens/Settings";
import TabBar from "./TabBar";

const Tab = createBottomTabNavigator();

const NavigationRoot = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                tabBar={props => <TabBar {...props} />}
                initialRouteName="Profile"
            >
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    initialParams={{ IconName: 'person' }}

                />
                <Tab.Screen
                    name="Settings"
                    component={Settings}
                    initialParams={{ IconName: 'settings' }}

                />
                <Tab.Screen
                    name="Home"
                    component={Home}
                    initialParams={{ IconName: 'home' }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default NavigationRoot;
