import { router } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function NotificationClick() {
    useEffect(() => {
        router.navigate("/");
    }, []);

    return (<>
        <View style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            backgroundColor: "#000",
            zIndex: 2,
            opacity: .8,
        }}></View>
        <Image source={require("./../assets/images/radiocoverimage-blurred.jpg")} style={styles.blurredImage}/>
    </>);
}

const styles = StyleSheet.create({
    blurredImage: {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: 1,
        elevation: 12
    }
})