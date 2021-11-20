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
    };

    componentDidMount = async () => {
        let sessionKey = await AsyncStorage.getItem("sessionKey");
        let userID = await AsyncStorage.getItem("userID");
        let tmpScore = await AsyncStorage.getItem("score");

        this.setState({
            sessionKey,
            userID,
            tmpScore,
        });

        var options = {
            SessionKey: sessionKey,
        };

        try {
            const response = await API.post("/categories", options);

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

    componentDidUpdate = async () => {};

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
                        <Card.Image source={require("../assets/test/1.png")} />
                        <Text style={{ marginBottom: 10 }}>
                            {
                                "India has 748 districts spread across 28 states and 8 union territories. Can you point them all?"
                            }
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
});
