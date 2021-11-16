import React from "react";
import API from "./subcomponents/API";
import { ListItem } from "react-native-elements";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as Constants from "./subcomponents/Constants";

class SubCategories extends React.Component {
    state = {
        categoryID: 0,
        subCategories: [],
    };

    componentDidMount = async () => {
        try {
            const categoryID = await AsyncStorage.getItem("@categoryID");

            var options = {
                SessionKey: Constants.SESSIONKEY,
                CategoryID: parseInt(categoryID),
            };

            const response = await API.post("/subcategories", options);

            if (response.data.status.code === 200) {
                this.setState({
                    subCategories: response.data.data,
                    categoryID: parseInt(categoryID),
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
                SessionKey: Constants.SESSIONKEY,
                CategoryID: this.state.categoryID,
                SubCategoryID: parseInt(subCategoryID),
            };

            const response = await API.post("/entries", options);

            if (response.data.status.code === 200) {
                const quizzes = JSON.stringify(response.data.data);
                await AsyncStorage.setItem("@quizzes", quizzes);
                await AsyncStorage.setItem("@subCategoryID", subCategoryID);

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
                {this.state.subCategories.map((value, key) => (
                    <ListItem
                        key={key}
                        bottomDivider
                        onPress={() => this.navigateToQuiz(value.SubCategoryID)}
                    >
                        <ListItem.Content>
                            <ListItem.Title>
                                {value.SubCategoryName}
                            </ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </View>
        );
    }
}

export default SubCategories;
