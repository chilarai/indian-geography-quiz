import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Header, Icon, Text } from "react-native-elements";

class Landing extends React.Component {
    navigateToCategories = () => {
        console.log(this.props);
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
                        source={require("../assets/google/btn_google_signin_dark_normal_web.png")}
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
        marginTop: 170,
        alignSelf: "center",
    },

    google: {
        marginTop: 10,
        width: 191,
        height: 46,
        alignSelf: "center",
    },

    logo: {
        height: 111,
        width: 250,
        alignSelf: "center",
        marginTop: 100,
    },
});
