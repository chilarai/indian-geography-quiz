import React from "react";
import { View } from "react-native";
import { Header, Icon, Badge } from "react-native-elements";

import API from "./API";
import * as Constants from "./Constants";

class Head extends React.Component {
    state = {
        score: 0,
        tmpScore: -1,
        sessionKey: "",
        userID: 0,
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
            UserID: this.props.userID,
            SessionKey: this.props.sessionKey,
            QuizDate: formatTodayDate,
        };

        const response = await API.post("/currentscore", options);

        if (response.data.status.code === 200) {
            this.setState({
                score: response.data.data.Score,
                sessionKey: this.props.sessionKey,
                userID: this.props.userID,
            });
        } else {
            console.log(response.data);
        }
    };

    componentDidUpdate = async (props) => {
        if (
            this.state.tmpScore !== props.newScore &&
            typeof props.newScore !== "undefined"
        ) {
            if (props.newScore > 0) {
                var score = this.state.score + 1;
                this.setState({ score, tmpScore: props.newScore });
            } else {
                // var score = await AsyncStorage.getItem("@score");
                this.setState({ tmpScore: props.newScore });
            }
        }
    };

    navigateToLeaderBoards = () => {
        this.props.navigation.navigate("LeaderBoard", {
            sessionKey: this.state.sessionKey,
            userID: this.state.userID,
        });
    };

    navigateToCategories = () => {
        this.props.navigation.navigate("Categories", {
            sessionKey: this.state.sessionKey,
            userID: this.state.userID,
        });
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
