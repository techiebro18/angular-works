export default class DateUtils {
  static ConvertHoursToSplitTime(numberOfHours: number): {
    hours: number;
    minutes: number;
    days: number;
  } {
    const days = Math.floor(numberOfHours / 24);
    const remainder = numberOfHours % 24;
    const hours = Math.floor(remainder);
    const minutes = Math.floor(60 * (remainder - hours));

    return { days, hours, minutes };
  }

  static DiscardTimezone(d: Date): string {
    return d.toISOString().split('.')[0];
  }
}
