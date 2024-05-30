import { Routes } from '@angular/router';
import { WeatherContainerComponent } from './weather-container/weather-container.component';
import { RainChartComponent } from './rain-chart/rain-chart.component';

export const routes: Routes = [
  { path: 'weather', component: WeatherContainerComponent },
  { path: 'rain-chart', component: RainChartComponent },
  { path: '', redirectTo: 'weather', pathMatch: 'full' },
];
