import { WeatherData } from "./types";

abstract class WeatherApi {
  static baseUrl = "https://weatherapi.dreammaker-it.se";

  static async getWeather(query: string, lang?: string): Promise<WeatherData> {
    const url = this.baseUrl + "/Forecast";
    const searchParams = new URLSearchParams();
    searchParams.append("city", query);

    if (lang) {
      searchParams.append("lang", lang);
    }
    const response = await fetch(url + "?" + searchParams.toString());

    if (response.status !== 200) {
      // error handling
      throw new Error(response.statusText);
    }

    console.log(response);
    return response.json();
  }

  static async getDailyWeather(
    query: string,
    lang?: string
  ): Promise<WeatherData[]> {
    const url = this.baseUrl + "/Forecast/5Days";
    const searchParams = new URLSearchParams();
    searchParams.append("location", query);

    if (lang) {
      searchParams.append("lang", lang);
    }
    const response = await fetch(url + "?" + searchParams.toString());

    if (!response.ok) {
      // error handling
      throw new Error(response.statusText);
    }
    return response.json();
  }

  static async getHourlyWeather(
    query: string,
    lang?: string
  ): Promise<WeatherData[]> {
    const url = this.baseUrl + "/Forecast/24Hours";
    const searchParams = new URLSearchParams();
    searchParams.append("location", query);

    if (lang) {
      searchParams.append("lang", lang);
    }
    const response = await fetch(url + "?" + searchParams.toString());

    if (!response.ok) {
      // error handling
      throw new Error(response.statusText);
    }
    return response.json();
  }
}

export default WeatherApi;
