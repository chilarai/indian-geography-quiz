import React from "react";
import API from "./subcomponents/API";
import { View, Text, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Column as Col, Row } from "react-native-flexbox-grid";

import * as Constants from "./subcomponents/Constants";

class QuizScreen extends React.Component {
    state = {
        counter: 0,
        totalQuizzes: 0,
        currentQuiz: [],
        currentRightAnswer: "",
        currentOptions: [],
        currentImage: "",
        optionsSize: 0,
    };

    componentDidMount = async () => {
        try {
            const quizzes = await AsyncStorage.getItem("@quizzes");
            var currentQuiz = JSON.parse(quizzes);

            var counter = this.state.counter;

            this.setState({
                currentQuiz: currentQuiz,
                optionsSize: currentQuiz[counter].Options.size,
                currentRightAnswer: currentQuiz[counter].RightOption,
                currentOptions: currentQuiz[counter].Options,
                currentImage: currentQuiz[counter].ImageLink,
                maxSize: currentQuiz.size,
            });
        } catch (e) {
            console.log("Error Quiz", e);
        }
    };

    skipQuiz = () => {
        var counter = this.state.counter;
        counter++;

        if (counter < this.state.totalQuizzes) {
            this.setState({
                currentQuiz: currentQuiz,
                optionsSize: currentQuiz[counter].Options.size,
                currentRightAnswer: currentQuiz[counter].RightOption,
                currentOptions: currentQuiz[counter].Options,
                currentImage: currentQuiz[counter].ImageLink,
                counter: counter,
            });
        }
    };

    nextQuiz = () => {
        var counter = this.state.counter;
        counter++;

        if (counter < this.state.totalQuizzes) {
            this.setState({
                currentQuiz: currentQuiz,
                optionsSize: currentQuiz[counter].Options.size,
                currentRightAnswer: currentQuiz[counter].RightOption,
                currentOptions: currentQuiz[counter].Options,
                currentImage: currentQuiz[counter].ImageLink,
                counter: counter,
            });
        }
    };

    render() {
        return (
            <View>
                <Image source={this.state.currentImage} />
                <Row size={12}>
                    <Col sm={6} md={6} lg={6}>
                        <Text>{this.state.currentOptions[0]}</Text>
                    </Col>
                    <Col sm={6} md={6} lg={6}>
                        <Text>{this.state.currentOptions[1]}</Text>
                    </Col>
                </Row>

                <Row size={12}>
                    <Col sm={6} md={6} lg={6}>
                        <Text>{this.state.currentOptions[2]}</Text>
                    </Col>
                    <Col sm={6} md={6} lg={6}>
                        <Text>{this.state.currentOptions[3]}</Text>
                    </Col>
                </Row>
            </View>
        );
    }
}

export default QuizScreen;
