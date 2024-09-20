"use client";

import { useEffect, useState } from "react";
function getCurrentDate() {}

export default function WeatherApi() {
  const date = getCurrentDate();
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Stockholm");

  async function fetchData(cityName: string) {
    try {
      const response = await fetch(
        "http://localhost:3000/api/weather?address=" + cityName
      );
      const jsonData = (await response.json()).data;
      setWeatherData(jsonData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData("Stockholm");
  }, []);

  return (
    <main className={styles.main}>
      <article className={styles.widget}></article>
    </main>
  );
}

// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//   const { searchParams } = new URL(request.url);
//   const address = searchParams.get("address");
//   const latitude = searchParams.get("lat");
//   const longitude = searchParams.get("long");

//   let url = "";

//   if (address) {
//     url =
//       "https://api.open-meteo.com/v1/forecast?=" +
//       address +
//       "&current_weather=true";
//   } else {
//     url = `https://api.open-meteo.com/v1/forecast?lat = ${latitude} & long = ${longitude} &current_weather=true`;
//   }

//   const response = await fetch(url); // Replace with your Open-Meteo API URL

//   const data = await response.json();

//     return NextResponse.json({ data });
//     }
