import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";

class Landing extends React.Component {
    navigateToCategories = () => {
        this.props.navigation.navigate("Categories");
    };

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require("../assets/images/igq.png")}
                />

                {/* <Divider style={styles.dividerStyle} /> */}
                <Text style={styles.info}>Sign in to continue</Text>
                <TouchableOpacity onPress={() => this.navigateToCategories()}>
                    <Image
                        style={styles.google}
                        source={require("../assets/images/google.png")}
                    />
                </TouchableOpacity>
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

    dividerStyle: {
        marginTop: 150,
    },

    info: {
        marginTop: 100,
        alignSelf: "center",
        fontSize: 18,
    },

    google: {
        marginTop: 10,
        width: 250,
        height: 60,
        alignSelf: "center",
    },

    logo: {
        height: 250,
        width: 350,
        alignSelf: "center",
        marginTop: 100,
    },
});
