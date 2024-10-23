"use client";

import { Button } from "@/components/ui/button";
import { WeatherData } from "./types";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropletIcon, WindIcon, Thermometer, Search } from "lucide-react";
import Image from "next/image";

export default function WeatherCard({
  now,
  hourly,
  daily,
}: {
  now: WeatherData;
  hourly: WeatherData[];
  daily: WeatherData[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (query) {
      router.replace(`/weather/?q=${query}`);
    } else {
      router.replace("/weather");
    }
  }

  function handleChange(ev: React.ChangeEvent<HTMLInputElement>) {
    setQuery(ev.target.value);
  }

  const formattedDate = new Date(now.date).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className="flex gap-4 w-full flex-wrap md:flex-nowrap">
      <div className="basis-full md:basis-1/2 xl:basis-2/5">
        <form onSubmit={handleSubmit} className="flex mb-4">
          <input
            value={query}
            onChange={handleChange}
            className="w-full border border-zinc-700 h-9.5 px-3 rounded-l-lg"
            placeholder="Enter a city"
          />
          <Button className="rounded-l-none">
            <Search />
          </Button>
        </form>

        <div className="w-full border border-zinc-700 rounded-lg p-4">
          <div>
            <div>
              <h2 className="text-2xl font-bold mb-2">{now.city}</h2>
              <p className="text-sm text-muted-foreground mb-3">
                {formattedDate}
              </p>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-4 gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Image
                  src={now.icon.url}
                  alt={now.summary}
                  className="bg-blue-300 aspect-square w-24"
                  width={100}
                  height={100}
                />
                <p className="text-5xl font-bold">{now.temperatureC}&deg;C</p>
              </div>
              <div className="text-right">
                <div className="flex items-center">
                  <div>
                    <Thermometer
                      aria-hidden="true"
                      className="text-blue-500"
                      size={28}
                    />
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{now.summary}</p>
                    <p className="text-sm font-medium">
                      feels like {now.temperatureC}&deg;C
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <div>
                  <DropletIcon
                    aria-hidden="true"
                    className="text-blue-500 "
                    size={20}
                  />
                </div>
                <div className="text-right">
                  <p className="font-bold">Humidity</p>
                  <p className="text-sm font-medium">{now.humidity}%</p>
                </div>
              </div>
              <div className="flex justify-end text-right ">
                <div className="flex items-center gap-2">
                  <div>
                    <WindIcon
                      aria-hidden="true"
                      className="text-blue-500"
                      size={24}
                    />
                  </div>
                  <div>
                    <p className="font-bold">Wind Speed</p>
                    <p className="text-sm font-medium">{now.windSpeed}m/s</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="basis-full md:basis-1/2 xl:basis-3/5">
        <Tabs defaultValue="24Hours" className="w-full h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="24Hours">3-Hourly</TabsTrigger>
            <TabsTrigger value="daily">Daily</TabsTrigger>
          </TabsList>

          <TabsContent value="24Hours" className="flex-1">
            <Card className="h-full border border-zinc-700 rounded-lg">
              <CardContent className="grid grid-cols-6 gap-2 h-full p-0">
                {hourly.slice(0, 6).map((hourly, index) => (
                  <div
                    key={`hourly-${hourly.unixTime}-${hourly.temperatureC}`}
                    className="flex flex-col items-center justify-center border-r last:border-none gap-3"
                  >
                    <div>
                      {index === 0
                        ? "Now"
                        : new Date(hourly.date).toLocaleTimeString("sv-SE", {
                            hour: "numeric",
                            minute: "numeric",
                          })}
                    </div>
                    <Image
                      src={hourly.icon.url}
                      alt={hourly.summary}
                      width={50}
                      height={50}
                    />
                    <div className="font-medium">
                      {hourly.temperatureC}&deg;C
                    </div>
                    <div className="text-sm">{hourly.windSpeed} m/s</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="daily" className="flex-1">
            <Card className="h-full border border-zinc-700">
              <CardContent className="grid grid-cols-5 gap-2 h-full p-0">
                {daily.slice(0, 5).map((daily, index) => (
                  <div
                    key={`daily-${daily.unixTime}-${daily.temperatureC}`}
                    className="flex flex-col items-center justify-center border-r last:border-none gap-3"
                  >
                    <div>
                      {index === 0
                        ? "Today"
                        : new Date(daily.date).toLocaleDateString("en-UK", {
                            weekday: "short",
                            // day: "2-digit",
                            // month: "numeric",
                            day: "numeric",
                          }) + "th"}
                    </div>
                    <Image
                      src={daily.icon.url}
                      alt={daily.summary}
                      width={50}
                      height={50}
                    />
                    <div className="font-medium">
                      {daily.temperatureC}&deg;C
                    </div>
                    <div className="text-sm">{daily.humidity}%</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
