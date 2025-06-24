import { useEffect, useState } from "react";
import agent from "@/shared/api/agent";
import { City } from "@/shared/models/location/city";
import { TransportationSearchRequest } from "@/shared/models/transportation/transportationSearchRequest";
import { useNavigate } from "react-router-dom";

const vehicleTypes = [
  { id: 1, name: "Bus", imageUrl: "/images/bus.png" },
  { id: 2, name: "Train", imageUrl: "/images/train.png" },
  { id: 3, name: "Flights", imageUrl: "/images/airplane.png" },
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
      className="rounded-xl shadow-lg p-6 mx-auto mt-6 max-w-6xl overflow-x-auto border border-[var(--color-border)]"
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text)",
      }}
    >
      <h2
        className="text-3xl font-bold mb-2 tracking-tight text-center"
        style={{ color: "var(--text-primary)" }}
      >
        Welcome to Alibaba
      </h2>
      <p
        className="text-base mb-6 text-center"
        style={{ color: "var(--text-secondary)" }}
      >
        Your trusted travel companion
      </p>

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
      <br></br>
      <br></br>
      {/* Filters + Search */}
      <div className="flex flex-wrap gap-6 mb-6 items-end">
        {/* From City */}
        <div className="flex flex-col w-50">
          {/* <label
            htmlFor="fromCity"
            className="mb-1 font-medium"
            style={{ color: "var(--color-text)" }}
          >
            From
          </label> */}
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
            className="w-full px-3 py-2 rounded-md h-[40px] text-[var(--color-text)] bg-[var(--color-bg)] border border-[var(--color-border)]"
          >
            <option value="">From</option>
            {cities.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
        {/* To City */}
        <div className="flex flex-col w-50">
          {/* <label
            htmlFor="toCity"
            className="mb-1 font-medium"
            style={{ color: "var(--color-text)" }}
          >
            To
          </label> */}
          <select
            id="toCity"
            value={form.toCityId ?? ""}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                toCityId: e.target.value ? parseInt(e.target.value) : undefined,
              }))
            }
            className="w-full px-3 py-2 rounded-md h-[40px] text-[var(--color-text)] bg-[var(--color-bg)] border border-[var(--color-border)]"
          >
            <option value="">To</option>
            {cities.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
        {/* Start Date */}
        <div className="flex flex-col w-50">
          {/* <label
            htmlFor="startDate"
            className="mb-1 font-medium"
            style={{ color: "var(--color-text)" }}
          >
            Start Date
          </label> */}
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
            className="w-full px-3 py-2 rounded-md h-[40px] text-[var(--color-text)] bg-[var(--color-bg)] border border-[var(--color-border)]"
          />
        </div>
        {true ? (
          <>
            {/* Return Date */}
            <div className="flex flex-col w-50">
              {/* <label
                htmlFor="endDate"
                className="mb-1 font-medium"
                style={{ color: "var(--color-text)" }}
              >
                Return Date
              </label> */}
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
                className="w-full px-3 py-2 rounded-md h-[40px] text-[var(--color-text)] bg-[var(--color-bg)] border border-[var(--color-border)]"
              />
            </div>
          </>
        ) : (
          <></>
        )}

        {/* Search Button */}
        <div className="flex flex-col w-30">
          <label className="mb-1 font-medium invisible">Search</label>
          <button
            type="button"
            onClick={handleSearch}
            className="w-full h-[40px] px-4 py-2 rounded-md font-semibold bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)] transition"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransportationSearchForm;
