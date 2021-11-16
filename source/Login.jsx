import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";

class Login extends React.Component {
    navigateToSelector = () => {
        this.props.navigation.navigate("Categories");
    };

    render() {
        return (
            <View>
                <TouchableOpacity onPress={() => this.navigateToSelector()}>
                    <Image
                        style={styles.google}
                        source={require("../assets/google/btn_google_signin_dark_focus_web.png")}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

export default Login;

const styles = StyleSheet.create({
    google: {
        width: 191,
        height: 46,
    },
});
