import { PanResponder, StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { useCallback, useEffect, useRef, useState } from "react";
import TrackPlayer from "react-native-track-player";

export function CustomSlider({value, muted}: {value: number, muted?: boolean}) {

    const [sliderPosition, setSliderPosition] = useState(Math.min(value, .98));

    TrackPlayer.setVolume(Math.min(sliderPosition, .98)).then(e => {}).catch(ex => {});
  

    let sliderWidth = 0;

    const sliderRef    = useRef<View | null>(null);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (evt: any, gestureState: any) => {
                if (!sliderRef || !sliderRef.current) 
                    return;

                sliderRef.current.measure((fx, fy, width, height, px, py) => {
                    const relativeX = gestureState.moveX - px;
                    const newPos = Math.min(relativeX / Math.max(sliderWidth, .01), .98);
                    if (relativeX >= 0 && relativeX <= sliderWidth) {
                        setSliderPosition(newPos);
                        TrackPlayer.setVolume(newPos);
                    }
                });
            },
            onPanResponderRelease: () => {

            },
        })
    ).current;


    const handleLayout = useCallback((event: any) => {
        const { width } = event.nativeEvent.layout;
        sliderWidth = width;
    }, []);

    return (
        <View style={{flex: 1, height: 26}} ref={sliderRef} {...panResponder.panHandlers}>
            <View style={styles.bar} onLayout={handleLayout}>
                <View style={[styles.ball, {left: `${sliderPosition * 100}%`}]} ></View>
                <View style={[styles.fillerBar, {width: `${(sliderPosition * 100)+.8}%`}]}></View>
            </View>
        </View>    
    );
}

const styles = StyleSheet.create({
    bar: {
        width: "100%",
        height: 3,
        backgroundColor: "#ffffff40",
        borderRadius: 12,
        position: "absolute",
        top: "50%",
        left: 0,
        transform: [{translateY: -3/2}]
    },

    ball: {
        position: "absolute",
        width: 12,
        height: 12,
        backgroundColor: "#fff",
        top: "50%",
        left: 0,
        transform: [{translateY: -12/2}, {translateX: -12/2}],
        borderRadius: 20
    },

    fillerBar: {
        position: "absolute",
        width: "33.8%",
        height: 3,
        backgroundColor: "#fff",
        top: "50%",
        left: 0,
        transform: [{translateY: -3/2}, {translateX: 0}],
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        
    }
})