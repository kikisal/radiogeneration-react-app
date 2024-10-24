import { Dimensions, Image, StyleSheet, Text, View, Linking, Touchable, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import { RowView } from "./RowView";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { CustomSlider } from "./CustomSlider";
import { useState } from "react";
/*
<TouchableOpacity onPress={() => {
    Linking.openURL("https://www.radiogeneration.it")
}}>
    <ThemedText style={styles.radioLink}>RadioGeneration</ThemedText>
</TouchableOpacity>

*/
export function BoxRadioCover() {

    const { width }     = Dimensions.get('window');
    const scaledWidth   = width * 0.85; // Adjust the multiplier as needed for size

    return <View style={[styles.boxWrapper, {position: "relative", zIndex: 4}]}>
        <View style={styles.boxContent}>
            <RowView style={[{justifyContent: "flex-end"}, styles.coverHeadStyle]}>
                
                <AntDesign name="hearto" size={16} color="#fff" />
            </RowView>
            
            <Image resizeMode="cover" source={require("../assets/images/radiocoverimage.png")} style={[{width: scaledWidth, height: scaledWidth}, styles.coverImage]}></Image>
            <RowView style={{paddingHorizontal: 12, paddingVertical: 10}}>
                <TouchableOpacity>
                    <MaterialIcons name="volume-up" size={24} color="#fff" style={{marginRight: 16}} />
                </TouchableOpacity>
                <CustomSlider value={1}></CustomSlider>
            </RowView>
        </View>   
    </View>
}

const styles = StyleSheet.create({
    boxWrapper: {
        marginTop: 10,
        borderColor: "#000",
        borderRadius: 20,    
        backgroundColor: '#00000040',
        elevation: 10
    },

    coverHeadStyle: {
        paddingLeft: 12,
        paddingRight: 14,
        paddingVertical: 12
    },

    boxContent: {
        width: "100%",
        borderRadius: 16,
        overflow: "hidden",
        elevation: 120,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },

    radioLink: {
        fontSize: 23,
        lineHeight: 35,
        color: "#fff",
        paddingTop: 2,
        fontFamily: "ArchitectsDaughter_400Regular",
        textShadowColor: "rgba(0,0,0,.4)",
        textShadowRadius: 16
    },
    coverImage: {
    }
});