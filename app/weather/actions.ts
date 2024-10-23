"use server";

import WeatherApi from "./api";

export async function getWeather(query: string, lang?: string) {
  const response = await WeatherApi.getWeather(query, lang);
  if (response.success) {
    return response.data;
  }
  throw response;
}

export async function getHourlyWeather(query: string, lang?: string) {
  return WeatherApi.getHourlyWeather(query, lang);
}

export async function getDailyWeather(query: string, lang?: string) {
  return WeatherApi.getDailyWeather(query, lang);
}
