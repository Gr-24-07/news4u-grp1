import { ApiError } from "./errors";
import { ErrorApiResponse, SuccessApiResponse, WeatherData } from "./types";

export type WeatherResponse =
  | SuccessApiResponse<WeatherData>
  | ErrorApiResponse;

abstract class WeatherApi {
  static baseUrl = "https://weatherapi.dreammaker-it.se";

  static async getWeather(
    query: string,
    lang?: string
  ): Promise<WeatherResponse> {
    try {
      const url = this.baseUrl + "/Forecast";
      const searchParams = new URLSearchParams();
      searchParams.append("city", query);

      if (lang) {
        searchParams.append("lang", lang);
      }
      const response = await fetch(url + "?" + searchParams.toString(), {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new ApiError(response.statusText, response.status);
      }

      return {
        success: true,
        data: await response.json(),
        statusCode: response.status,
      };
    } catch (error) {
      if (error instanceof ApiError) {
        return {
          success: false,
          error: error.message,
          statusCode: error.statusCode,
        };
      }
      return {
        success: false,
        error: "something went wrong, Try Again!",
        statusCode: 500,
      };
    }
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
