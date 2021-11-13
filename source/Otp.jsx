import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Input, Button } from "react-native-elements";

class Otp extends React.Component {
    navigateToPlayerName = () => {
        this.props.navigation.navigate("PlayerName");
    };

    render() {
        return (
            <View>
                <Text>Enter OTP</Text>
                <Input
                    placeholder="OTP"
                    errorStyle={{ color: "red" }}
                    errorMessage=""
                />
                <Button title="Submit" onPress={this.navigateToPlayerName()} />
                <Button title="Resend OTP" type="clear" />
            </View>
        );
    }
}

export default Otp;
