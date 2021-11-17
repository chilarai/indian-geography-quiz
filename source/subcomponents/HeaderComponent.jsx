import React from "react";
import { View } from "react-native";
import { Header, Icon, Text } from "react-native-elements";

class Head extends React.Component {
    componentDidMount = () => {};

    navigateToLeaderBoards = () => {
        this.props.navigation.navigate("LeaderBoard");
    };

    render() {
        return (
            <View>
                <Header
                    leftComponent={
                        <Icon name="home" type="font-awesome" color="white" />
                    }
                    centerComponent={
                        <Text h4 style={{ color: "white" }}>
                            My Score: 20
                        </Text>
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
