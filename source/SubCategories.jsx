import React from "react";
import API from "./subcomponents/API";
import Head from "./subcomponents/HeaderComponent";
import { ListItem, Card } from "react-native-elements";
import { View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

class SubCategories extends React.Component {
    state = {
        categoryID: 0,
        subCategories: [],
        sessionKey: "",
        userID: 0,
        tmpScore: 0,
    };

    componentDidMount = async () => {
        let sessionKey = await AsyncStorage.getItem("sessionKey");
        let userID = await AsyncStorage.getItem("userID");
        let categoryID = await AsyncStorage.getItem("categoryID");
        let tmpScore = await AsyncStorage.getItem("score");

        try {
            var options = {
                SessionKey: sessionKey,
                CategoryID: parseInt(categoryID),
            };

            const response = await API.post("/subcategories", options);

            if (response.data.status.code === 200) {
                this.setState({
                    subCategories: response.data.data,
                    categoryID: parseInt(categoryID),
                    sessionKey: sessionKey,
                    userID: userID,
                    tmpScore,
                });
            } else {
                console.log(response.data.status.msg);
            }
        } catch (e) {
            console.log("Error Sub categories", e);
        }
    };

    navigateToQuiz = async (subCategoryID) => {
        try {
            var options = {
                SessionKey: this.state.sessionKey,
                CategoryID: this.state.categoryID,
                SubCategoryID: parseInt(subCategoryID),
            };

            const response = await API.post("/entries", options);

            if (response.data.status.code === 200) {
                const quizzes = JSON.stringify(response.data.data);
                await AsyncStorage.setItem("quizzes", quizzes);

                this.props.navigation.navigate("QuizScreen");
            } else {
                console.log(response.data.status.msg);
            }
        } catch (e) {
            console.log("Error", e);
        }
    };

    render() {
        return (
            <View>
                <Head
                    navigation={this.props.navigation}
                    tmpScore={this.state.tmpScore}
                />
                <Card>
                    <Card.Title>Select option</Card.Title>
                    <Card.Divider />
                    {this.state.subCategories.map((value, key) => (
                        <Button
                            key={key}
                            onPress={() =>
                                this.navigateToQuiz(value.SubCategoryID)
                            }
                            title={
                                value.SubCategoryName +
                                " (" +
                                value.QuizCount +
                                " questions)"
                            }
                            color="#841584"
                        />
                    ))}
                </Card>
            </View>
        );
    }
}

export default SubCategories;
