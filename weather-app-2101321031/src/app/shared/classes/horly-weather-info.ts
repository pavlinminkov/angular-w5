export class HourlyWeatherInfo {
  temperature: number;
  time: Date;
  iconName: String;

  constructor(temperature: number, time: Date, iconName: String) {
    this.temperature = temperature;
    this.time = time;
    this.iconName = iconName;
  }
}
