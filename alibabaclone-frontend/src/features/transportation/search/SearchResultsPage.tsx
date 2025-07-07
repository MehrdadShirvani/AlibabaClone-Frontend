import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import api from "@/services/api";
import { TransportationSearchResult } from "@/shared/models/transportation/transportationSearchResult";
import TransportationCard from "@/features/transportation/search/transportationCard";
import { format, addDays } from "date-fns";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResultsPage = () => {
  const { vehicleId, fromCityId, toCityId } = useParams();
  const vehicleTypeId = vehicleId ? parseInt(vehicleId, 10) : 1;
  const fromId = fromCityId ? parseInt(fromCityId, 10) : undefined;
  const toId = toCityId ? parseInt(toCityId, 10) : undefined;

  const query = useQuery();
  const departing = query.get("departing");
  const arriving = query.get("arriving");

  const [results, setResults] = useState<TransportationSearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentDate, setCurrentDate] = useState<Date>(
    departing ? new Date(departing) : new Date()
  );
  const [sortBy, setSortBy] = useState<"time" | "price">("time");

  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

  const toggleCompany = (company: string) => {
    setSelectedCompanies((prev) =>
      prev.includes(company)
        ? prev.filter((c) => c !== company)
        : [...prev, company]
    );
  };

  useEffect(() => {
    const form = {
      vehicleTypeId,
      fromCityId: fromId,
      toCityId: toId,
      startDate: format(currentDate, "yyyy-MM-dd"),
      endDate: arriving || null,
    };

    setLoading(true);
    api.TransportationSearch.search(form)
      .then(setResults)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [vehicleId, fromCityId, toCityId, currentDate, arriving]);

  const sortedResults = [...results].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    return (
      new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime()
    );
  });

  const filteredResults = sortedResults.filter((r) => {
    const noFilter = selectedCompanies.length === 0;
    const allSelected =
      selectedCompanies.length ===
      new Set(results.map((r) => r.companyTitle)).size;

    return (
      noFilter || allSelected || selectedCompanies.includes(r.companyTitle)
    );
  });

  const uniqueCompanies = Array.from(
    new Set(results.map((r) => r.companyTitle))
  );

  return (
    <div className="flex max-w-7xl mx-auto px-4 py-6">
      {/* Left Sidebar */}
      <aside
        className="w-60 flex-shrink-0 border rounded-xl p-4 mt-12"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        <h3
          className="text-lg font-semibold mb-3 "
          style={{ color: "var(--text-primary)" }}
        >
          Companies
        </h3>
        <div className="flex flex-col gap-3">
          {uniqueCompanies.map((company) => (
            <label
              key={company}
              className="flex items-center gap-2 cursor-pointer"
              style={{
                backgroundColor: "var(--input-bg)",
                borderRadius: "var(--radius)",
                padding: "0.5rem",
              }}
            >
              <img
                src={`/images/companyLogos/${company}.jpg`}
                alt={company}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span
                className="text-sm flex-1"
                style={{ color: "var(--text-primary)" }}
              >
                {company}
              </span>
              <input
                type="checkbox"
                checked={selectedCompanies.includes(company)}
                onChange={() => toggleCompany(company)}
                className="w-5 h-5"
              />
            </label>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-6">
        <h2 className="text-2xl font-bold mb-4">Available Transportations</h2>

        {/* Filters Row */}
        <div
          className="flex justify-between items-center flex-wrap gap-4 border rounded-xl px-4 py-3 mb-6"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--surface)",
          }}
        >
          {/* Date Navigation */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentDate(addDays(currentDate, -1))}
              className="px-3 py-1 rounded-l-lg text-sm"
              style={{
                backgroundColor: "var(--input-bg)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
            >
              ←
            </button>
            <div
              className="px-4 py-1 text-sm font-medium"
              style={{
                backgroundColor: "var(--background)",
                borderTop: "1px solid var(--border)",
                borderBottom: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
            >
              {format(currentDate, "yyyy-MM-dd")}
            </div>
            <button
              onClick={() => setCurrentDate(addDays(currentDate, 1))}
              className="px-3 py-1 rounded-r-lg text-sm"
              style={{
                backgroundColor: "var(--input-bg)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
            >
              →
            </button>
          </div>

          {/* Sorting */}
          <div className="flex items-center gap-3 text-sm">
            <span
              className="font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              Sort by:
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setSortBy("time")}
                className={`px-3 py-1 rounded-full border text-sm ${
                  sortBy === "time" ? "font-semibold" : ""
                }`}
                style={{
                  backgroundColor:
                    sortBy === "time" ? "var(--primary)" : "var(--input-bg)",
                  color:
                    sortBy === "time"
                      ? "var(--primary-foreground)"
                      : "var(--text-primary)",
                  borderColor: "var(--border)",
                }}
              >
                Soonest Departure
              </button>
              <button
                onClick={() => setSortBy("price")}
                className={`px-3 py-1 rounded-full border text-sm ${
                  sortBy === "price" ? "font-semibold" : ""
                }`}
                style={{
                  backgroundColor:
                    sortBy === "price" ? "var(--primary)" : "var(--input-bg)",
                  color:
                    sortBy === "price"
                      ? "var(--primary-foreground)"
                      : "var(--text-primary)",
                  borderColor: "var(--border)",
                }}
              >
                Lowest Price
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <p>Loading...</p>
        ) : filteredResults.length === 0 ? (
          <p>No results found.</p>
        ) : (
          <div className="space-y-4">
            {filteredResults.map((r) => (
              <TransportationCard key={r.id} transportation={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
