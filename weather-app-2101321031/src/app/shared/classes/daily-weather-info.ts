import { LocationInfo } from './location-info';

export class DailyWeatherInfo {
  minTemperature: number;
  maxTemperature: number;
  location: LocationInfo;
  date: Date;
  iconName: String;

  constructor(
    minTemperature: number,
    maxTemperature: number,
    location: LocationInfo,
    date: Date,
    iconName: String
  ) {
    this.minTemperature = minTemperature;
    this.maxTemperature = maxTemperature;
    this.location = location;
    this.date = date;
    this.iconName = iconName;
  }
}
