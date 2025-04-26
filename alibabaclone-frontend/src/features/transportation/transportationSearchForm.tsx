import agent from "@/shared/api/agent";
import { City } from "@/shared/models/location/city";
import { TransportationSearchRequest } from "@/shared/models/transportation/transportationSearchRequest";
import { TransportationSearchResult } from "@/shared/models/transportation/transportationSearchResult";
import React, { useEffect, useState } from "react";
import TransportationCard from "./transportationCard";

const vehicleTypes = [
  { id: 1, name: "Bus", imageUrl: "/images/bus.png" },
  { id: 2, name: "Train", imageUrl: "/images/train.png" },
  { id: 3, name: "Airplane", imageUrl: "/images/airplane.png" },
];

const TransportationSearchForm = () => {
  const [searchResults, setSearchResults] = useState<
    TransportationSearchResult[]
  >([]);
  const [loading, setLoading] = useState(false);
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

    if (name === "fromCityId" || name === "toCityId") {
      setForm((prev) => ({
        ...prev,
        [name]: value ? parseInt(value) : undefined,
      }));
    } else if (name === "startDate" || name === "endDate") {
      setForm((prev) => ({
        ...prev,
        [name]: value ? value : null,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSearch = () => {
    setLoading(true);
    agent.TransportationSearch.search(form)
      .then((res) => {
        console.log("Search results:", res);
        setSearchResults(res);
      })
      .catch((err) => console.error("Search failed:", err))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <h3>Search Transportations</h3>

      <div>
        <h4>Select Vehicle Type:</h4>
        <div style={{ display: "flex", gap: "10px" }}>
          {vehicleTypes.map((vehicle) => (
            <div
              key={vehicle.id}
              onClick={() => {
                setForm((prev) => ({
                  ...prev,
                  vehicleTypeId:
                    prev.vehicleTypeId === vehicle.id ? undefined : vehicle.id,
                }));
              }}
              style={{
                border:
                  form.vehicleTypeId === vehicle.id
                    ? "2px solid blue"
                    : "1px solid gray",
                borderRadius: "8px",
                padding: "10px",
                cursor: "pointer",
              }}
            >
              <img
                src={vehicle.imageUrl}
                alt={vehicle.name}
                style={{ width: "50px", height: "50px" }}
              />
              <div>{vehicle.name}</div>
            </div>
          ))}
        </div>
      </div>

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

      {loading ? (
        <div>Loading...</div>
      ) : searchResults.length === 0 ? (
        <div>No results found</div>
      ) : (
        <div>
          {searchResults.map((result) => (
            <TransportationCard key={result.id} transportation={result} />
          ))}
        </div>
      )}

      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default TransportationSearchForm;
