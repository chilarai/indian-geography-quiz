import React from "react";
import { Text, View, StyleSheet } from "react-native";
import * as GoogleSignIn from "expo-google-sign-in";

export default class AuthScreen extends React.Component {
    state = { user: null };

    componentDidMount() {
        this.initAsync();
    }

    initAsync = async () => {
        await GoogleSignIn.initAsync({
            // You may ommit the clientId when the firebase `googleServicesFile` is configured
            // clientId: "<YOUR_IOS_CLIENT_ID>",
        });
        this._syncUserWithStateAsync();
    };

    _syncUserWithStateAsync = async () => {
        const user = await GoogleSignIn.signInSilentlyAsync();
        this.setState({ user });
    };

    signOutAsync = async () => {
        await GoogleSignIn.signOutAsync();
        this.setState({ user: null });
    };

    signInAsync = async () => {
        try {
            await GoogleSignIn.askForPlayServicesAsync();
            const { type, user } = await GoogleSignIn.signInAsync();
            if (type === "success") {
                this._syncUserWithStateAsync();
            }
        } catch ({ message }) {
            alert("login: Error:" + message);
        }
    };

    onPress = () => {
        if (this.state.user) {
            this.signOutAsync();
        } else {
            this.signInAsync();
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text onPress={this.onPress}>Toggle Auth</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: 200,
        width: 300,
    },
});
