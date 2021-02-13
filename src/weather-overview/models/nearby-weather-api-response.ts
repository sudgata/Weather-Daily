import { WeatherApiResponse } from "./current-weather-api-response";

export interface NearbyWeatherApiResponse{
    list: WeatherApiResponse[];
}