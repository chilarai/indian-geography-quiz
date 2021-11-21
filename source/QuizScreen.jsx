import React from "react";
import API from "./subcomponents/API";
import Head from "./subcomponents/HeaderComponent";
import { View, StyleSheet } from "react-native";
import { Column as Col, Row } from "react-native-flexbox-grid";

import { Button, Chip, Card, Divider } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as Constants from "./subcomponents/Constants";
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
        tmpScore: 0,
        sessionKey: "",
        userID: 0,
        categoryID: 0,
        quizzes: {},
        title: "",
    };

    componentDidMount = async () => {
        let sessionKey = await AsyncStorage.getItem("sessionKey");
        let userID = await AsyncStorage.getItem("userID");
        let categoryID = await AsyncStorage.getItem("categoryID");
        let quizzes = await AsyncStorage.getItem("quizzes");
        let tmpScore = await AsyncStorage.getItem("score");

        this.setState({
            sessionKey,
            userID,
            categoryID,
            quizzes,
            tmpScore,
        });

        try {
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
                title: currentQuiz[counter].Title,
                totalQuizzes: currentQuiz.length,
                sessionKey: sessionKey,
                userID: userID,
                categoryID: categoryID,
            });
        } catch (e) {
            console.log("Error Quiz", e);
        }
    };

    navigateToSubCategories = () => {
        this.props.navigation.navigate("SubCategories");
    };

    skipQuiz = () => {
        var counter = this.state.counter;
        counter++;

        var currentQuiz = this.state.currentQuiz;

        // navigate to sub categories if quizzes are over
        if (counter === this.state.totalQuizzes) {
            this.navigateToSubCategories();
        }

        if (counter < this.state.totalQuizzes) {
            this.setState({
                currentQuiz: currentQuiz,
                optionsSize: currentQuiz[counter].Options.length,
                currentRightAnswer: currentQuiz[counter].RightOption,
                currentOptions: currentQuiz[counter].Options,
                currentImage: currentQuiz[counter].ImageLink,
                title: currentQuiz[counter].Title,
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

            const categoryID = this.state.categoryID;

            var options = {
                SessionKey: this.state.sessionKey,
                CategoryID: parseInt(categoryID),
                UserID: parseInt(this.state.userID),
            };

            await API.post("/updatescore", options);

            let score = await AsyncStorage.getItem("score");
            let updatedScore = parseInt(score) + 1;
            await AsyncStorage.setItem("score", updatedScore.toString());
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

        // navigate to sub categories if quizzes are over
        if (counter === this.state.totalQuizzes) {
            this.navigateToSubCategories();
        }

        if (counter < this.state.totalQuizzes) {
            this.setState({
                currentQuiz: currentQuiz,
                optionsSize: currentQuiz[counter].Options.length,
                currentRightAnswer: currentQuiz[counter].RightOption,
                currentOptions: currentQuiz[counter].Options,
                currentImage: currentQuiz[counter].ImageLink,
                title: currentQuiz[counter].Title,
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
                            titleStyle={{ fontSize: 12 }}
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
                            titleStyle={{ fontSize: 12 }}
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
                    tmpScore={this.state.updatedScore}
                />
                <Card>
                    <Card.Title>
                        {this.state.counter +
                            1 +
                            "/" +
                            this.state.totalQuizzes +
                            " " +
                            this.state.title}
                    </Card.Title>
                    <Card.Divider />
                    {/* <Image source={this.state.currentImage} /> */}
                    <Card.Image
                        source={{
                            uri: Constants.BASE_URL + this.state.currentImage,
                        }}
                    />

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

                {this.state.totalQuizzes === this.state.counter + 1 ? (
                    <Button
                        title="Play new quiz"
                        type="solid"
                        onPress={() => this.navigateToSubCategories()}
                    />
                ) : (
                    <View />
                )}
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
