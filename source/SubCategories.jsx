import React from "react";
import API from "./subcomponents/API";
import Head from "./subcomponents/HeaderComponent";
import { ListItem, Card } from "react-native-elements";
import { View } from "react-native";

import * as Constants from "./subcomponents/Constants";

class SubCategories extends React.Component {
    state = {
        categoryID: 0,
        subCategories: [],
        sessionKey: "",
        userID: 0,
    };

    componentDidMount = async () => {
        try {
            const categoryID = this.props.route.params.categoryID;

            var options = {
                SessionKey: this.props.route.params.sessionKey,
                CategoryID: parseInt(categoryID),
            };

            const response = await API.post("/subcategories", options);

            if (response.data.status.code === 200) {
                this.setState({
                    subCategories: response.data.data,
                    categoryID: parseInt(categoryID),
                    sessionKey: this.props.route.params.sessionKey,
                    userID: this.props.route.params.userID,
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

                this.props.navigation.navigate("QuizScreen", {
                    categoryID: this.state.categoryID,
                    quizzes: quizzes,
                    subCategoryID: subCategoryID,
                    sessionKey: this.state.sessionKey,
                    userID: this.state.userID,
                });
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
                    newScore={-2}
                    sessionKey={this.props.route.params.sessionKey}
                    userID={this.props.route.params.userID}
                />
                <Card>
                    <Card.Title>Select a state</Card.Title>
                    <Card.Divider />
                    {this.state.subCategories.map((value, key) => (
                        <ListItem
                            key={key}
                            bottomDivider
                            onPress={() =>
                                this.navigateToQuiz(value.SubCategoryID)
                            }
                        >
                            <ListItem.Content>
                                <ListItem.Title>
                                    {value.SubCategoryName}
                                </ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    ))}
                </Card>
            </View>
        );
    }
}

export default SubCategories;
