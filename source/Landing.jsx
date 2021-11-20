import React from "react";
import API from "./subcomponents/API";
import {
    View,
    StyleSheet,
    Image,
    Button,
    TextInput,
    ActivityIndicator,
} from "react-native";
import { Text } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Landing extends React.Component {
    state = {
        name: "",
        validName: false,
        message: "",
        color: "red",
        waiting: false,
    };

    ComponenDidMount = async () => {
        this.setState({ waiting: true });

        try {
            let playerName = await AsyncStorage.getItem("playerName");

            var options = {
                name: playerName,
            };

            let response = await API.post("/login", options);

            if (response.data.status.code === 200) {
                this.props.navigation.navigate("Categories", {
                    userID: response.data.data.userId,
                    sessionKey: response.data.data.sessionKey,
                });
            } else {
                this.setState({
                    validName: false,
                    message: response.data.status.msg,
                    color: "red",
                    waiting: false,
                });
            }
        } catch (error) {
            log.Println(error);
        }
    };

    navigateToCategories = async () => {
        this.setState({ waiting: true });

        var options = {
            name: this.state.name,
        };

        let response = await API.post("/login", options);

        if (response.data.status.code === 200) {
            await AsyncStorage.setItem("playerName", this.state.name);

            this.props.navigation.navigate("Categories", {
                userID: response.data.data.userId,
                sessionKey: response.data.data.sessionToken,
            });
        } else {
            this.setState({
                validName: false,
                message: response.data.status.msg,
                color: "red",
                waiting: false,
            });
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require("../assets/images/igq.png")}
                />

                <TextInput
                    onChangeText={(value) => this.setState({ name: value })}
                    // selectionColor="#428AF8"
                    style={styles.inputName}
                    placeholder="Pick a player name"
                />

                <TextInput
                    onChangeText={(value) => this.setState({ email: value })}
                    // selectionColor="#428AF8"
                    style={styles.inputEmail}
                    placeholder="Enter your email"
                />

                <Text style={styles.info}>
                    We do not share your email or send any promotional mails
                </Text>

                <Button
                    style={styles.continueBtn}
                    title="Continue"
                    type="solid"
                    onPress={() => this.navigateToCategories()}
                />

                {this.state.waiting === true ? (
                    <ActivityIndicator style={styles.activityindicator} />
                ) : (
                    <View />
                )}
                <Text
                    style={{
                        color: this.state.color,
                        alignSelf: "center",
                        marginBottom: 30,
                    }}
                >
                    {this.state.message}
                </Text>
            </View>
        );
    }
}

export default Landing;

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        padding: 40,
        flex: 1,
        flexShrink: 1,
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
        marginTop: 20,
        marginBottom: 30,
    },

    inputName: {
        fontSize: 14,
        lineHeight: 14, // <- line height should be corresponding to your font size
        borderWidth: 1.0,
        borderColor: "dodgerblue",
        height: 40,
        marginBottom: 10,
        marginTop: 30,
        textAlign: "center",
    },

    inputEmail: {
        fontSize: 14,
        lineHeight: 14, // <- line height should be corresponding to your font size
        borderWidth: 1.0,
        borderColor: "dodgerblue",
        height: 40,
        marginBottom: 10,
        textAlign: "center",
    },

    activityindicator: {
        marginTop: 10,
    },

    info: {
        alignSelf: "center",
        fontSize: 11,
        marginBottom: 20,
        color: "blue",
    },

    continueBtn: {
        marginTop: 50,
    },

    logo: {
        height: 250,
        width: 350,
        alignSelf: "center",
        marginTop: 30,
    },
});
