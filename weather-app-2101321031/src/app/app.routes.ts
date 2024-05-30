import { Routes } from '@angular/router';
import { WeatherContainerComponent } from './weather-container/weather-container.component';

export const routes: Routes = [
  { path: 'weather', component: WeatherContainerComponent },
  { path: '', redirectTo: 'weather', pathMatch: 'full' },
];
