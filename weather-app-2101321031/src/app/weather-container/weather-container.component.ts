import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DailyWeatherInfoComponent } from '../daily-weather-info/daily-weather-info.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from '../shared/services/weather.service';
import { LocationService } from '../shared/services/location.service';
import { LocationInfo } from '../shared/classes/location-info';
import { DailyWeatherInfo } from '../shared/classes/daily-weather-info';
import { DailyWeatherListComponent } from "../daily-weather-list/daily-weather-list.component";

@Component({
    selector: 'app-weather-container',
    standalone: true,
    providers: [WeatherService, LocationService],
    templateUrl: './weather-container.component.html',
    styleUrl: './weather-container.component.css',
    imports: [
        RouterOutlet,
        DailyWeatherInfoComponent,
        FormsModule,
        HttpClientModule,
        CommonModule,
        DailyWeatherListComponent
    ]
})
export class WeatherContainerComponent {
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
