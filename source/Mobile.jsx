import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Input, Button } from "react-native-elements";

class Mobile extends React.Component {
    navigateToOtp = () => {
        this.props.navigation.navigate("ConfirmOtp");
    };

    render() {
        return (
            <View>
                <Text>Enter mobile number</Text>
                <Input
                    placeholder="Mobile number"
                    errorStyle={{ color: "red" }}
                    errorMessage=""
                />
                <Button title="Submit" onPress={() => this.navigateToOtp()} />
            </View>
        );
    }
}

export default Mobile;
