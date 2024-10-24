import { useFonts } from "expo-font";
import { Poppins_400Regular, Poppins_300Light, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic} from '@expo-google-fonts/poppins'
import { AllertaStencil_400Regular } from '@expo-google-fonts/allerta-stencil'
import { ArchitectsDaughter_400Regular } from '@expo-google-fonts/architects-daughter'
import { SplashScreen, Stack } from "expo-router";

import { useEffect } from "react";
import TrackPlayer from "react-native-track-player";
import { PlaybackService } from "@/services/audio-player";

const streamingUrl = "http://78.129.132.7:7708/;";

TrackPlayer.registerPlaybackService(() => PlaybackService);


export default function RootLayout() {

  const [loaded, error] = useFonts({
    Poppins_400Regular, 
    Poppins_400Regular_Italic, 
    Poppins_600SemiBold_Italic, 
    Poppins_600SemiBold, 
    Poppins_300Light, 
    ArchitectsDaughter_400Regular,
    AllertaStencil_400Regular
  });

  useEffect(() => {
      if (loaded || error) {
        SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="(home)" />
    </Stack>
  );
}
