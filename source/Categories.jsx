import React from "react";
import API from "./subcomponents/API";
import Head from "./subcomponents/HeaderComponent";
import { Card, Button, Icon, Text } from "react-native-elements";
import { View, StyleSheet } from "react-native";

import * as Constants from "./subcomponents/Constants";

class Categories extends React.Component {
    state = {
        categories: [],
        sessionKey: "",
        userID: 0,
    };

    componentDidMount = async () => {
        var options = {
            SessionKey: this.props.route.params.sessionKey,
        };

        try {
            const response = await API.post("/categories", options);

            if (response.data.status.code === 200) {
                this.setState({
                    categories: response.data.data,
                    sessionKey: this.props.route.params.sessionKey,
                    userID: this.props.route.params.userID,
                });
            } else {
                console.log(response.data.status.msg);
            }
        } catch (error) {
            console.log(error);
        }
    };

    componentDidUpdate = () => {};

    navigateToSubCategories = async (categoryID) => {
        try {
            this.props.navigation.navigate("SubCategories", {
                categoryID: categoryID,
                sessionKey: this.state.sessionKey,
                userID: this.state.userID,
            });
        } catch (e) {
            console.log("Error", e);
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Head
                    navigation={this.props.navigation}
                    newScore={-2}
                    sessionKey={this.props.route.params.sessionKey}
                    userID={this.props.route.params.userID}
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
