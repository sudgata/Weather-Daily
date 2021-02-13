import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { WeatherOverviewFacade } from '../weather-overview-facade';
import { CityLocation } from './models/city-location';
import { CitySearchResult } from './models/city-search-result';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.scss'],
})
export class WeatherSearchComponent implements OnInit {

  private searchText$ = new Subject<string>();
  searchResults$: Observable<CitySearchResult[]>;
  searchControl = new FormControl();
  constructor(private weatherOverviewFacade:WeatherOverviewFacade) { }

  ngOnInit(): void {
    this.searchResults$ = this.searchText$.pipe(
      debounceTime(150),
      distinctUntilChanged(),
      switchMap((searchText) =>{
           return this.weatherOverviewFacade.searchCities(searchText);
      }));
  }

  search(searchText: string) {
    this.searchText$.next(searchText);
  }

  fetchWeather(result: CitySearchResult){
    this.searchControl.setValue(result.name);
    this.weatherOverviewFacade.getCityCoordinates(result.url).subscribe((loc:CityLocation)=>{
      this.weatherOverviewFacade.fetchAllWeather(loc.latitude,loc.longitude);
    });
  }

  setErrorText(message: string){
    this.weatherOverviewFacade.errorText$.next(message);
  }

}
