import React from "react";
import API from "./subcomponents/API";
import Head from "./subcomponents/HeaderComponent";
import { View, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Column as Col, Row } from "react-native-flexbox-grid";

import * as Constants from "./subcomponents/Constants";
import { Button, Chip, Card, Divider, Image } from "react-native-elements";

class QuizScreen extends React.Component {
    state = {
        counter: 0,
        totalQuizzes: 0,
        totalRows: 0,
        currentQuiz: [],
        currentRightAnswer: "",
        currentOptions: [],
        currentImage: "",
        optionsSize: 0,

        message: "",
        icon: "",
        showSkip: true,
        showMessage: false,

        updatedScore: 0,
    };

    componentDidMount = async () => {
        try {
            const quizzes = await AsyncStorage.getItem("@quizzes");
            var currentQuiz = JSON.parse(quizzes);

            var counter = this.state.counter;

            let totalRows =
                currentQuiz[counter].Options.length / 2 +
                (currentQuiz[counter].Options.length % 2);

            this.setState({
                currentQuiz: currentQuiz,
                optionsSize: currentQuiz[counter].Options.length,
                totalRows: totalRows,
                currentRightAnswer: currentQuiz[counter].RightOption,
                currentOptions: currentQuiz[counter].Options,
                currentImage: currentQuiz[counter].ImageLink,
                totalQuizzes: currentQuiz.length,
            });
        } catch (e) {
            console.log("Error Quiz", e);
        }
    };

    skipQuiz = () => {
        var counter = this.state.counter;
        counter++;

        var currentQuiz = this.state.currentQuiz;

        if (counter < this.state.totalQuizzes) {
            this.setState({
                currentQuiz: currentQuiz,
                optionsSize: currentQuiz[counter].Options.length,
                currentRightAnswer: currentQuiz[counter].RightOption,
                currentOptions: currentQuiz[counter].Options,
                currentImage: currentQuiz[counter].ImageLink,
                counter: counter,
                showMessage: false,
                showSkip: true,
            });
        }
    };

    checkAnswer = async (answer) => {
        if (answer === this.state.currentRightAnswer) {
            this.setState({
                message: "Correct answer",
                backcolor: "green",
                icon: "check-circle",
                showMessage: true,
                showSkip: false,
            });

            const categoryID = await AsyncStorage.getItem("@categoryID");

            var options = {
                SessionKey: Constants.SESSIONKEY,
                CategoryID: parseInt(categoryID),
                UserID: Constants.USERID,
            };

            await API.post("/updatescore", options);

            var updatedScore = this.state.updatedScore + 1;
            this.setState({ updatedScore });
        } else {
            this.setState({
                message:
                    "Wrong answer. Correct answer is " +
                    this.state.currentRightAnswer,
                backcolor: "red",
                icon: "times-circle",
                showMessage: true,
                showSkip: false,
            });
        }

        setTimeout(() => {
            this.nextQuiz();
        }, 1000);
    };

    nextQuiz = () => {
        var counter = this.state.counter;
        counter++;

        var currentQuiz = this.state.currentQuiz;

        if (counter < this.state.totalQuizzes) {
            this.setState({
                currentQuiz: currentQuiz,
                optionsSize: currentQuiz[counter].Options.length,
                currentRightAnswer: currentQuiz[counter].RightOption,
                currentOptions: currentQuiz[counter].Options,
                currentImage: currentQuiz[counter].ImageLink,
                counter: counter,
                showMessage: false,
                showSkip: true,
            });
        }
    };

    render() {
        let rows = [];
        for (let i = 0; i < this.state.totalRows; i++) {
            rows.push(
                <Row size={12} key={i}>
                    <Col sm={6} md={6} lg={6} style={styles.option}>
                        <Button
                            title={this.state.currentOptions[i * 2]}
                            type="outline"
                            onPress={() =>
                                this.checkAnswer(
                                    this.state.currentOptions[i * 2]
                                )
                            }
                            disabled={this.state.showMessage}
                        ></Button>
                    </Col>
                    <Col sm={6} md={6} lg={6} style={styles.option}>
                        <Button
                            title={this.state.currentOptions[i * 2 + 1]}
                            type="outline"
                            onPress={() =>
                                this.checkAnswer(
                                    this.state.currentOptions[i * 2 + 1]
                                )
                            }
                            disabled={this.state.showMessage}
                        ></Button>
                    </Col>
                </Row>
            );
        }

        return (
            <View>
                <Head
                    navigation={this.props.navigation}
                    newScore={this.state.updatedScore}
                />
                <Card>
                    <Card.Title>Identify the district</Card.Title>
                    <Card.Divider />
                    {/* <Image source={this.state.currentImage} /> */}
                    <Card.Image source={require("../assets/test/1.png")} />

                    <Divider style={styles.divider} />
                    <View style={styles.rows}>{rows}</View>

                    <View style={styles.skip}>
                        {this.state.showSkip ? (
                            <Button
                                title="Skip"
                                type="solid"
                                onPress={() => this.skipQuiz()}
                            />
                        ) : (
                            <View />
                        )}
                    </View>

                    <View style={styles.message}>
                        {this.state.showMessage ? (
                            <Chip
                                title={this.state.message}
                                icon={{
                                    name: this.state.icon,
                                    type: "font-awesome",
                                    size: 20,
                                    color: "white",
                                }}
                            />
                        ) : (
                            <View />
                        )}
                    </View>
                </Card>
            </View>
        );
    }
}

export default QuizScreen;

const styles = StyleSheet.create({
    divider: {
        marginTop: 10,
    },
    map: {
        height: 100,
        width: 100,
    },
    rows: {
        marginTop: 10,
    },
    skip: {
        marginTop: 10,
    },
    message: {
        marginTop: 10,
    },
    option: {
        padding: 5,
    },
});
