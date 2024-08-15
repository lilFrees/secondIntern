import { YMaps, Map, Placemark } from "react-yandex-maps";

const apiKey = process.env.NEXT_PUBLIC_YMAPS_API_KEY;

function Page() {
  function init() {}

  return (
    <div className="py-10">
      <h2 className="text-2xl font-semibold">Our Locations</h2>

      <YMaps query={{ apikey: apiKey }}>
        <Map
          defaultState={{ center: [55.75, 37.57], zoom: 9 }}
          width="100%"
          height="400px"
        >
          <Placemark geometry={[55.75, 37.57]} />
        </Map>
      </YMaps>
    </div>
  );
}

export default Page;
