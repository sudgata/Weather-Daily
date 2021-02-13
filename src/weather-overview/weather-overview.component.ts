import { Component, OnInit } from '@angular/core';
import { WeatherOverviewFacade } from './weather-overview-facade';

@Component({
  selector: 'app-weather-overview',
  templateUrl: './weather-overview.component.html',
  styleUrls: ['./weather-overview.component.scss'],
})
export class WeatherOverviewComponent implements OnInit {

  constructor(private weatherOverviewFacade:WeatherOverviewFacade) { }

  ngOnInit(): void {
    this.requestLocation();
  }

  requestLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position=>{
        this.fetchCurrentWeather(position);
      }),(err)=>{this.handleError(err);});
    } else { 
      this.setErrorText("Geolocation is not supported by this browser.");
    }
  }

  fetchCurrentWeather(position){
    this.weatherOverviewFacade.fetchAllWeather(position.coords.latitude,position.coords.longitude);
  }

  handleError(error){
    switch(error.code) {
      case error.PERMISSION_DENIED:
        this.setErrorText("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        this.setErrorText("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        this.setErrorText( "The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        this.setErrorText("An unknown error occurred.");
        break;
    }
  }

  setErrorText(message: string){
    this.weatherOverviewFacade.errorText$.next(message);
  }


}
