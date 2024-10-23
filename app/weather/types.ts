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

export interface SmallWeatherData {
  city: string;
  temperatureC: number;
  summary: string;

  icon: {
    url: string;
    code: string;
  };
}

export interface BaseApiResponse {
  statusCode: number;
}

export interface SuccessApiResponse<TData = unknown> extends BaseApiResponse {
  success: true;
  data: TData;
}

export interface ErrorApiResponse<TData = unknown> extends BaseApiResponse {
  success: false;
  error: TData;
}
