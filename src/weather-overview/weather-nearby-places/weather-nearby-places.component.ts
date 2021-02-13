import { Component, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CurrentWeather } from '../models/current-weather';
import { WeatherOverviewFacade } from '../weather-overview-facade';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-weather-nearby-places',
  templateUrl: './weather-nearby-places.component.html',
  styleUrls: ['./weather-nearby-places.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class WeatherNearbyPlacesComponent implements OnInit {

  dataSource=new MatTableDataSource<CurrentWeather>();
  expandedElement: CurrentWeather | null;
  displayedColumns: string[] = ['place', 'climateStatus'];
  subscription: Subscription;

  constructor(public weatherOverviewFacade:WeatherOverviewFacade) { }

  ngOnInit(): void {
    this.subscription= this.weatherOverviewFacade.nearbyWeather$.subscribe((res:CurrentWeather[])=>{
      this.dataSource.data= res;
    });
  }

}
