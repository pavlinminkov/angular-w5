import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LocationInfo } from '../classes/location-info';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private apiUrl = 'https://geocoding-api.open-meteo.com/v1/search';

  private http = inject(HttpClient);

  public getLocation(cityName: string): Observable<LocationInfo> {
    const url = `${this.apiUrl}?name=${cityName}&count=1&language=en&format=json`;

    return this.http.get<any>(url).pipe(
      map((response) => {
        const result = response.results[0];
        return new LocationInfo(
          result.name,
          result.country_code,
          result.latitude,
          result.longitude
        );
      })
    );
  }
}
