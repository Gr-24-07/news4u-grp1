import { getWeather } from "./actions";
import SmallWeatherCard from "./smallweathercard";

export default async function SmallWeatherPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const WeatherToday = await getWeather(searchParams.q ?? "Stockholm");

  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-5 gap-5 font-[family-name:var(--font-geist-sans)]">
      {/* <main className="flex flex-col gap-8 row-start-2 sm:items-start"> */}

      <SmallWeatherCard current={WeatherToday} />
    </div>
  );
}
