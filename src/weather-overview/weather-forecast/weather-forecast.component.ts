import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherOverviewFacade } from '../weather-overview-facade';
import { WeatherForecast } from './models/weather-forecast';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {

  weatherForecast$: Observable<WeatherForecast[]>
  constructor(public weatherOverviewFacade: WeatherOverviewFacade) { }

  ngOnInit(): void {
    console.log(this.weatherForecast$);
    this.weatherForecast$ = this.weatherOverviewFacade.forecastWeather$;
  }

}
