import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContainerComponent } from './container/container.component';
import { WeatherMaterialModule } from './material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { openWeatherKey, OPENWEATHER_API_KEY } from './app-constants';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    WeatherMaterialModule,
    FontAwesomeModule
  ],
  providers: [{provide: OPENWEATHER_API_KEY,useValue: openWeatherKey}],
  bootstrap: [AppComponent],
})
export class AppModule { }
