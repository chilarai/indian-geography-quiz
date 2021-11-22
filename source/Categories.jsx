import React from "react";
import API from "./subcomponents/API";
import Head from "./subcomponents/HeaderComponent";
import { Card, Button, Icon, Text } from "react-native-elements";
import { View, StyleSheet } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

class Categories extends React.Component {
    state = {
        categories: [],
        sessionKey: "",
        userID: 0,
        tmpScore: 0,
        playerName: "",
    };

    componentDidMount = async () => {
        try {
            let sessionKey = await AsyncStorage.getItem("sessionKey");
            let userID = await AsyncStorage.getItem("userID");
            let tmpScore = await AsyncStorage.getItem("score");
            let playerName = await AsyncStorage.getItem("playerName");

            this.setState({
                sessionKey,
                userID,
                tmpScore,
                playerName,
            });

            var options = {
                SessionKey: sessionKey,
            };

            const response = await API.post("/categories", options);
            console.log(options, userID, tmpScore);

            if (response.data.status.code === 200) {
                this.setState({
                    categories: response.data.data,
                    sessionKey: sessionKey,
                    userID: userID,
                });
            } else {
                console.log(response.data.status.msg);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // componentDidUpdate = async () => {};

    navigateToSubCategories = async (categoryID) => {
        try {
            await AsyncStorage.setItem("categoryID", categoryID.toString());
            this.props.navigation.navigate("SubCategories");
        } catch (e) {
            console.log("Error", e);
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Head
                    navigation={this.props.navigation}
                    tmpScore={this.state.tmpScore}
                />

                {this.state.categories.map((value, key) => (
                    <Card key={key}>
                        <Card.Title>{value.CategoryName}</Card.Title>
                        <Card.Divider />
                        <Card.Image
                            source={require("../assets/images/quiz.png")}
                        />
                        <Text style={styles.info}>
                            {"Can you identify all the 28 Indian states ?"}
                        </Text>
                        <Button
                            buttonStyle={{
                                borderRadius: 0,
                                marginLeft: 0,
                                marginRight: 0,
                                marginBottom: 0,
                            }}
                            title="Start Quiz"
                            onPress={() =>
                                this.navigateToSubCategories(value.CategoryID)
                            }
                        />
                    </Card>
                ))}
            </View>
        );
    }
}

export default Categories;

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
    },

    info: {
        marginBottom: 10,
        marginTop: 10,
    },
});
