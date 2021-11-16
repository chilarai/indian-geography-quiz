import React from "react";
import API from "./subcomponents/API";
import { ListItem } from "react-native-elements";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as Constants from "./subcomponents/Constants";

class Categories extends React.Component {
    state = {
        categories: [],
    };

    componentDidMount = async () => {
        var options = {
            SessionKey: Constants.SESSIONKEY,
        };

        try {
            const response = await API.post("/categories", options);

            if (response.data.status.code === 200) {
                this.setState({ categories: response.data.data });
            } else {
                console.log(response.data.status.msg);
            }
        } catch (error) {
            console.log(error);
        }
    };

    navigateToSubCategories = async (categoryID) => {
        try {
            await AsyncStorage.setItem("@categoryID", categoryID);
            this.props.navigation.navigate("SubCategories");
        } catch (e) {
            console.log("Error", e);
        }
    };

    render() {
        return (
            <View>
                {this.state.categories.map((value, key) => (
                    <ListItem
                        key={key}
                        bottomDivider
                        onPress={() =>
                            this.navigateToSubCategories(value.CategoryID)
                        }
                    >
                        <ListItem.Content>
                            <ListItem.Title>
                                {value.CategoryName}
                            </ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </View>
        );
    }
}

export default Categories;
