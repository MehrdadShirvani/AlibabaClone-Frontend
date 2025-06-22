import { useEffect, useState } from "react";
import agent from "@/shared/api/agent";
import { City } from "@/shared/models/location/city";
import { TransportationSearchRequest } from "@/shared/models/transportation/transportationSearchRequest";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const vehicleTypes = [
  { id: 1, name: "Bus", imageUrl: "/images/bus.png" },
  { id: 2, name: "Train", imageUrl: "/images/train.png" },
  { id: 3, name: "Airplane", imageUrl: "/images/airplane.png" },
];

const TransportationSearchForm = () => {
  const navigate = useNavigate();
  const [cities, setCities] = useState<City[]>([]);

  const [form, setForm] = useState<TransportationSearchRequest>({
    fromCityId: undefined,
    toCityId: undefined,
    startDate: new Date().toISOString().slice(0, 10),
    endDate: null,
    vehicleTypeId: 1,
  });

  useEffect(() => {
    agent.Cities.list()
      .then(setCities)
      .catch((error) => console.error("Failed to load cities:", error));
  }, []);

  const handleSearch = () => {
    if (
      !form.fromCityId ||
      !form.toCityId ||
      !form.startDate ||
      !form.vehicleTypeId
    )
      return;

    const params = new URLSearchParams();
    if (form.startDate) params.append("departing", form.startDate);
    if (form.endDate) params.append("arriving", form.endDate);

    const url = `/${form.vehicleTypeId}/${form.fromCityId}/${
      form.toCityId
    }?${params.toString()}`;
    console.log(url);
    navigate(url);
  };

  return (
    <div
      className="rounded-xl shadow-lg p-6 mx-auto mt-6 max-w-6xl overflow-x-auto"
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text)",
      }}
    >
      <h2
        className="text-2xl font-bold mb-6"
        style={{ color: "var(--color-text)" }}
      >
        Search Transportations
      </h2>

      {/* Vehicle Type Selection */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {vehicleTypes.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() =>
              setForm((prev) => ({
                ...prev,
                vehicleTypeId: prev.vehicleTypeId === v.id ? undefined : v.id,
              }))
            }
            className={`flex flex-col items-center px-4 py-3 rounded-lg w-28 transition-all duration-200 ${
              form.vehicleTypeId === v.id
                ? "button-vehicle-active"
                : "button-vehicle-inactive"
            }`}
          >
            <img src={v.imageUrl} alt={v.name} className="w-12 h-12 mb-1" />
            <span
              className="text-sm font-semibold text-center"
              style={{ color: "var(--color-text)" }}
            >
              {v.name}
            </span>
          </button>
        ))}
      </div>

      {/* Filters + Search */}
      <div className="flex flex-wrap gap-6 mb-6 items-stretch">
        {/* From City */}
        <div className="flex flex-col w-60">
          <label
            htmlFor="fromCity"
            className="mb-1 font-medium"
            style={{ color: "var(--color-text)" }}
          >
            From
          </label>
          <select
            id="fromCity"
            value={form.fromCityId ?? ""}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                fromCityId: e.target.value
                  ? parseInt(e.target.value)
                  : undefined,
              }))
            }
            className="w-full rounded-md px-3 py-2"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
              color: "var(--text-primary)",
            }}
          >
            <option value="">Select city</option>
            {cities.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        {/* To City */}
        <div className="flex flex-col w-60">
          <label
            htmlFor="toCity"
            className="mb-1 font-medium"
            style={{ color: "var(--color-text)" }}
          >
            To
          </label>
          <select
            id="toCity"
            value={form.toCityId ?? ""}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                toCityId: e.target.value ? parseInt(e.target.value) : undefined,
              }))
            }
            className="w-full rounded-md px-3 py-2"
            style={{
              backgroundColor: "var(--color-bg)",
              borderColor: "var(--color-border)",
              color: "var(--color-text)",
            }}
          >
            <option value="">Select city</option>
            {cities.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        {/* Start Date */}
        <div className="flex flex-col w-60">
          <label
            htmlFor="startDate"
            className="mb-1 font-medium"
            style={{ color: "var(--color-text)" }}
          >
            Start Date
          </label>
          <input
            id="startDate"
            type="date"
            value={form.startDate ?? ""}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                startDate: e.target.value || null,
              }))
            }
            className="input-date"
            style={{
              backgroundColor: "var(--color-bg)",
              borderColor: "var(--color-border)",
              color: "var(--color-text)",
            }}
          />
          {form.startDate && (
            <p className="mt-1 text-sm" style={{ color: "var(--color-text)" }}>
              {format(new Date(form.startDate), "PPP")}
            </p>
          )}
        </div>

        {/* End Date */}
        <div className="flex flex-col w-60">
          <label
            htmlFor="endDate"
            className="mb-1 font-medium"
            style={{ color: "var(--color-text)" }}
          >
            End Date
          </label>
          <input
            id="endDate"
            type="date"
            value={form.endDate ? form.endDate.slice(0, 10) : ""}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                endDate: e.target.value || null,
              }))
            }
            className="input-date"
            style={{
              backgroundColor: "var(--color-bg)",
              borderColor: "var(--color-border)",
              color: "var(--color-text)",
            }}
          />
          {form.endDate && (
            <p className="mt-1 text-sm" style={{ color: "var(--color-text)" }}>
              {format(new Date(form.endDate), "PPP")}
            </p>
          )}
        </div>

        {/* Search Button */}
        <div className="flex flex-col justify-center w-60">
          <button
            type="button"
            onClick={handleSearch}
            className="button-primary w-full sm:w-auto"
            // button-primary styles in your index.css already use var(--color-primary)
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransportationSearchForm;
