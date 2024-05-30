import { Component, Input } from '@angular/core';
import { HourlyWeatherInfo } from '../shared/classes/horly-weather-info';

@Component({
  selector: 'app-hourly-weather-info',
  standalone: true,
  imports: [],
  templateUrl: './hourly-weather-info.component.html',
  styleUrl: './hourly-weather-info.component.css',
})
export class HourlyWeatherInfoComponent {
  @Input()
  public hourlyWeatherInfo?: HourlyWeatherInfo;
}
