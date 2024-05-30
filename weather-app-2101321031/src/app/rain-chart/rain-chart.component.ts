import { Component, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { RainData } from '../shared/classes/rain-data';
import { WeatherService } from '../shared/services/weather.service';
import { LocationInfo } from '../shared/classes/location-info';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rain-chart',
  standalone: true,
  imports: [NgApexchartsModule, HttpClientModule],
  providers: [WeatherService],
  templateUrl: './rain-chart.component.html',
  styleUrl: './rain-chart.component.css',
})
export class RainChartComponent implements OnInit {
  public chartOptions: any;
  public location?: LocationInfo;

  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.location = new LocationInfo(
        params.get('name')!,
        params.get('country_code')!,
        +params.get('latitude')!,
        +params.get('longitude')!
      );

      this.weatherService
        .getRainData(this.location)
        .subscribe((rainData: RainData) => {
          this.updateChart(rainData);
        });
    });
  }

  private updateChart(rainData: RainData): void {
    this.chartOptions = {
      series: [
        {
          name: 'Precipitation',
          data: rainData.precipitation_sum,
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      title: {
        text: `Daily Precipitation from last month in ${this.location?.name}`,
      },
      xaxis: {
        categories: rainData.time,
      },
      yaxis: {
        title: {
          text: 'Precipitation (mm)',
        },
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        borderColor: '#f1f1f1',
      },
    };
  }
}
