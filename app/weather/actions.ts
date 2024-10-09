"use server";

import WeatherApi from "./api";

export async function getWeather(query: string, lang?: string) {
  return WeatherApi.getWeather(query, lang);
}

export async function getHourlyWeather(query: string, lang?: string) {
  return WeatherApi.getHourlyWeather(query, lang);
}

export async function getDailyWeather(query: string, lang?: string) {
  return WeatherApi.getDailyWeather(query, lang);
}
