import agent from "@/shared/api/agent";
import { City } from "@/shared/models/location/city";
import { TransportationSearchRequest } from "@/shared/models/transportation/transportationSearchRequest";
import React, { useEffect, useState } from "react";

const TransportationSearchForm = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [form, setForm] = useState<TransportationSearchRequest>({
    fromCityId: undefined,
    toCityId: undefined,
    startDate: null,
    endDate: null,
    vehicleTypeId: undefined,
  });

  useEffect(() => {
    agent.Cities.list().then(setCities);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSearch = () => {
    agent.TransportationSearch.search(form)
      .then((res) => {
        console.log("Search results:", res);
      })
      .catch((err) => console.error("Search failed:", err));
  };

  return (
    <div>
      <h3>Search Transportations</h3>

      <div>
        <label>From City:</label>
        <select
          name="fromCityId"
          value={form.fromCityId ?? ""}
          onChange={handleChange}
        >
          <option value="">Select</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>To City:</label>
        <select
          name="toCityId"
          value={form.toCityId ?? ""}
          onChange={handleChange}
        >
          <option value="">Select</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Start Date:</label>
        <input
          type="datetime-local"
          name="startDate"
          // value={form.startDate ?? ""}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>End Date:</label>
        <input
          type="datetime-local"
          name="endDate"
          // value={form.endDate}
          onChange={handleChange}
        />
      </div>

      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default TransportationSearchForm;
