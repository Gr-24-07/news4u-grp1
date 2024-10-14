"use client";

import { SmallWeatherData } from "./types";
import Image from "next/image";

export default function SmallWeatherCard({
  current,
}: {
  current: SmallWeatherData;
}) {
  //   const router = useRouter();
  //   const searchParams = useSearchParams();
  //   const [query, setQuery] = useState(searchParams.get("q") ?? "");

  //   if (!current) {
  //     return null;
  //   }

  return (
    <div className="w-56 border border-zinc-700 rounded-lg p-4 mx-auto">
      <div className="w-56 flex flex-col sm:flex-row items-center gap-4">
        <Image
          src={current.icon.url}
          alt={current.icon.code}
          className="bg-blue-300 aspect-square w-16"
          width={75}
          height={75}
        />
        <div>
          <h3 className=" font-bold mb-2 border-zinc-700">
            {`Linköping ${current.temperatureC}°C`}
          </h3>
          <p className="text-sm">{current.summary}</p>
        </div>
      </div>
      <div></div>
    </div>
  );
}
