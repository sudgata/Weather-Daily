export interface WeatherApiResponse{
    main: MainDetails;
    sys: AdditionalDetails;
    name: string;
    weather: Weather[];
    wind: Wind;
    timezone: number;
}

export interface MainDetails{
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
}

export interface AdditionalDetails{
    country: string;
    sunrise: number;
    sunset: number;
}

export interface Weather{
    description: string;
    icon: string;
}

export interface Wind{
    deg: number;
    speed: number;
}