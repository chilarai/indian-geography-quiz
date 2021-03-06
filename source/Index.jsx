import "react-native-gesture-handler";
import React from "react";

import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "./Landing";
import LeaderBoard from "./LeaderBoard";
import Categories from "./Categories";
import QuizScreen from "./QuizScreen";
import SubCategories from "./SubCategories";
import Logout from "./Logout";

const Stack = createStackNavigator();

class Index extends React.Component {
    render() {
        return (
            <NavigationContainer style={styles.container}>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Home"
                        component={Landing}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="LeaderBoard"
                        component={LeaderBoard}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="Categories"
                        component={Categories}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="SubCategories"
                        component={SubCategories}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="QuizScreen"
                        component={QuizScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="Logout"
                        component={Logout}
                        options={{
                            headerShown: false,
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "dodgerblue",
    },
});
