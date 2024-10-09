import { getDailyWeather, getHourlyWeather, getWeather } from "./actions";
import WeatherCard from "./weatherCard";
import WeatherNews from "./news";

export default async function WeatherPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const currentWeather = await getWeather(searchParams.q ?? "Stockholm");
  const hourlyForecast = await getHourlyWeather(searchParams.q ?? "Stockholm");
  const dailyWeather = await getDailyWeather(searchParams.q ?? "Stockholm");

  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-5 gap-5 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 sm:items-start">
        <h1 className="w-full text-3xl bg-blue-400 font-bold text-white p-2">
          Weather Today
        </h1>
        <WeatherCard
          now={currentWeather}
          hourly={hourlyForecast}
          daily={dailyWeather}
        />
        <WeatherNews />
      </main>
    </div>
  );
}
