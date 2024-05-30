import { Component, Input, OnInit } from '@angular/core';
import { DailyWeatherInfo } from '../shared/classes/daily-weather-info';
import { HourlyWeatherInfoComponent } from '../hourly-weather-info/hourly-weather-info.component';
import { WeatherService } from '../shared/services/weather.service';
import { LocationInfo } from '../shared/classes/location-info';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HourlyWeatherInfo } from '../shared/classes/horly-weather-info';
import { LocationService } from '../shared/services/location.service';

@Component({
  selector: 'app-daily-weather-info',
  standalone: true,
  imports: [HourlyWeatherInfoComponent, CommonModule, HttpClientModule],
  providers: [WeatherService],
  templateUrl: './daily-weather-info.component.html',
  styleUrl: './daily-weather-info.component.css',
})
export class DailyWeatherInfoComponent implements OnInit {
  @Input()
  public dailyWeatherInfo: DailyWeatherInfo = new DailyWeatherInfo(
    0,
    0,
    new LocationInfo('Plovdiv', 'BG', 42.15, 24.75),
    new Date(),
    ''
  );

  public hourlyWeatherInfoList?: HourlyWeatherInfo[];

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService
      .getHourlyWeather(
        this.dailyWeatherInfo.location,
        this.dailyWeatherInfo.date.toISOString().slice(0, 10)
      )
      .subscribe((result) => (this.hourlyWeatherInfoList = result));
  }
}
