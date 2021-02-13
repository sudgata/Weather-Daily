import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrentWeather } from '../models/current-weather';
import { WeatherOverviewFacade } from '../weather-overview-facade';

@Component({
  selector: 'app-weather-basic-details',
  templateUrl: './weather-basic-details.component.html',
  styleUrls: ['./weather-basic-details.component.scss']
})
export class WeatherBasicDetailsComponent implements OnInit,OnDestroy {

  weather: CurrentWeather;
  subscription: Subscription;
  constructor(public weatherOverviewFacade:WeatherOverviewFacade) { }


  ngOnInit(): void {
    this.subscription= this.weatherOverviewFacade.currentWeather$.subscribe(res=>{
      this.weather=res;
    });
  }

  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }

}
