import { TimeLeft } from "../screens/home/types";

export class TimeUtils {
  static getTimeLeftUntilMidnight(): TimeLeft {
  const now = new Date();
  const midnight = new Date();

  midnight.setHours(24, 0, 0, 0);

  const diffMs = midnight.getTime() - now.getTime();
  const hours = Math.floor(diffMs / 1000 / 60 / 60);
  const minutes = Math.floor((diffMs / 1000 / 60) % 60);
  const seconds = Math.floor((diffMs / 1000) % 60);

  return { hours, minutes, seconds };
}
}