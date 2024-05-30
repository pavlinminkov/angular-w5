import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HourlyWeatherInfo } from '../classes/horly-weather-info';
import { WeatherType } from '../enums/weather-type.enum';
import { LocationInfo } from '../classes/location-info';
import { DailyWeatherInfo } from '../classes/daily-weather-info';
import { RainData } from '../classes/rain-data';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl = 'https://api.open-meteo.com/v1/forecast';

  private http = inject(HttpClient);

  public getHourlyWeather(
    location: LocationInfo,
    date: string
  ): Observable<HourlyWeatherInfo[]> {
    const url = `${this.apiUrl}?latitude=${location.latitude}&longitude=${location.longitude}&hourly=temperature_2m,weather_code&timezone=auto&start_date=${date}&end_date=${date}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        const hourlyWeather: HourlyWeatherInfo[] = [];
        const hourlyData = response.hourly;
        for (let i = 8; i <= 22; i += 2) {
          const index = response.hourly.time.findIndex((time: string) =>
            time.endsWith(`T${i.toString().padStart(2, '0')}:00`)
          );
          if (index !== -1) {
            this.mapTimeToHourlyWeatherInfo(hourlyData, index, hourlyWeather);
          }
        }
        return hourlyWeather;
      })
    );
  }

  public getDailyWeather(
    location: LocationInfo,
    startDate: string,
    endDate: string
  ): Observable<DailyWeatherInfo[]> {
    const url = `${this.apiUrl}?latitude=${location.latitude}&longitude=${location.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&start_date=${startDate}&end_date=${endDate}`;

    return this.http.get<any>(url).pipe(
      map((response) => {
        const dailyWeather: DailyWeatherInfo[] = [];
        const dailyData = response.daily;
        for (let i = 0; i < dailyData.time.length; i++) {
          dailyWeather.push(
            this.mapDailyToDailyWeatherInfo(dailyData, i, location)
          );
        }
        return dailyWeather;
      })
    );
  }

  public getRainData(location: LocationInfo): Observable<RainData> {
    let dates = this.getPreviousMonthRange();
    const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${location.latitude}&longitude=${location.longitude}&start_date=${dates.firstDay}&end_date=${dates.lastDay}&daily=precipitation_sum&timezone=auto`;

    return this.http.get<any>(url).pipe(
      map((response) => {
        const daily = response.daily;
        return new RainData(daily.time, daily.precipitation_sum);
      })
    );
  }

  public getIconName(weather_code: number): string {
    switch (weather_code) {
      case WeatherType.ClearSky:
        return 'sunny';
      case WeatherType.MainlyClear:
      case WeatherType.PartlyCloudy:
        return 'partly_cloudy_day';
      case WeatherType.Overcast:
      case WeatherType.RainSlight:
      case WeatherType.RainModerate:
      case WeatherType.RainHeavy:
      case WeatherType.RainShowersSlight:
      case WeatherType.RainShowersModerate:
      case WeatherType.RainShowersViolent:
        return 'rainy';
      case WeatherType.Fog:
      case WeatherType.DepostingRimeFog:
        return 'foggy';
      case WeatherType.FreezingDrizzleLight:
      case WeatherType.FreezingDrizzleDense:
      case WeatherType.FreezingRainLight:
      case WeatherType.FreezingRainHeavy:
      case WeatherType.SnowGrains:
      case WeatherType.SnowFallSlight:
      case WeatherType.SnowFallModerate:
      case WeatherType.SnowFallHeavy:
      case WeatherType.SnowShowersSlight:
      case WeatherType.SnowShowersHeavy:
        return 'cloudy_snowing';
      case WeatherType.ThunderstormSlightOrModerate:
      case WeatherType.ThunderstormSlightHail:
      case WeatherType.ThunderstormHeavyHail:
        return 'thunderstorm';
      default:
        return 'question_mark';
    }
  }

  private mapTimeToHourlyWeatherInfo(
    hourlyData: any,
    index: any,
    hourlyWeather: HourlyWeatherInfo[]
  ) {
    const temperature = Math.round(hourlyData.temperature_2m[index]);
    const weatherCode = hourlyData.weather_code[index];
    const iconName = this.getIconName(weatherCode);
    const time = new Date(hourlyData.time[index]);
    hourlyWeather.push(new HourlyWeatherInfo(temperature, time, iconName));
  }

  private mapDailyToDailyWeatherInfo(
    dailyData: any,
    i: number,
    location: LocationInfo
  ): DailyWeatherInfo {
    const date = new Date(dailyData.time[i]);
    const maxTemp = Math.round(dailyData.temperature_2m_max[i]);
    const minTemp = Math.round(dailyData.temperature_2m_min[i]);
    const weatherCode = dailyData.weather_code[i];
    const iconName = this.getIconName(weatherCode);
    return new DailyWeatherInfo(minTemp, maxTemp, location, date, iconName);
  }

  private getPreviousMonthRange(): { firstDay: string; lastDay: string } {
    const now: Date = new Date();

    const prevMonth: Date = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const firstDay: Date = new Date(
      prevMonth.getFullYear(),
      prevMonth.getMonth(),
      1
    );

    const lastDay: Date = new Date(
      prevMonth.getFullYear(),
      prevMonth.getMonth() + 1,
      0
    );

    return {
      firstDay: this.formatDate(firstDay),
      lastDay: this.formatDate(lastDay),
    };
  }

  private formatDate(date: Date) {
    const year: number = date.getFullYear();
    const month: string = String(date.getMonth() + 1).padStart(2, '0');
    const day: string = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
