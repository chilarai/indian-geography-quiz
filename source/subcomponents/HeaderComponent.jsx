import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Header, Icon, Badge } from "react-native-elements";

import API from "./API";
import RightIcons from "./RightIcons";

class Head extends React.Component {
    state = {
        score: 0,
        sessionKey: "",
        userID: 0,
        tmpScore: 0,
    };

    componentDidMount = async () => {
        try {
            let sessionKey = await AsyncStorage.getItem("sessionKey");
            let userID = await AsyncStorage.getItem("userID");

            const gmtDate = new Date().toLocaleString("en-US", {
                timeZone: "Asia/Kolkata",
            });

            const todayDate = new Date(gmtDate);

            let formatTodayDate =
                todayDate.getFullYear() +
                "-" +
                (todayDate.getMonth() + 1) +
                "-" +
                todayDate.getDate();

            var options = {
                UserID: parseInt(userID),
                SessionKey: sessionKey,
                QuizDate: formatTodayDate,
            };

            const response = await API.post("/currentscore", options);

            if (response.data.status.code === 200) {
                await AsyncStorage.setItem(
                    "score",
                    response.data.data.Score.toString()
                );
            } else {
                await AsyncStorage.setItem("score", "0");
            }
            this.setState({
                score: response.data.data.Score,
                sessionKey: sessionKey,
                userID: userID,
            });
        } catch (error) {
            console.log(error);
        }
    };

    componentDidUpdate = async (props) => {
        if (props.tmpScore !== this.state.tmpScore) {
            let score = await AsyncStorage.getItem("score");
            if (score === "" || score === null) {
                score = 0;
            }
            this.setState({ score: parseInt(score), tmpScore: props.tmpScore });
        }
    };

    navigateToCategories = () => {
        this.props.navigation.navigate("Categories");
    };

    render() {
        return (
            <View>
                <Header
                    placement="right"
                    containerStyle={{
                        height: 80,
                    }}
                    statusBarProps={{ barStyle: "light-content" }}
                    barStyle="light-content" // or directly
                    leftComponent={
                        <Icon
                            name="home"
                            type="font-awesome"
                            color="white"
                            onPress={() => this.navigateToCategories()}
                        />
                    }
                    centerComponent={
                        <Badge
                            value={this.state.score}
                            status="warning"
                            onPress={() => this.logout()}
                        />
                    }
                    rightComponent={
                        <RightIcons navigation={this.props.navigation} />
                    }
                />
            </View>
        );
    }
}

export default Head;

const styles = StyleSheet.create({
    rightContainerStyle: {
        width: 40,
    },
});
