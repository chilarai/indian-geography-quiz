import React from "react";
import API from "./subcomponents/API";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as Constants from "./subcomponents/Constants";
class Landing extends React.Component {
    state = {
        name: "",
        validName: false,
        message: "",
        color: "red",
    };

    navigateToCategories = async () => {
        var options = {
            name: this.state.name,
        };

        let response = await API.post("/login", options);

        if (response.data.status.code === 200) {
            await AsyncStorage.setItem("playerName", this.state.name);

            this.props.navigation.navigate("Categories", {
                userID: response.data.data.userId,
                sessionKey: response.data.data.sessionKey,
            });
        } else {
            this.setState({
                validName: false,
                message: response.data.status.msg,
                color: "red",
            });
            console.log(response.data);
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require("../assets/images/igq.png")}
                />

                {/* <Divider style={styles.dividerStyle} /> */}
                <Text style={styles.info}>Sign in to continue</Text>

                <View style={styles.inputBox}>
                    <Input
                        placeholder="Pick a name"
                        inputStyle={{ textAlign: "center" }}
                        onChangeText={(value) => this.setState({ name: value })}
                    />
                </View>

                <Text style={{ color: this.state.color }}>
                    {this.state.message}
                </Text>

                <Button
                    style={styles.continueBtn}
                    title="Continue"
                    type="solid"
                    onPress={() => this.navigateToCategories()}
                />
            </View>
        );
    }
}

export default Landing;

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
    },

    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white",
    },

    inputBox: {
        flex: 1,
        alignSelf: "center",
        textAlign: "center",
        width: 300,
        marginTop: 30,
    },

    info: {
        marginTop: 70,
        alignSelf: "center",
        fontSize: 18,
    },

    continueBtn: {
        marginTop: 20,
    },

    logo: {
        height: 250,
        width: 350,
        alignSelf: "center",
        marginTop: 100,
    },
});
