import React from "react";
import API from "./subcomponents/API";
import Head from "./subcomponents/HeaderComponent";
import { View, StyleSheet, Text } from "react-native";
import { ListItem, Card } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

class LeaderBoard extends React.Component {
    state = {
        leaderboards: [],
        sessionKey: "",
        userID: 0,
        categoryID: 0,
        tmpScore: 0,
    };

    componentDidMount = async () => {
        let sessionKey = await AsyncStorage.getItem("sessionKey");
        let userID = await AsyncStorage.getItem("userID");
        let categoryID = await AsyncStorage.getItem("categoryID");
        let tmpScore = await AsyncStorage.getItem("score");

        this.setState({
            sessionKey,
            userID,
            categoryID,
            tmpScore,
        });

        try {
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
                CategoryID: parseInt(categoryID),
                SessionKey: sessionKey,
                QuizDate: formatTodayDate,
            };

            const response = await API.post("/leaderboard", options);

            if (response.data.status.code === 200) {
                this.setState({
                    leaderboards: response.data.data,
                    sessionKey: sessionKey,
                    userID: userID,
                });
            }
        } catch (error) {
            console.log(error);
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
                    <Card.Title>Day's top scorers</Card.Title>
                    <Card.Divider />
                    {this.state.leaderboards !== null ? (
                        <View>
                            {this.state.leaderboards.map((value, key) => (
                                <ListItem key={key} bottomDivider>
                                    <Text>
                                        {key + 1} {"."}
                                    </Text>
                                    <ListItem.Content>
                                        <ListItem.Title>
                                            {value.Name}
                                        </ListItem.Title>
                                        <ListItem.Subtitle
                                            style={styles.subTitle}
                                        >
                                            {value.Score}
                                        </ListItem.Subtitle>
                                    </ListItem.Content>
                                </ListItem>
                            ))}
                            : <View />
                        </View>
                    ) : (
                        <View />
                    )}
                </Card>
            </View>
        );
    }
}

export default LeaderBoard;

const styles = StyleSheet.create({
    subTitle: {
        fontWeight: "bold",
    },
});
