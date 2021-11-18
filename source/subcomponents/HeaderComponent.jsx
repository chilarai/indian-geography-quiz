import React from "react";
import { View } from "react-native";
import { Header, Icon, Badge } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

import API from "./API";
import * as Constants from "./Constants";

class Head extends React.Component {
    state = {
        score: 0,
        tmpScore: -1,
    };

    componentDidMount = async () => {
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
            UserID: Constants.USERID,
            SessionKey: Constants.SESSIONKEY,
            QuizDate: formatTodayDate,
        };

        const response = await API.post("/currentscore", options);

        if (response.data.status.code === 200) {
            await AsyncStorage.setItem("@score", response.data.data.Score);
            this.setState({ score: response.data.data.Score });
        } else {
            console.log(response.data);
        }
    };

    componentDidUpdate = async (props) => {
        // console.log("COMP DID UPDATE");
        if (
            this.state.tmpScore !== props.newScore &&
            typeof props.newScore !== "undefined"
        ) {
            if (props.newScore > 0) {
                var score = this.state.score + 1;
                await AsyncStorage.setItem("@score", score);
                this.setState({ score, tmpScore: props.newScore });
            } else {
                var score = await AsyncStorage.getItem("@score");
                this.setState({ score, tmpScore: props.newScore });
            }
        }
    };

    navigateToLeaderBoards = () => {
        this.props.navigation.navigate("LeaderBoard");
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
                        <Badge value={this.state.score} status="warning" />
                    }
                    rightComponent={
                        <Icon
                            name="trophy"
                            type="font-awesome"
                            color="gold"
                            onPress={() => this.navigateToLeaderBoards()}
                        />
                    }
                />
            </View>
        );
    }
}

export default Head;
