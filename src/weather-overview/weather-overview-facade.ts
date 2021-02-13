import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CurrentWeather } from './models/current-weather';
import { WeatherApiResponse } from './models/current-weather-api-response';
import { NearbyWeatherApiResponse } from './models/nearby-weather-api-response';
import { WeatherOverviewService } from './weather-overview.service';
import { CitySearchResult } from './weather-search/models/city-search-result';
import { CityLocation } from './weather-search/models/city-location';
import { WeatherForecast } from './weather-forecast/models/weather-forecast';

@Injectable({providedIn: 'root'})
export class WeatherOverviewFacade {
    private currentWeatherSubject:BehaviorSubject<CurrentWeather>= new BehaviorSubject<CurrentWeather>(null);
    public currentWeather$ = this.currentWeatherSubject.asObservable();
    private nearbyWeatherSubject:BehaviorSubject<CurrentWeather[]>= new BehaviorSubject<CurrentWeather[]>([]);
    public nearbyWeather$ = this.nearbyWeatherSubject.asObservable();
    private forecastWeatherSubject:BehaviorSubject<WeatherForecast[]>= new BehaviorSubject<WeatherForecast[]>([]);
    public forecastWeather$ = this.forecastWeatherSubject.asObservable();
    public errorText$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    isCurrentWeatherLoading:boolean=true;
    isNearbyWeatherLoading:boolean=true;
    isForecastWeatherLoading:boolean=true;
    constructor(private weatherOverviewService: WeatherOverviewService) { }

    fetchAllWeather(lat: number,lon: number){
        this.getCurrentWeather(lat,lon).subscribe(
          ()=>{this.setErrorText(null);},
          (err)=>{this.setErrorText("Unable to Fetch Weather Data !");}
        );
        this.getNearbyWeather(lat,lon).subscribe(
          ()=>{this.setErrorText(null);},
          (err)=>{this.setErrorText("Unable to Fetch Weather Data !");}
        );
        this.getWeatherForecast(lat,lon).subscribe(
            ()=>{this.setErrorText(null);},
            (err)=>{this.setErrorText("Unable to Fetch Weather Data !");}
          );
      }
    
    getCurrentWeather(latitude: number, longitude: number): Observable<WeatherApiResponse>{
        this.isCurrentWeatherLoading=true;
        this.currentWeatherSubject.next(null);
        return this.weatherOverviewService.getCurrentWeather(latitude,longitude).pipe(
            tap((res:WeatherApiResponse)=>{
                this.currentWeatherSubject.next(this.mapWeather(res));
                this.isCurrentWeatherLoading=false;
            })
        );
    }

    getNearbyWeather(latitude: number, longitude: number): Observable<NearbyWeatherApiResponse>{
        this.isNearbyWeatherLoading=true;
        this.nearbyWeatherSubject.next([]);
        return this.weatherOverviewService.getNearbyWeather(latitude,longitude).pipe(
            tap((res:NearbyWeatherApiResponse)=>{
                let nearbyWeather: CurrentWeather[]=[];
                res?.list?.forEach(weather=>nearbyWeather.push(this.mapWeather(weather)));
                this.nearbyWeatherSubject.next(nearbyWeather);
                this.isNearbyWeatherLoading=false;
            })
        );     
    }

    mapWeather(res:WeatherApiResponse): CurrentWeather{
        let currentWeather: CurrentWeather={
            placeName: res?.name,
            country: res?.sys?.country,
            temp: Math.floor(res?.main?.temp),
            maxTemp: Math.floor(res?.main?.temp_max),
            minTemp: Math.floor(res?.main?.temp_min),
            feelsLike: Math.floor(res?.main?.feels_like),
            description: res?.weather[0]?.description,
            sunrise: this.mapTime(res?.sys?.sunrise,res?.timezone),//new Date(1000*res.sys.sunrise).toLocaleTimeString().toLocaleLowerCase(),
            sunset: this.mapTime(res?.sys?.sunset,res?.timezone),//new Date(1000*res.sys.sunset).toLocaleTimeString().toLocaleLowerCase(),
            humidity: res?.main?.humidity,
            windSpeed: (res?.wind?.speed * 3.6).toFixed(2),
            icon: res?.weather[0]?.icon,
            format: this.setFormat(res?.weather[0]?.icon.toString())
        }
        return currentWeather;
    }

    setFormat(icon): string{
        return ((icon == "50d")|| (icon == "50n")) ? 'png' : 'svg';
    }

    mapTime(time: number,timezone: number): string{
        let dateTime = new Date(1000*time);
        let localTime = dateTime.getTime();
        let localOffset = dateTime.getTimezoneOffset() * 60000
        let utcTime = localTime + localOffset
        var remoteTime = utcTime + (1000 * timezone)
        return new Date(remoteTime).toLocaleTimeString().toLocaleLowerCase();
    }

    searchCities(searchText: string): Observable<CitySearchResult[]>{
        if(!searchText) return of([]);
        return this.weatherOverviewService.searchCities(searchText).pipe(
            map(res=>{
                return res?._embedded['city:search-results']?.map((city)=>({
                    name: city?.matching_full_name,
                    url: city?._links['city:item']?.href
                } as CitySearchResult));      
        }));
    }

    getCityCoordinates(api: string): Observable<CityLocation>{
        if(api)
            return this.weatherOverviewService.getCityCoordinates(api).pipe(
                map((res)=>({
                    latitude: res?.location?.latlon?.latitude,
                    longitude: res?.location?.latlon?.longitude
                } as CityLocation)
                )
                
            );
    }

    getWeatherForecast(lat: number, lon: number): Observable<WeatherForecast[]>{
        this.isForecastWeatherLoading=true;
        this.forecastWeatherSubject.next([]);
        return this.weatherOverviewService.getWeatherForecast(lat,lon).pipe(
            tap((res: any)=>{
                let forecastData: WeatherForecast[]=[];
                res?.daily?.forEach((data,index)=>{
                    if(index!=0)
                        forecastData.push(this.mapForecastData(data))
                });
                this.forecastWeatherSubject.next(forecastData);
                this.isForecastWeatherLoading=false;
            })
        );
    }

    mapForecastData(forecastData: any): WeatherForecast{
        let dailyForecast: WeatherForecast={
            day:this.getDayAndDate(forecastData?.dt),
            minTemp: Math.floor(forecastData?.temp?.min),
            maxTemp: Math.floor(forecastData?.temp?.max),
            description: forecastData?.weather[0]?.description,
            icon: forecastData?.weather[0]?.icon,
            humidity: forecastData?.humidity,
            windSpeed: forecastData?.wind_speed,
            format: this.setFormat(forecastData?.weather[0]?.icon)
        }
        return dailyForecast;
    }

    getDayAndDate(date: number){
        const options = {  weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'};
        const dateValue = new Date(date*1000).toLocaleTimeString('en-us', options).toString();
        let index= dateValue.indexOf(',',dateValue.indexOf(',')+1);
        return dateValue.substring(0,index);
    }

    setErrorText(message: string){
        this.errorText$.next(message);
      }

}