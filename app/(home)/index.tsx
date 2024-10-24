import { ActivityIndicator, Button, Image, Linking, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useEffect, useState } from "react";
import TrackPlayer, { AppKilledPlaybackBehavior, Capability, State, usePlaybackState, usePlayWhenReady } from "react-native-track-player";
import { ThemedText } from "@/components/ThemedText";
import { BoxRadioCover } from "@/components/BoxRadioCover";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import { RowView } from "@/components/RowView";
import Foundation from '@expo/vector-icons/Foundation';
import Feather from '@expo/vector-icons/Feather';
import Fontisto from '@expo/vector-icons/Fontisto';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// <Feather name="repeat" size={24} color="black" />
// <Fontisto name="equalizer" size={24} color="black" />
// <MaterialIcons name="my-library-music" size={24} color="black" />
// <MaterialIcons name="queue-music" size={24} color="black" />

const streamingUrl = "http://78.129.132.7:7708/;";

export default function Index() {

  const { state }     = usePlaybackState();
  const playWhenReady = usePlayWhenReady();

  const [firstInit, setFirstInit] = useState(true);

  const handlePlayButton = async () => {
    if (state == State.Playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  }

  useEffect(() => {
    if (firstInit)
      setupPlayer();

  }, [firstInit]);

  async function setupPlayer() {
    try {
        await TrackPlayer.setupPlayer();

        await TrackPlayer.updateOptions({
            android: {
                appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification
            },
            
            capabilities: [
              Capability.Play,
              Capability.Pause,
              Capability.Stop, 
            ],
            
            compactCapabilities: [
              Capability.Play,
              Capability.Pause,
            ],
    
            notificationCapabilities: [
              Capability.Play,
              Capability.Pause,
            ],
        });


        await TrackPlayer.add({
            id: 'live-stream',
            url: streamingUrl,
            title: 'Radio Generation',
            artist: 'Streaming',
        });

        await TrackPlayer.play();

    } catch(ex) {
        // fetch("/")
        console.log("something went wrong in seting up player: ", ex);
    } finally {
      setFirstInit(false);
    }
  }


  const loading = playWhenReady && (state == State.Loading || state === State.Buffering);
  const playing = playWhenReady && !(state === State.Error || state === State.Buffering);

  return (
    <>
      <SafeAreaView style={[{flex: 1}, {position: "relative", zIndex: 4}]}>
        <StatusBar
          animated={true}
          barStyle={"light-content"}
          showHideTransition={"fade"}
          hidden={false}
        />
        <View style={styles.container}>
          <View style={styles.headTextWrapper}>
            <TouchableOpacity onPress={() => {Linking.openURL("https://www.radiogeneration.it/")}}>
              <ThemedText style={[styles.radioGenerationHeadText]}>Radio Generation</ThemedText>
              <ThemedText style={[styles.sloganText]}>La radio che si vede</ThemedText>
            </TouchableOpacity>
          </View>
          <BoxRadioCover></BoxRadioCover>
          <View style={{marginVertical: 30, paddingVertical: 15, width: "82%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
            <RowView style={{justifyContent: "space-between", top: 0, position: "absolute", width: "100%", left: 0}}>
              <TouchableOpacity>
                <MaterialIcons name="my-library-music" size={25} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Fontisto name="equalizer" size={20} color="#fff" />
              </TouchableOpacity>
            </RowView>
            <RowView style={{justifyContent: "space-between", bottom: 0, position: "absolute", width: "100%", left: 0}}>
              <TouchableOpacity>
                <Feather name="repeat" size={22} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons name="queue-music" size={27} color="#fff" />
              </TouchableOpacity>
            </RowView>
            <RowView style={{alignItems: "center"}}>
              <TouchableOpacity style={{}}>
                <FontAwesome name="step-forward" style={{marginRight: 36, transform: [{rotate: "180deg"}]}} size={23} color="#fff"/>
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePlayButton} style={{display: "flex"}}>
                <View style={styles.playWrapper}>
                  {loading ? <ActivityIndicator size={50} color={"#fff"}></ActivityIndicator> : (playing ? 
                    (<MaterialCommunityIcons name="pause" style={{marginLeft: 0, marginTop: 0}} size={52} color="#fff" />) : 
                    (<FontAwesome name="play" size={36} style={{marginLeft: 7, marginTop: -2}} color="#fff" />)
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome name="step-forward" style={{marginLeft: 36}} size={23} color="#fff"/>
              </TouchableOpacity>
            </RowView>
          </View>
          
          <View style={{opacity: .5, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <ThemedText style={styles.playerTextStyle}>Player</ThemedText>
            <RowView style={{marginVertical: 10}}>
              <RowView style={{marginRight: 14, marginTop: 5}}>
                <FontAwesome5 name="android" size={20} style={{marginRight: 10}} color="#75BC54" />
                <ThemedText style={{color: "#fff"}}>android</ThemedText>
              </RowView>
              <RowView>
                <AntDesign name="apple1" size={20} style={{marginRight: 8}} color="#fff" />
                <ThemedText style={{color: "#fff", marginTop: 4}}>Apple</ThemedText>
              </RowView>  
            </RowView>
              <TouchableOpacity onPress={() => {Linking.openURL("https://www.radiogeneration.it/")}}>
                <RowView>
                  <Foundation name="web" size={22} style={{marginRight: 10}} color="#fff" />
                  <ThemedText style={{color: "#fff", marginTop: 4}}>Web</ThemedText>  
                </RowView>  
              </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

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
      <Image source={require("./../../assets/images/radiocoverimage-blurred.jpg")} style={styles.blurredImage}/>  
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 20
  },
  
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  blurredImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    zIndex: 1,
    elevation: 12
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  
  link: {
    backgroundColor: "#000",
    color: "#fff",
  },

  radioGenerationHeadText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#fff",
    textTransform: "uppercase",
    paddingHorizontal: 5,
    fontSize: 18,
    lineHeight: 26,
    textAlign: "center",
  },

  sloganText: {
    textAlign: "center",
    fontFamily: "Poppins_300Light",
    color: "#e4e4e4",
    textTransform: "uppercase",
    fontSize: 14,
    lineHeight: 18,
  },

  headTextWrapper: {
    paddingVertical: 10,
  },

  playWrapper: {
    width: 78,
    height: 78,
    borderColor: "#ffffff",
    borderWidth: 2,
    borderRadius: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  playerTextStyle: {
    color: "#FFF",
    textTransform: "uppercase",
    fontFamily: "AllertaStencil_400Regular",
    fontSize: 26,
    lineHeight: 33,
    opacity: 1,

  }
})
