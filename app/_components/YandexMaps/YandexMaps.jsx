"use client";

import { useYandexMaps } from "@/app/hooks/useYandexMaps";
import { useEffect, useRef, useState } from "react";

function YandexMaps() {
  const mapRef = useRef(null);
  const ymaps = useYandexMaps();

  useEffect(() => {
    if (ymaps && mapRef.current) {
      new ymaps.Map(mapRef.current, {
        center: [55.751574, 37.573856],
        zoom: 9,
      });
    }
  }, []);

  useEffect(() => {}, []);
  return <div ref={mapRef} className="h-[400px] w-full"></div>;
}

export default YandexMaps;
