import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Input, Button } from "react-native-elements";

class PlayerName extends React.Component {
    navigateToLeaderboard = () => {
        this.props.navigation.navigate("LeaderBoard");
    };

    render() {
        return (
            <View>
                <Text>Choose a name</Text>
                <Input
                    placeholder="Player Name"
                    errorStyle={{ color: "red" }}
                    errorMessage=""
                />
                <Button title="Submit" onPress={this.navigateToLeaderboard()} />
            </View>
        );
    }
}

export default PlayerName;
