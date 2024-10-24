"use client";

import { SmallWeatherData } from "./types";
import Image from "next/image";

export default function CurrentWeatherIcon({
  current,
}: {
  current: SmallWeatherData;
}) {
  return (
    <div>
        <Image
            src={current.icon.url}
            alt={current.icon.code}
            className="aspect-square w-12 h-12 border-2 border-blue-500 bg-blue-400 rounded-lg"
            width={96}
            height={96}
        />
    </div>

  );
}
