import { useEffect, useState } from "react";

const useYandexMaps = () => {
  const [ymaps, setYmaps] = useState(null);
  // const apiKey = process.env.YANDEX_API_KEY;
  const apiKey = "7b588521-5efc-4725-937e-a21787051879";

  useEffect(() => {
    if (typeof window !== "undefined" && !window.ymaps) {
      window.ymaps.ready(() => {
        setYmaps(window.ymaps);
      });
      document.body.appendChild(script);
    } else if (window.ymaps) {
      window.ymaps.ready(() => {
        setYmaps(window.ymaps);
      });
    }
  }, [apiKey]);

  return ymaps;
};

export { useYandexMaps };
