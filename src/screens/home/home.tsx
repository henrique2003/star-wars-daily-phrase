import { banner, logoTransparent } from "@/src/assets";
import { quotes } from "@/src/conts/quotes";
import React, { useEffect, useMemo, useState } from "react";
import { Text, View, TouchableOpacity, ImageBackground, SafeAreaView, Image } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

type TimeLeft = {
  hours: number;
  minutes: number;
  seconds: number;
};

export const Home: React.FC = () => {
  const [revealed, setRevealed] = useState(false);
  const [lastRevealDate, setLastRevealDate] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeftUntilMidnight());
  const todayKey = new Date().toDateString();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const quote = useMemo(() => getQuoteOfTheDay(), [todayKey]);
  const color = useMemo(() => quote.color, [quote.color]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft = getTimeLeftUntilMidnight();
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        setRevealed(false);
        setLastRevealDate(null);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const today = new Date().toDateString();

    if (lastRevealDate && lastRevealDate !== today) {
      setRevealed(false);
      setLastRevealDate(null);
    }
  }, [lastRevealDate]);

  const handleReveal = () => {
    const today = new Date().toDateString();

    setLastRevealDate(today);
    setRevealed(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 items-center justify-center px-0 w-full">
        {!revealed && (
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
        )}

        {revealed && (
          <Animated.View entering={FadeIn.duration(1000)} className="flex-1 w-full">
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
              <View>
                <Text className="text-white text-sm italic text-center px-4">
                  Espere
                  <Text style={{ color }}> {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s </Text>
                  para a próxima frase!
                </Text>
              </View>
            </ImageBackground>
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
};

function getTimeLeftUntilMidnight(): TimeLeft {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  const diffMs = midnight.getTime() - now.getTime();

  const hours = Math.floor(diffMs / 1000 / 60 / 60);
  const minutes = Math.floor((diffMs / 1000 / 60) % 60);
  const seconds = Math.floor((diffMs / 1000) % 60);

  return { hours, minutes, seconds };
}

function getQuoteOfTheDay() {
  const day = new Date().getDate();
  return quotes[day % quotes.length];
}
