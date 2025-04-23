import agent from "@/shared/api/agent";
import { City } from "@/shared/models/location/city";
import { validateHeaderValue } from "http";
import { useEffect, useState } from "react";

const CityDropdown = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<number | undefined>();

  useEffect(() => {
    agent.Cities.list()
      .then(setCities)
      .catch((err) => console.error("error loading cities", err));
  }, []);

  return (
    <select
      value={selectedCity}
      onChange={(e) => setSelectedCity(Number(e.target.value))}
    >
      <option value="">Select a City</option>
      {cities.map((city) => (
        <option key={city.id} value={city.id}>
          {city.title}
        </option>
      ))}
    </select>
  );
};

export default CityDropdown;
