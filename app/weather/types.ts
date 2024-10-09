export interface WeatherData {
  summary: string;
  city: string;
  lang: string | null;
  temperatureC: number;
  temperatureF: number;
  humidity: number;
  windSpeed: number;
  date: string;
  unixTime: number;
  icon: {
    url: string;
    code: string;
  };
}
