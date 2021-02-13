import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherOverviewComponent } from './weather-overview.component';
import { WeatherOverviewRoutingModule } from './weather-overview-routing.module';
import { WeatherMaterialModule } from 'src/app/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WeatherBasicDetailsComponent } from './weather-basic-details/weather-basic-details.component';
import { WeatherNearbyPlacesComponent } from './weather-nearby-places/weather-nearby-places.component';
import { WeatherSearchComponent } from './weather-search/weather-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';


@NgModule({
  declarations: [WeatherOverviewComponent,
                 WeatherBasicDetailsComponent,
                 WeatherNearbyPlacesComponent,
                 WeatherSearchComponent,
                 WeatherForecastComponent],
  imports: [
    CommonModule,
    WeatherOverviewRoutingModule,
    WeatherMaterialModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class WeatherOverviewModule { }
