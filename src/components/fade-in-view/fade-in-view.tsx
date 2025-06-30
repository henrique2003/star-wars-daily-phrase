import Animated, { FadeIn } from "react-native-reanimated"
import { FadeInProps } from "./types"

export const FadeInView: React.FC<FadeInProps> = ({ children, seconds }) => {
  return (
    <Animated.View entering={FadeIn.duration(seconds * 1000)} className="flex-1 w-full">
      {children}
    </Animated.View>
  )
}
