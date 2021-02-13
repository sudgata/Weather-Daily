import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { WeatherApiResponse } from './models/current-weather-api-response';
import { Observable } from 'rxjs';
import { OPENWEATHER_API_KEY } from 'src/app/app-constants';
import { NearbyWeatherApiResponse } from './models/nearby-weather-api-response';

@Injectable({providedIn: 'root'})
export class WeatherOverviewService {
    private readonly SEARCH_LIMIT='10';
    private readonly STANDARD_UNIT='metric';
    constructor(private httpClient: HttpClient,@Inject(OPENWEATHER_API_KEY) private apiKey:string) {
    }

    getCurrentWeather(latitude: number, longitude: number): Observable<WeatherApiResponse>{
        const options={
            params: new HttpParams().set('lat',latitude.toString())
                                    .set('lon',longitude.toString())
                                    .set('units',this.STANDARD_UNIT)
                                    .set('appid',this.apiKey)
        }
       return this.httpClient.get<WeatherApiResponse>('https://api.openweathermap.org/data/2.5/weather',options);     
    }
    
    getNearbyWeather(latitude: number, longitude: number): Observable<NearbyWeatherApiResponse>{
        const options={
            params: new HttpParams().set('lat',latitude.toString())
                                    .set('lon',longitude.toString())
                                    .set('units',this.STANDARD_UNIT)
                                    .set('cnt',this.SEARCH_LIMIT)
                                    .set('appid',this.apiKey)
        }
        return this.httpClient.get<NearbyWeatherApiResponse>('https://api.openweathermap.org/data/2.5/find',options);     
    }

    searchCities(searchText: string): Observable<any>{
        const options={
            params: new HttpParams().set('search',searchText)
                                    .set('limit',this.SEARCH_LIMIT)
        }
        return this.httpClient.get<any>('https://api.teleport.org/api/cities',options);     
    }

    getCityCoordinates(api: string): Observable<any>{
        return this.httpClient.get<any>(api); 
    }

    getWeatherForecast(lat: number, lon: number): Observable<any>{
        const options={
            params: new HttpParams().set('lat',lat.toString())
                                    .set('lon',lat.toString())
                                    .set('exclude','current,minutely,hourly')
                                    .set('units',this.STANDARD_UNIT)
                                    .set('appid',this.apiKey)
        }
        return this.httpClient.get<any>('https://api.openweathermap.org/data/2.5/onecall',options); 
    }
}