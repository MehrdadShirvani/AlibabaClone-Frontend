import { useEffect, useState } from "react";
import agent from "@/shared/api/agent";
import { City } from "@/shared/models/location/city";
import { TransportationSearchRequest } from "@/shared/models/transportation/transportationSearchRequest";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

const vehicleTypes = [
  { id: 1, name: "Bus", imageUrl: "/images/bus.png" },
  { id: 2, name: "Train", imageUrl: "/images/train.png" },
  { id: 3, name: "Airplane", imageUrl: "/images/airplane.png" },
];

import { useNavigate } from "react-router-dom";

const TransportationSearchForm = () => {
  const navigate = useNavigate();

  const [cities, setCities] = useState<City[]>([]);
  const [loading] = useState(false);
  const [form, setForm] = useState<TransportationSearchRequest>({
    fromCityId: undefined,
    toCityId: undefined,
    startDate: null,
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
    if (form.startDate instanceof Date)
      params.append("departing", form.startDate.toISOString());
    else if (typeof form.startDate === "string")
      params.append("departing", form.startDate);

    if (form.endDate instanceof Date)
      params.append("arriving", form.endDate.toISOString());
    else if (typeof form.endDate === "string")
      params.append("arriving", form.endDate);

    console.log(
      `/${form.vehicleTypeId}/${form.fromCityId}/${
        form.toCityId
      }?${params.toString()}`
    );
    navigate(
      `/${form.vehicleTypeId}/${form.fromCityId}/${
        form.toCityId
      }?${params.toString()}`
    );
  };

  // Adjust vehicle type button styles for stronger distinction
  const selectedVehicleClass =
    "border-4 border-blue-600 bg-blue-600 text-white shadow-lg";
  const unselectedVehicleClass =
    "border-2 border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-100";

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mx-auto mt-6 max-w-6xl overflow-x-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Search Transportations
      </h2>

      {/* Vehicle Type Selection */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {vehicleTypes.map((v) => (
          <button
            key={v.id}
            onClick={() =>
              setForm((prev) => ({
                ...prev,
                vehicleTypeId: prev.vehicleTypeId === v.id ? undefined : v.id,
              }))
            }
            className={`flex flex-col items-center px-4 py-3 rounded-lg w-28 transition-all duration-200 ${
              form.vehicleTypeId === v.id
                ? selectedVehicleClass
                : unselectedVehicleClass
            }`}
          >
            <img src={v.imageUrl} alt={v.name} className="w-12 h-12 mb-1" />
            <span className="text-sm font-semibold text-center">{v.name}</span>
          </button>
        ))}
      </div>

      {/* Filters + Search Button container */}
      <div className="flex flex-wrap gap-6 mb-6 items-stretch">
        {/* From City */}
        <div className="flex flex-col w-60">
          <Select
            onValueChange={(val) =>
              setForm((prev) => ({ ...prev, fromCityId: parseInt(val) }))
            }
            value={form.fromCityId?.toString()}
          >
            <SelectTrigger className="bg-white border border-gray-300 rounded-md w-full">
              <SelectValue placeholder="From" />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-lg rounded-md">
              {cities.map((c) => (
                <SelectItem key={c.id} value={c.id.toString()}>
                  {c.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* To City */}
        <div className="flex flex-col w-60">
          <Select
            onValueChange={(val) =>
              setForm((prev) => ({ ...prev, toCityId: parseInt(val) }))
            }
            value={form.toCityId?.toString()}
          >
            <SelectTrigger className="bg-white border border-gray-300 rounded-md w-full">
              <SelectValue placeholder="To" />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-lg rounded-md">
              {cities.map((c) => (
                <SelectItem key={c.id} value={c.id.toString()}>
                  {c.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Start Date */}
        <div className="flex flex-col w-60">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full text-left text-sm font-semibold bg-white border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              >
                {form.startDate
                  ? format(new Date(form.startDate), "PPP")
                  : "Pick a start date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 bg-white shadow-lg rounded-md">
              <Calendar
                mode="single"
                selected={form.startDate ? new Date(form.startDate) : undefined}
                onSelect={(date) =>
                  setForm((prev) => ({
                    ...prev,
                    startDate: date?.toISOString() ?? null,
                  }))
                }
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* End Date */}
        <div className="flex flex-col w-60">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full text-left text-sm font-semibold bg-white border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              >
                {form.endDate
                  ? format(new Date(form.endDate), "PPP")
                  : "Pick an end date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 bg-white shadow-lg rounded-md">
              <Calendar
                mode="single"
                selected={form.endDate ? new Date(form.endDate) : undefined}
                onSelect={(date) =>
                  setForm((prev) => ({
                    ...prev,
                    endDate: date?.toISOString() ?? null,
                  }))
                }
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Search Button */}
        <div className="flex flex-col justify-center w-60">
          <Button
            onClick={handleSearch}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 text-white font-semibold bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-md rounded-xl transition duration-300"
          >
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransportationSearchForm;
