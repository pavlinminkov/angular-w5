import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DailyWeatherInfoComponent } from './daily-weather-info/daily-weather-info.component';
import { DailyWeatherInfo } from './shared/classes/daily-weather-info';
import { LocationInfo } from './shared/classes/location-info';
import { WeatherService } from './shared/services/weather.service';
import { FormsModule } from '@angular/forms';
import { LocationService } from './shared/services/location.service';
import { DailyWeatherListComponent } from './daily-weather-list/daily-weather-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DailyWeatherInfoComponent,
    DailyWeatherListComponent,
    FormsModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [WeatherService, LocationService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  public cityName?: string;
  public selectedIndex: number = -1;
  public location: LocationInfo = new LocationInfo(
    'Plovdiv',
    'BG',
    42.15,
    24.75
  );
  public dailyWeatherInfoList: DailyWeatherInfo[] = [];

  constructor(
    private weatherService: WeatherService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.loadWeatherList();
  }

  private loadWeatherList() {
    let currentDateString = new Date().toISOString().slice(0, 10);
    let futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 5);
    let futureDateString = futureDate.toISOString().slice(0, 10);

    this.weatherService
      .getDailyWeather(this.location, currentDateString, futureDateString)
      .subscribe((result) => {
        this.dailyWeatherInfoList = result;
      });
  }

  public findLocation() {
    this.locationService
      .getLocation(this.cityName!)
      .subscribe((result) => (this.location = result));

    this.returnToList();

    this.loadWeatherList();
  }

  public handleSelection($event: number) {
    this.selectedIndex = $event;
  }

  public returnToList() {
    this.selectedIndex = -1;
  }
}
