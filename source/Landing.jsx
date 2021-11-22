import React from "react";
import API from "./subcomponents/API";
import {
    View,
    StyleSheet,
    Image,
    Button,
    TextInput,
    ActivityIndicator,
    CheckBox,
    Linking,
} from "react-native";
import { Text } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Landing extends React.Component {
    state = {
        name: "",
        email: "",
        validName: false,
        validEmail: false,
        message: "",
        color: "red",
        waiting: false,
    };

    componentDidMount = async () => {
        try {
            let playerName = await AsyncStorage.getItem("playerName");
            let playerEmail = await AsyncStorage.getItem("playerEmail");
            let sessionKey = await AsyncStorage.getItem("sessionKey");
            let userID = await AsyncStorage.getItem("userID");

            if (
                playerName === null ||
                playerEmail === null ||
                sessionKey === null ||
                userID === null
            ) {
            } else {
                this.props.navigation.navigate("Categories");
            }
        } catch (error) {
            log.Println(error);
        }
    };

    navigateToCategories = async () => {
        this.setState({ waiting: true });

        var options = {
            name: this.state.name,
            email: this.state.email,
        };

        if (this.state.validEmail === true) {
            this.setState({ message: "" });
            let response = await API.post("/login", options);

            if (response.data.status.code === 200) {
                await AsyncStorage.setItem(
                    "sessionKey",
                    response.data.data.sessionToken
                );
                await AsyncStorage.setItem(
                    "userID",
                    response.data.data.userId.toString()
                );
                await AsyncStorage.setItem("playerName", this.state.name);
                await AsyncStorage.setItem("playerEmail", this.state.email);

                let x = await AsyncStorage.getItem("sessionKey");
                this.props.navigation.navigate("Categories");
            } else {
                this.setState({
                    validName: false,
                    validEmail: false,
                    message: response.data.status.msg,
                    color: "red",
                    waiting: false,
                });
            }
        } else {
            this.setState({ message: "Invalid email format", waiting: false });
        }
    };

    validate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            this.setState({ email: text, validEmail: false });
            return false;
        } else {
            this.setState({ email: text, validEmail: true });
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
                    onChangeText={(text) => this.validate(text)}
                    // selectionColor="#428AF8"
                    style={styles.inputEmail}
                    placeholder="Enter your email"
                />

                <Text style={styles.info}>
                    We do not share your email or send any promotional mails
                </Text>

                <View style={styles.terms}>
                    <CheckBox value={true} disabled={true} />
                    <Text style={styles.termsText1}>I agree to</Text>
                    <Text
                        style={styles.termsText2}
                        onPress={() =>
                            Linking.openURL(
                                "https://igq.wreken.com/info/privacy.html"
                            )
                        }
                    >
                        Terms and Conditions
                    </Text>
                </View>

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

    terms: {
        flexDirection: "row",
        marginBottom: 10,
    },

    termsText1: {
        marginLeft: 10,
    },

    termsText2: {
        marginLeft: 5,
        color: "dodgerblue",
    },
});
