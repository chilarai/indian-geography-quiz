import React from "react";
import API from "./subcomponents/API";
import Head from "./subcomponents/HeaderComponent";
import { View, StyleSheet, Text } from "react-native";
import { Avatar, ListItem, Card } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as Constants from "./subcomponents/Constants";

class LeaderBoard extends React.Component {
    state = {
        leaderboards: [],
    };

    componentDidMount = async () => {
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

            const categoryID = await AsyncStorage.getItem("@categoryID");

            var options = {
                UserID: Constants.USERID,
                CategoryID: parseInt(categoryID),
                SessionKey: Constants.SESSIONKEY,
                QuizDate: formatTodayDate,
            };

            const response = await API.post("/leaderboard", options);

            if (response.data.status.code === 200) {
                this.setState({ leaderboards: response.data.data });
            }
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        return (
            <View>
                <Head navigation={this.props.navigation} newScore={-2} />
                <Card>
                    <Card.Title>Day's top scorers</Card.Title>
                    <Card.Divider />
                    {this.state.leaderboards.map((value, key) => (
                        <ListItem key={key} bottomDivider>
                            <Text>
                                {key + 1} {"."}
                            </Text>
                            <Avatar source={require("../assets/test/1.png")} />
                            <ListItem.Content>
                                <ListItem.Title>{value.Name}</ListItem.Title>
                                <ListItem.Subtitle style={styles.subTitle}>
                                    {value.Score}
                                </ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    ))}
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
