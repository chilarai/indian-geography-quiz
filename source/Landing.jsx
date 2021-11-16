import React from "react";
import { View, StyleSheet, Text, Image, Button } from "react-native";
// import { Button } from "react-native-elements";

class Landing extends React.Component {
    navigateToMobile = () => {
        this.props.navigation.navigate("Login");
    };
    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require("../assets/images/igq.png")}
                />
                <Button
                    title="Proceed"
                    size={15}
                    onPress={() => this.navigateToMobile()}
                />
            </View>
        );
    }
}

export default Landing;

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white",
    },
    logo: {
        width: 580,
        height: 258,
    },
});
