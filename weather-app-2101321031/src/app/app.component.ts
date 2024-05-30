import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RainChartComponent } from "./rain-chart/rain-chart.component";

@Component({
    selector: 'app-root',
    standalone: true,
    providers: [],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, RainChartComponent]
})
export class AppComponent  {

}
