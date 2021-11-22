import React from "react";

import { View, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

import AsyncStorage from "@react-native-async-storage/async-storage";

class RightIcons extends React.Component {
    logout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate("Home");
    };

    navigateToLeaderBoards = () => {
        this.props.navigation.navigate("LeaderBoard");
    };

    render() {
        return (
            <View style={styles.container}>
                <Icon
                    name="trophy"
                    type="font-awesome"
                    color="gold"
                    onPress={() => this.navigateToLeaderBoards()}
                    style={{ marginRight: 10 }}
                />
                <Icon
                    name="power-off"
                    type="font-awesome"
                    color="white"
                    onPress={() => this.logout()}
                />
            </View>
        );
    }
}

export default RightIcons;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
    },
});
