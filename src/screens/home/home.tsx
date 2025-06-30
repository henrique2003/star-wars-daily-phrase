import { Text, View, TouchableOpacity, ImageBackground, SafeAreaView, Image } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { banner, logoTransparent } from "@/src/assets";
import { useHome } from "./hook";
import { FadeInView } from "@/src/components";

export const Home: React.FC = () => {
  const {
    color,
    handleReveal,
    revealed,
    timeLeft,
    quote,
    goBack
  } = useHome()

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 items-center justify-center px-0 w-full">
        {!revealed && (
          <FadeInView seconds={1}>
            <ImageBackground
              source={banner}
              className="flex-1 justify-center items-center w-full"
              imageStyle={{ opacity: 0.3 }}
            >
              <Image source={logoTransparent} className="w-40 h-40" />
              <TouchableOpacity
                  onPress={handleReveal}
                  className="bg-transparent border border-blue-200 px-10 py-3 rounded-full mt-16"
                >
                  <Text className="text-blue-100 font-bold text-lg">Frase do dia
                    <Text className="text-blue-300">!</Text>
                  </Text>
                </TouchableOpacity>
            </ImageBackground>
          </FadeInView>
        )}

        {revealed && (
          <FadeInView seconds={1}>
            <ImageBackground
              source={quote.image}
              className="flex-1 justify-between items-center w-full py-6"
              imageStyle={{ opacity: 0.3 }}
            >
              <View />
              <View className="w-full items-center justify-center">
                <Text className="text-white text-2xl italic text-center px-4">
                  <Text style={{ color }}>“</Text>
                  {quote.text}
                  <Text style={{ color }}>”</Text>
                </Text>
                <Text className="text-white text-lg font-bold">- {quote.author}</Text>
              </View>
              <View className="justify-between items-center flex-row w-full px-6">
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={goBack}
                  className="opacity-50"
                >
                  <AntDesign name="arrowleft" size={17} color="white" />
                </TouchableOpacity>
                <Text className="text-white text-sm italic text-center px-4">
                  Espere
                  <Text style={{ color }}> {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s </Text>
                  para a próxima frase!
                </Text>
                <View></View>
              </View>
            </ImageBackground>
          </FadeInView>
        )}
      </View>
    </SafeAreaView>
  );
};
