import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DailyWeatherInfo } from '../shared/classes/daily-weather-info';

@Component({
  selector: 'app-daily-weather-list',
  standalone: true,
  imports: [],
  templateUrl: './daily-weather-list.component.html',
  styleUrl: './daily-weather-list.component.css'
})
export class DailyWeatherListComponent {
  @Input()
  public dailyWeatherInfoList: DailyWeatherInfo[] = [];

  @Output()
  public onIndexSelection = new EventEmitter<number>;

  public handleSelection(index: number) {
    this.onIndexSelection.emit(index);
  }
}
