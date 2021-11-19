import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text, Input, Button } from "react-native-elements";

import * as Constants from "./subcomponents/Constants";
class Landing extends React.Component {
    navigateToCategories = () => {
        this.props.navigation.navigate("Categories", {
            userID: Constants.USERID,
            sessionKey: Constants.SESSIONKEY,
        });
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
                        // leftIcon={{ type: "font-awesome", name: "user" }}
                        inputStyle={{ textAlign: "center" }}
                        onChangeText={(value) =>
                            this.setState({ comment: value })
                        }
                    />
                </View>
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
        marginTop: 10,
        alignSelf: "center",
    },

    logo: {
        height: 250,
        width: 350,
        alignSelf: "center",
        marginTop: 100,
    },
});
