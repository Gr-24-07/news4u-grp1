import { getDailyWeather, getHourlyWeather, getWeather } from "./actions";
import WeatherCard from "./weatherCard";
import WeatherNews from "./news";

export default async function WeatherPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const currentWeather = await getWeather(searchParams.q ?? "Linköping ");
  const hourlyForecast = await getHourlyWeather(searchParams.q ?? "Linköping ");
  const dailyWeather = await getDailyWeather(searchParams.q ?? "Linköping ");

  // throw new Error();

  return (
    <div className="grid min-h-screen p-2 gap-5 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 sm:items-start">
        <h1 className="w-full text-3xl bg-blue-400 font-bold p-2 text-white">
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
