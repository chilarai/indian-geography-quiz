import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "./Landing";
import Mobile from "./Mobile";
import Otp from "./Otp";
import PlayerName from "./PlayerName";
import LeaderBoard from "./LeaderBoard";
import QuizSelector from "./QuizSelector";
import QuizScreen from "./QuizScreen";
import Logout from "./Logout";

const Stack = createStackNavigator();

class Index extends React.Component {
    render() {
        return (
            <NavigationContainer style={styles.container}>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={Landing} />
                    <Stack.Screen name="Mobile" component={Mobile} />
                    <Stack.Screen name="ConfirmOtp" component={Otp} />
                    <Stack.Screen name="PlayerName" component={PlayerName} />
                    <Stack.Screen name="LeaderBoard" component={LeaderBoard} />
                    <Stack.Screen
                        name="QuizSelector"
                        component={QuizSelector}
                    />
                    <Stack.Screen name="QuizScreen" component={QuizScreen} />
                    <Stack.Screen name="Logout" component={Logout} />
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
