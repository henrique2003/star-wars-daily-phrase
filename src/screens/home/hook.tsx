import { quotes } from "@/src/conts/quotes";
import { TimeUtils } from "@/src/utils";
import { useEffect, useMemo, useState } from "react";
import { TimeLeft } from "./types";

export const useHome = () => {
  const [revealed, setRevealed] = useState(false);
  const [lastRevealDate, setLastRevealDate] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(TimeUtils.getTimeLeftUntilMidnight());

  const todayKey = new Date().toDateString();

  const quote = useMemo(() => {
    const day = new Date().getDate();
    
    return quotes[day % quotes.length];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todayKey]);

  const color = useMemo(() => quote.color, [quote.color]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft = TimeUtils.getTimeLeftUntilMidnight();
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

  return {
    revealed,
    timeLeft,
    quote,
    color,
    handleReveal,
  }
}