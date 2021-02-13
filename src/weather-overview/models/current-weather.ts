export interface CurrentWeather{
    placeName: string;
    country: string;
    temp: number;
    minTemp: number;
    maxTemp: number;
    feelsLike: number;
    description: string;
    sunrise: string;
    sunset: string;
    humidity: number;
    windSpeed: string;
    icon: string;
    format: string;
}